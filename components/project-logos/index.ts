import type { ComponentType } from "react";
import AtlasLogo from "./AtlasLogo";
import BoardGamesDiceAnimation from "./DiceAnimation";
import JsVisualizerLogo from "./JsVisualizerIcon";
import PoppinsLogo from "./PoppinsIcon";
import BoardGamesStrategy from "./Strategy";
import BoardGamesTttLogo from "./TttLogoCard";

export type ProjectLogoProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

export type ProjectLogoComponent = ComponentType<ProjectLogoProps>;

export const projectLogoKeys = ["atlas", "jsVisualizer", "poppins"] as const;
export type ProjectLogoKey = (typeof projectLogoKeys)[number];

export const projectLogoCarouselKeys = ["boardGames"] as const;
export type ProjectLogoCarouselKey = (typeof projectLogoCarouselKeys)[number];

export const projectLogos: Record<ProjectLogoKey, ProjectLogoComponent> = {
  atlas: AtlasLogo,
  jsVisualizer: JsVisualizerLogo,
  poppins: PoppinsLogo,
};

export const projectLogoCarousels: Record<
  ProjectLogoCarouselKey,
  ProjectLogoComponent[]
> = {
  boardGames: [
    BoardGamesDiceAnimation,
    BoardGamesStrategy,
    BoardGamesTttLogo,
  ],
};

export {
  AtlasLogo,
  BoardGamesDiceAnimation,
  BoardGamesStrategy,
  BoardGamesTttLogo,
  JsVisualizerLogo,
  PoppinsLogo,
};
