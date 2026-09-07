/** Local fallback when NEXT_PUBLIC_RESUME_PDF_URL is not set. */
export const RESUME_FILENAME = "vikas-goswami-resume.pdf";

export const DEFAULT_RESUME_PATH = `/resume/${RESUME_FILENAME}`;

/** Optional deploy-time version — bump when Blob URL stays the same but file changes. */
export function getResumePdfUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_RESUME_PDF_URL ?? DEFAULT_RESUME_PATH;
  const version = process.env.NEXT_PUBLIC_RESUME_PDF_VERSION?.trim();

  if (!version) return base;

  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}v=${encodeURIComponent(version)}`;
}

/** Set NEXT_PUBLIC_RESUME_PDF_URL in .env.local (e.g. Vercel Blob URL) to override. */

export function getResumeDownloadHref(): string {
  const url = getResumePdfUrl();
  if (url.startsWith("http") && url.includes("blob.vercel-storage.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}download=1`;
  }
  return url;
}
