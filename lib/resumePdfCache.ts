import { getResumePdfUrl } from "@/data/resume";

export type ResumePdfCacheEntry = {
  url: string;
  buffer: ArrayBuffer;
  etag: string | null;
  lastModified: string | null;
  contentLength: string | null;
  fetchedAt: number;
};

type RevalidateResult =
  | { status: "unchanged" }
  | { status: "updated"; entry: ResumePdfCacheEntry }
  | { status: "error"; message: string };

let memoryCache: ResumePdfCacheEntry | null = null;
let inflightFetch: Promise<ResumePdfCacheEntry> | null = null;
let inflightRevalidate: Promise<RevalidateResult> | null = null;
let pdfJsPrefetched = false;
let revalidateWorker: Worker | null = null;

const updateListeners = new Set<(entry: ResumePdfCacheEntry) => void>();

function notifyListeners(entry: ResumePdfCacheEntry) {
  for (const listener of updateListeners) {
    listener(entry);
  }
}

function entryFromResponse(
  url: string,
  buffer: ArrayBuffer,
  response: Response,
): ResumePdfCacheEntry {
  return {
    url,
    buffer,
    etag: response.headers.get("etag"),
    lastModified: response.headers.get("last-modified"),
    contentLength: response.headers.get("content-length"),
    fetchedAt: Date.now(),
  };
}

function entryFromWorkerPayload(
  url: string,
  buffer: ArrayBuffer,
  meta: {
    etag: string | null;
    lastModified: string | null;
    contentLength: string | null;
  },
): ResumePdfCacheEntry {
  return {
    url,
    buffer,
    etag: meta.etag,
    lastModified: meta.lastModified,
    contentLength: meta.contentLength,
    fetchedAt: Date.now(),
  };
}

function getWorker(): Worker | null {
  if (typeof window === "undefined" || typeof Worker === "undefined") {
    return null;
  }

  if (!revalidateWorker) {
    revalidateWorker = new Worker("/resume-revalidate.worker.js");
  }

  return revalidateWorker;
}

function revalidateWithWorker(
  url: string,
  etag: string | null,
  lastModified: string | null,
): Promise<RevalidateResult> {
  return new Promise((resolve) => {
    const worker = getWorker();
    if (!worker) {
      resolve({ status: "error", message: "Worker unavailable" });
      return;
    }

    const onMessage = (event: MessageEvent) => {
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);

      const data = event.data as
        | { type: "unchanged" }
        | {
            type: "updated";
            buffer: ArrayBuffer;
            etag: string | null;
            lastModified: string | null;
            contentLength: string | null;
          }
        | { type: "error"; message: string };

      if (data.type === "unchanged") {
        resolve({ status: "unchanged" });
        return;
      }

      if (data.type === "error") {
        resolve({ status: "error", message: data.message });
        return;
      }

      const entry = entryFromWorkerPayload(url, data.buffer, data);
      const changed = hasResumePdfChanged(memoryCache, entry);
      memoryCache = entry;

      if (changed) {
        notifyListeners(entry);
        resolve({ status: "updated", entry });
      } else {
        resolve({ status: "unchanged" });
      }
    };

    const onError = () => {
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);
      resolve({ status: "error", message: "Revalidate worker failed" });
    };

    worker.addEventListener("message", onMessage);
    worker.addEventListener("error", onError);
    worker.postMessage({ url, etag, lastModified });
  });
}

async function revalidateOnMainThread(
  url: string,
  etag: string | null,
  lastModified: string | null,
): Promise<RevalidateResult> {
  const headers = new Headers();
  if (etag) headers.set("If-None-Match", etag);
  if (lastModified) headers.set("If-Modified-Since", lastModified);

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-cache",
  });

  if (response.status === 304) {
    return { status: "unchanged" };
  }

  if (!response.ok) {
    return {
      status: "error",
      message: `Resume revalidate failed (${response.status})`,
    };
  }

  const buffer = await response.arrayBuffer();
  const entry = entryFromResponse(url, buffer, response);
  const changed = hasResumePdfChanged(memoryCache, entry);
  memoryCache = entry;

  if (changed) {
    notifyListeners(entry);
    return { status: "updated", entry };
  }

  return { status: "unchanged" };
}

