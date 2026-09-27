import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_RESUME_PATH, RESUME_FILENAME } from "@/data/resume";
import { getResumeSourceUrl } from "@/lib/resumePdfSource";

const ALLOW_METHODS = "GET, HEAD, OPTIONS";

function isHttpUrl(url: string): boolean {
  return url.startsWith("https://") || url.startsWith("http://");
}

function localPdfPath(sourceUrl: string): string | null {
  const pathname = sourceUrl.split("?")[0]?.split("#")[0] ?? "";
  if (pathname !== DEFAULT_RESUME_PATH) return null;
  return path.join(process.cwd(), "public", pathname.slice(1));
}

function responseHeaders(input: {
  download: boolean;
  contentType?: string | null;
  etag?: string | null;
  lastModified?: string | null;
  contentLength?: string | null;
}): Headers {
  const headers = new Headers();
  headers.set("Content-Type", input.contentType || "application/pdf");
  headers.set(
    "Content-Disposition",
    `${input.download ? "attachment" : "inline"}; filename="${RESUME_FILENAME}"`,
  );
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set("Allow", ALLOW_METHODS);
  if (input.etag) headers.set("ETag", input.etag);
  if (input.lastModified) headers.set("Last-Modified", input.lastModified);
  if (input.contentLength) headers.set("Content-Length", input.contentLength);
  return headers;
}

async function proxyRemote(
  request: Request,
  sourceUrl: string,
  method: "GET" | "HEAD",
  download: boolean,
): Promise<Response> {
  const headers = new Headers();
  const ifNoneMatch = request.headers.get("if-none-match");
  const ifModifiedSince = request.headers.get("if-modified-since");
  if (ifNoneMatch) headers.set("If-None-Match", ifNoneMatch);
  if (ifModifiedSince) headers.set("If-Modified-Since", ifModifiedSince);

  const upstream = await fetch(sourceUrl, {
    method,
    headers,
    cache: "no-store",
    redirect: "follow",
  });

  if (upstream.status === 304) {
    return new Response(null, {
      status: 304,
      headers: responseHeaders({
        download,
        etag: upstream.headers.get("etag"),
        lastModified: upstream.headers.get("last-modified"),
      }),
    });
  }

  if (!upstream.ok) {
    return new Response("Resume PDF is unavailable.", {
      status: 502,
      headers: { Allow: ALLOW_METHODS },
    });
  }

  const outHeaders = responseHeaders({
    download,
    contentType: upstream.headers.get("content-type"),
    etag: upstream.headers.get("etag"),
    lastModified: upstream.headers.get("last-modified"),
    contentLength: method === "HEAD" ? upstream.headers.get("content-length") : null,
  });

  return new Response(method === "HEAD" ? null : upstream.body, {
    status: 200,
    headers: outHeaders,
  });
}

async function proxyLocalFile(
  request: Request,
  sourceUrl: string,
  method: "GET" | "HEAD",
  download: boolean,
): Promise<Response> {
  const filePath = localPdfPath(sourceUrl);
  if (!filePath) {
    return new Response("Resume PDF is unavailable.", { status: 404 });
  }

  const fileStat = await stat(filePath);
  const etag = `"${fileStat.size}-${Math.trunc(fileStat.mtimeMs)}"`;
  const lastModified = fileStat.mtime.toUTCString();
  const ifNoneMatch = request.headers.get("if-none-match");

  if (ifNoneMatch === etag) {
    return new Response(null, {
      status: 304,
      headers: responseHeaders({ download, etag, lastModified }),
    });
  }

  const headers = responseHeaders({
    download,
    etag,
    lastModified,
    contentLength: String(fileStat.size),
  });

  if (method === "HEAD") {
    return new Response(null, { status: 200, headers });
  }

  const buffer = await readFile(filePath);
  return new Response(buffer, { status: 200, headers });
}

async function proxyResume(request: Request, method: "GET" | "HEAD") {
  const download = new URL(request.url).searchParams.get("download") === "1";
  const sourceUrl = getResumeSourceUrl();

  try {
    if (isHttpUrl(sourceUrl)) {
      return await proxyRemote(request, sourceUrl, method, download);
    }
    return await proxyLocalFile(request, sourceUrl, method, download);
  } catch {
    return new Response("Resume PDF is unavailable.", { status: 502 });
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { Allow: ALLOW_METHODS },
  });
}

export function GET(request: Request) {
  return proxyResume(request, "GET");
}

export function HEAD(request: Request) {
  return proxyResume(request, "HEAD");
}
