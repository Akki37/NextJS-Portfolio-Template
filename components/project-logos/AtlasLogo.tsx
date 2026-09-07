"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";

type AtlasLogoProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

export default function AtlasLogo({ className }: AtlasLogoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex w-full items-center justify-center">
      <DotLottieReact
        src="/projects/atlas-logo.lottie"
        loop={!reduceMotion}
        autoplay={!reduceMotion}
        className={className}
        aria-hidden
      />
    </div>
  );
}
