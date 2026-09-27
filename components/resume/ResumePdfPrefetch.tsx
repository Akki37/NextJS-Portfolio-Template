"use client";

import {
  prefetchResumePdf,
  revalidateResumePdf,
} from "@/lib/resumePdfCache";
import { getResumePdfUrl } from "@/data/resume";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVALIDATE_INTERVAL_MS = 5 * 60 * 1000;

export default function ResumePdfPrefetch() {
  const pathname = usePathname();

  useEffect(() => {
    const url = getResumePdfUrl();

    const prefetchLink = document.createElement("link");
    prefetchLink.rel = "prefetch";
    prefetchLink.href = url;
    prefetchLink.as = "fetch";
    document.head.appendChild(prefetchLink);

    const warm = () => {
      void prefetchResumePdf({ preloadPdfJs: true, revalidateAfterPrefetch: true });
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(warm, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(warm, 1200);
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void revalidateResumePdf();
      }
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      prefetchLink.remove();
      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/resume") return;

    void revalidateResumePdf();

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void revalidateResumePdf();
      }
    }, REVALIDATE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [pathname]);

  return null;
}
