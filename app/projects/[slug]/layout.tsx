import type { ReactNode } from "react";
import MainWrapper from "@/components/MainWrapper";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <MainWrapper>{children}</MainWrapper>;
}
