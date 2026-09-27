import { DEFAULT_RESUME_PATH } from "@/data/resume";

function withVersion(base: string): string {
  const version = process.env.NEXT_PUBLIC_RESUME_PDF_VERSION?.trim();
  if (!version) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}v=${encodeURIComponent(version)}`;
}

/**
 * Server-only origin of the resume PDF (Vercel Blob or local public file).
 * Do not import this from client components — the viewer must use `/resume/file`.
 */
export function getResumeSourceUrl(): string {
  const base = process.env.NEXT_PUBLIC_RESUME_PDF_URL ?? DEFAULT_RESUME_PATH;
  return withVersion(base);
}
