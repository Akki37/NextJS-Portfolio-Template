/**
 * Background worker: conditional GET against the same-origin resume proxy.
 * Returns 304 when unchanged, or fresh bytes + headers when updated.
 */
self.onmessage = async (event) => {
  const { url, etag, lastModified } = event.data;

  const headers = new Headers();
  if (etag) headers.set("If-None-Match", etag);
  if (lastModified) headers.set("If-Modified-Since", lastModified);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-cache",
    });

    if (response.status === 304) {
      self.postMessage({ type: "unchanged" });
      return;
    }

    if (!response.ok) {
      self.postMessage({
        type: "error",
        message: `Resume revalidate failed (${response.status})`,
      });
      return;
    }

    const buffer = await response.arrayBuffer();
    self.postMessage(
      {
        type: "updated",
        etag: response.headers.get("etag"),
        lastModified: response.headers.get("last-modified"),
        contentLength: response.headers.get("content-length"),
        buffer,
      },
      { transfer: [buffer] },
    );
  } catch (error) {
    self.postMessage({
      type: "error",
      message: error instanceof Error ? error.message : "Revalidate failed",
    });
  }
};
