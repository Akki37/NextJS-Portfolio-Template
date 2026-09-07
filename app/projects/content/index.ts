import { Project } from "@/lib/project/types";
import { projects as portfolioProjects } from "@/data/projects";

import { jsVisualizer } from "./js-visualizer";
import { atlas } from "./atlas";
import { poppins } from "./poppins";
import { boardGames } from "./board-games";

const catalog: Record<string, Project> = {
  [jsVisualizer.slug]: jsVisualizer,
  [boardGames.slug]: boardGames,
  [atlas.slug]: atlas,
  [poppins.slug]: poppins,
};

/** Drop detail pages for confidential cards so they are not routable. */
export const projects: Record<string, Project> = Object.fromEntries(
  Object.entries(catalog).filter(([slug]) => {
    const card = portfolioProjects.find((project) => project.slug === slug);
    return !card?.confidential;
  }),
);