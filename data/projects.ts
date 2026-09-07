import type {
  ProjectLogoCarouselKey,
  ProjectLogoKey,
} from "@/components/project-logos";

export type ProjectAccent = "blue" | "ember" | "lilac" | "slate" | "violet";

export type Project = {
  slug: string;
  /** Title of the project. */
  title: string;
  /** Optional tag for the project. */
  tag?: string;
  /** Optional category for the project. */
  category?: string;
  /** Description of the project. */
  description: string;
  /** Technology stack for the project. */
  tech: string[];
  /** Accent color for the project. */
  accent: ProjectAccent;
  /** Single static SVG logo component key. */
  logo?: ProjectLogoKey;
  /** Rotating animated SVG logos — Board Games only for now. */
  logoCarousel?: ProjectLogoCarouselKey;
  /** Optional route for the project. */
  route?: string;
  /** Optional external link for the project. */
  href?: string;
  /** When true, clicking shows an on-page toast instead of navigating. */
  selfLink?: boolean;
  /**
   * When true: render `projectMocks[slug]` under a blur sheet, and block the
   * detail route. Flip to false when the real project is ready to reveal.
   */
  confidential?: boolean;
};

/**
 * Pending assets / links (add later):
 * - Atlas: Notion project hub
 * - Poppins: marketing home page URL, Notion documentation
 * - Board Games: marketing home page URL, app store / production URL
 * - Portfolio: project logo
 */
export const projects: Project[] = [
  {
    slug: "js-visualizer",
    title: "JS Visualizer",
    tag: "Live • Ongoing expansion.",
    category: "Web App",
    description:
      "Educational platform that transforms source code into frame-by-frame execution—call stack, closures, heap, hoisting, TDZ, and JavaScript's runtime model.",
    tech: ["TypeScript", "React", "Monorepo", "Simulator"],
    accent: "blue",
    logo: "jsVisualizer",
    route: "/projects/js-visualizer",
    href: "https://javascript-runtime-visualizer.vercel.app",
  },
  {
    slug: "poppins",
    title: "Poppins",
    tag: "Beta • v1 Rolled Out",
    category: "Mobile App",
    description:
      "Budget-aware spending companion for India—plan in glass bubbles, log expenses, and hand off UPI payments with the amount pre-filled.",
    tech: ["React Native", "Expo", "TypeScript", "SQLite"],
    accent: "lilac",
    logo: "poppins",
    route: "/projects/poppins",
  },
  {
    slug: "atlas",
    title: "Atlas",
    tag: "Work In Progress...",
    category: "Widget",
    description:
      "Realtime AI stream companion—intelligent co-host for live creators with animated orb UI, WebSocket runtime, voice input, and optional OpenRouter conversation.",
    tech: ["React", "Node.js", "WebSocket", "Vite"],
    accent: "violet",
    logo: "atlas",
    route: "/projects/atlas",
    href: "https://atlas-three-bice.vercel.app",
    // Flip to false when Atlas is ready to reveal (card + /projects/atlas).
    confidential: true,
  },
  {
    slug: "board-games",
    title: "Board Games",
    tag: "Work In Progress...",
    category: "Mobile App",
    description:
      "Offline-first pass-and-play board games on a shared device—no login, backend, or internet required.",
    tech: ["React Native", "Expo", "TypeScript", "Zustand"],
    accent: "blue",
    logoCarousel: "boardGames",
    route: "/projects/board-games",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description:
      "Personal frontend portfolio—intentional typography, restrained motion, and a curated showcase of selected work.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    accent: "slate",
    selfLink: true,
  },
];

import { resolveCardProject } from "./projectMocks";

export { projectMocks, resolveCardProject } from "./projectMocks";

/** Projects as shown in the carousel — mocks replace locked cards. */
export function getCarouselProjects(): Project[] {
  return projects.map(resolveCardProject);
}