"use client";

import TttLogoSvg from "./TttLogo";
import type { ProjectLogoProps } from "./index";

export default function BoardGamesTttLogo({ className }: ProjectLogoProps) {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className ?? ""}`}>
      <TttLogoSvg
        className="h-full w-full max-h-full max-w-full object-contain object-center drop-shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
        aria-hidden
      />
    </div>
  );
}
