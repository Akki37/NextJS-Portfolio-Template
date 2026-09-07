"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";
import type { ProjectLogoProps } from "./index";

const BOARD_GAMES_LOTTIE_BASE = "/projects/board-games";

const BOARD_GAMES_LOTTIE_CLASS =
  "h-full w-full max-h-full max-w-full object-contain object-center drop-shadow-[0_16px_48px_rgba(0,0,0,0.5)]";

type BoardGamesLottieProps = ProjectLogoProps & {
  file: string;
};

export function boardGamesLottieSrc(file: string) {
  return `${BOARD_GAMES_LOTTIE_BASE}/${file}`;
}

export default function BoardGamesLottie({
  file,
  className,
}: BoardGamesLottieProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className ?? ""}`}
    >
      <DotLottieReact
        src={boardGamesLottieSrc(file)}
        loop={!reduceMotion}
        autoplay={!reduceMotion}
        className={BOARD_GAMES_LOTTIE_CLASS}
        aria-hidden
      />
    </div>
  );
}
