'use client';

import {
  getResumeDownloadHref,
  RESUME_FILENAME,
} from "@/data/resume";
import { getStrings } from "@/strings";
import ResumePdfViewer from "./ResumePdfViewer";

export default function ResumeViewer() {
  const { resume: s } = getStrings();
  const downloadHref = getResumeDownloadHref();

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden px-4 pb-4 md:px-6 md:pb-5 md:pt-12">
      <div className="mx-auto flex w-full min-h-0 max-w-6xl flex-1 flex-col gap-5 md:gap-6">
        <div className="flex shrink-0 flex-col items-center justify-between gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div>
            <h1 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
              {s.pageTitle}
            </h1>
          </div>
          <a
            href={downloadHref}
            download={RESUME_FILENAME}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full border dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-white/25 dark:hover:bg-white/10 light:border-black/15 light:bg-black/5 light:text-neutral-800 light:hover:border-black/25 light:hover:bg-black/10 px-5 py-2.5 text-sm transition"
          >
            {s.download}
          </a>
        </div>

        <div className="min-h-0 flex-1">
          <ResumePdfViewer />
        </div>
      </div>
    </div>
  );
}