export function hasResumePdfChanged(
  previous: ResumePdfCacheEntry | null,
  next: ResumePdfCacheEntry,
): boolean {
  if (!previous || previous.url !== next.url) return true;
  if (previous.etag && next.etag) return previous.etag !== next.etag;
  if (previous.lastModified && next.lastModified) {
    return previous.lastModified !== next.lastModified;
  }
  if (
    previous.contentLength &&
    next.contentLength &&
    previous.contentLength !== next.contentLength
  ) {
    return true;
  }
  return previous.buffer.byteLength !== next.buffer.byteLength;
}

export async function fetchResumePdfBytes(): Promise<ArrayBuffer> {
  const entry = await fetchResumePdfEntry();
  return entry.buffer;
}

export async function fetchResumePdfEntry(): Promise<ResumePdfCacheEntry> {
  const url = getResumePdfUrl();

  if (memoryCache?.url === url) {
    return memoryCache;
  }

  if (inflightFetch) {
    return inflightFetch;
  }

  inflightFetch = fetch(url, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Resume fetch failed (${response.status})`);
      }
      return response.arrayBuffer().then((buffer) =>
        entryFromResponse(url, buffer, response),
      );
    })
    .then((entry) => {
      memoryCache = entry;
      return entry;
    })
    .finally(() => {
      inflightFetch = null;
    });

  return inflightFetch;
}

export function getCachedResumePdfBytes(): ArrayBuffer | null {
  return getCachedResumePdfEntry()?.buffer ?? null;
}

export function getCachedResumePdfEntry(): ResumePdfCacheEntry | null {
  const url = getResumePdfUrl();
  if (memoryCache?.url !== url) return null;
  return memoryCache;
}

/**
 * Stale-while-revalidate: keep showing cached PDF, check CDN for a newer copy.
 * Uses a dedicated worker when available (off main thread).
 */
export async function revalidateResumePdf(): Promise<RevalidateResult> {
  const url = getResumePdfUrl();
  const cached = getCachedResumePdfEntry();

  if (!cached) {
    try {
      const entry = await fetchResumePdfEntry();
      return { status: "updated", entry };
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Fetch failed",
      };
    }
  }

  if (inflightRevalidate) {
    return inflightRevalidate;
  }

  inflightRevalidate = (async (): Promise<RevalidateResult> => {
    const workerResult = await revalidateWithWorker(
      url,
      cached.etag,
      cached.lastModified,
    );

    if (workerResult.status !== "error") {
      return workerResult;
    }

    try {
      return await revalidateOnMainThread(
        url,
        cached.etag,
        cached.lastModified,
      );
    } catch (error) {
      return {
        status: "error" as const,
        message: error instanceof Error ? error.message : "Revalidate failed",
      };
    }
  })().finally(() => {
    inflightRevalidate = null;
  });

  return inflightRevalidate;
}

export function onResumePdfUpdated(
  listener: (entry: ResumePdfCacheEntry) => void,
): () => void {
  updateListeners.add(listener);
  return () => updateListeners.delete(listener);
}

/** Warm PDF bytes (and optionally pdf.js) after the home page is idle. */
export async function prefetchResumePdf(options?: {
  preloadPdfJs?: boolean;
  revalidateAfterPrefetch?: boolean;
}) {
  const tasks: Promise<unknown>[] = [fetchResumePdfBytes()];

  if (options?.preloadPdfJs !== false && !pdfJsPrefetched) {
    pdfJsPrefetched = true;
    tasks.push(
      import("pdfjs-dist/legacy/build/pdf.mjs").then((pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        return import("pdfjs-dist/legacy/web/pdf_viewer.mjs");
      }),
    );
  }

  await Promise.all(tasks);

  if (options?.revalidateAfterPrefetch !== false) {
    void revalidateResumePdf();
  }
}

export function clearResumePdfCache() {
  memoryCache = null;
  revalidateWorker?.terminate();
  revalidateWorker = null;
}
