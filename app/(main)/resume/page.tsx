import type { Metadata } from "next";
import ResumeViewer from "@/components/resume/ResumeViewer";
import { getStrings } from "@/strings";

const { resume: resumeMeta, home } = getStrings();

export const metadata: Metadata = {
  title: `${resumeMeta.pageTitle} — ${home.name}`,
  description: resumeMeta.metaDescription,
};

export default function ResumePage() {
  return (
    <main className="h-[100dvh] overflow-hidden">
      <ResumeViewer />
    </main>
  );
}
