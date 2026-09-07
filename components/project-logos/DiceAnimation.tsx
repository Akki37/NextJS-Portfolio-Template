"use client";

import BoardGamesLottie from "./BoardGamesLottie";
import type { ProjectLogoProps } from "./index";

export default function BoardGamesDiceAnimation({
  className,
}: ProjectLogoProps) {
  return (
    <BoardGamesLottie file="dice-board-games.lottie" className={className} />
  );
}
