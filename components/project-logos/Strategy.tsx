"use client";

import BoardGamesLottie from "./BoardGamesLottie";
import type { ProjectLogoProps } from "./index";

export default function BoardGamesStrategy({ className }: ProjectLogoProps) {
  return (
    <BoardGamesLottie file="chess-board-games.lottie" className={className} />
  );
}
