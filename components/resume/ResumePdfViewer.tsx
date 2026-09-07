"use client";

import {
  fetchResumePdfBytes,
  getCachedResumePdfBytes,
  onResumePdfUpdated,
  type ResumePdfCacheEntry,
} from "@/lib/resumePdfCache";
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import { useEffect, useRef, useState } from "react";
import "pdfjs-dist/legacy/web/pdf_viewer.css";

type PdfViewerModule = typeof import("pdfjs-dist/legacy/web/pdf_viewer.mjs");

export default function ResumePdfViewer() {
  const shellRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let destroyed = false;
    let loadingTask: PDFDocumentLoadingTask | null = null;
    let pdfViewer: InstanceType<PdfViewerModule["PDFViewer"]> | null = null;
    let linkService: InstanceType<PdfViewerModule["PDFLinkService"]> | null =
      null;
    let pdfjsModule: typeof import("pdfjs-dist/legacy/build/pdf.mjs") | null = null;

    async function loadDocument(bytes: ArrayBuffer) {
      if (!pdfViewer || !linkService || !pdfjsModule || destroyed) return;

      loadingTask?.destroy();
      loadingTask = pdfjsModule.getDocument({ data: bytes.slice(0) });
      const pdfDocument: PDFDocumentProxy = await loadingTask.promise;
      if (destroyed || !pdfViewer) return;

      pdfViewer.setDocument(pdfDocument);
      linkService.setDocument(pdfDocument, null);
      setIsRendered(false);
      updateLayout();
    }

    function updateLayout() {
      const viewer = viewerRef.current;
      if (!viewer || !pdfViewer) return;

      pdfViewer.currentScaleValue = "page-width";

      requestAnimationFrame(() => {
        pdfViewer?.update();
      });
    }

    let removeResize: (() => void) | undefined;

    async function init() {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjsModule = pdfjs;

        (globalThis as typeof globalThis & { pdfjsLib: typeof pdfjs }).pdfjsLib =
          pdfjs;

        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdfjsViewer = await import("pdfjs-dist/legacy/web/pdf_viewer.mjs");

        const { EventBus, PDFLinkService, PDFViewer, LinkTarget } = pdfjsViewer;
        const container = containerRef.current;
        const viewer = viewerRef.current;
        if (!container || !viewer || destroyed) return;

        const eventBus = new EventBus();
        const link = new PDFLinkService({
          eventBus,
          externalLinkTarget: LinkTarget.BLANK,
          externalLinkRel: "noopener noreferrer nofollow",
        });
        linkService = link;

        pdfViewer = new PDFViewer({
          container,
          viewer,
          eventBus,
          linkService: link,
          removePageBorders: true,
        });

        link.setViewer(pdfViewer);

        eventBus.on("pagesinit", updateLayout);
        eventBus.on("pagerendered", () => {
          updateLayout();
          if (!destroyed) setIsRendered(true);
        });

        const cachedBytes = getCachedResumePdfBytes();
        const pdfBytes = cachedBytes ?? (await fetchResumePdfBytes());
        await loadDocument(pdfBytes);

        const onResize = () => updateLayout();
        window.addEventListener("resize", onResize, { passive: true });
        removeResize = () => window.removeEventListener("resize", onResize);
      } catch (err) {
        if (!destroyed) {
          setError(err instanceof Error ? err.message : "Failed to load resume");
        }
      }
    }

    const unsubscribe = onResumePdfUpdated((entry: ResumePdfCacheEntry) => {
      void loadDocument(entry.buffer);
    });

    void init();

    return () => {
      destroyed = true;
      unsubscribe();
      removeResize?.();
      loadingTask?.destroy();
      pdfViewer?.cleanup();
    };
  }, []);

  if (error) {
    return (
      <p className="text-center text-sm dark:text-neutral-500 light:text-neutral-600">
        Could not load resume. Try downloading the PDF instead.
      </p>
    );
  }

  return (
    <div
      ref={shellRef}
      className="resume-pdf-shell relative mx-auto h-full min-h-[240px] w-full max-w-[820px] rounded-lg p-1 ring-1 dark:ring-white/10 light:ring-black/10 md:p-1.5"
    >
      {!isRendered ? (
        <div
          aria-hidden
          className="absolute inset-1 animate-pulse rounded-md dark:bg-white/[0.04] light:bg-black/[0.04] md:inset-1.5"
        />
      ) : null}
      <div
        ref={containerRef}
        className={`resume-pdf-viewer resume-pdf-scroll absolute inset-1 overflow-x-hidden overflow-y-auto rounded-md md:inset-1.5 ${
          isRendered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <div ref={viewerRef} className="pdfViewer" />
      </div>
    </div>
  );
}
