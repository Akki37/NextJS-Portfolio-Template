/** Local fallback when NEXT_PUBLIC_RESUME_PDF_URL is not set. */
export const RESUME_FILENAME = "vikas-goswami-resume.pdf";

export const DEFAULT_RESUME_PATH = `/resume/${RESUME_FILENAME}`;

/** Same-origin proxy. The viewer must fetch this, never the Blob URL. */
export const RESUME_PDF_FILE_PATH = "/resume/file";

function withVersion(base: string): string {
  const version = process.env.NEXT_PUBLIC_RESUME_PDF_VERSION?.trim();
  if (!version) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}v=${encodeURIComponent(version)}`;
}

/** Client-facing PDF URL (same-origin). Blob stays on the server. */
export function getResumePdfUrl(): string {
  return withVersion(RESUME_PDF_FILE_PATH);
}

export function getResumeDownloadHref(): string {
  const url = getResumePdfUrl();
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}download=1`;
}
