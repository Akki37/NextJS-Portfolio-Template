import type { ReactNode } from "react";
import BackgroundParticles from "./BackgroundParticles";
import FloatingSiteNav from "./FloatingSiteNav";
import ResumePdfPrefetch from "./resume/ResumePdfPrefetch";
import ScrollToTopButton from "./ScrollToTopButton";
import SectionHashSync from "./SectionHashSync";
import SiteCredit from "./SiteCredit";
import ToastProvider from "./ToastProvider";

type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <div className="relative isolate min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-tl dark:from-black dark:via-zinc-600/12 dark:to-black light:from-white light:via-zinc-400/12 light:to-white transition-colors duration-300"
      />
      <BackgroundParticles quantity={150} />
      <ResumePdfPrefetch />
      <SectionHashSync />
      <FloatingSiteNav />
      <ScrollToTopButton />
      <ToastProvider>
        <div className="relative z-10">
          {children}
          <SiteCredit />
        </div>
      </ToastProvider>
    </div>
  );
}
