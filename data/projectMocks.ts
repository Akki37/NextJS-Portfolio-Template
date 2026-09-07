import type { Project } from "./projects";

/**
 * Decoy card content shown under the confidential blur.
 * Real project data stays on the main `projects` entry — flip `confidential: false`
 * there when you're ready to ship the real card + detail route.
 */
export const projectMocks: Record<string, Omit<Project, "confidential">> = {
  atlas: {
    slug: "atlas",
    title: "Atlas",
    tag: "Classified • Hands Off",
    category: "???",
    description:
      "I know you'll try this. Spoilers aren't free. Come back later.",
    tech: ["Curiosity", "DevTools", "Nice Try", "Soon™"],
    accent: "violet",
    logo: "atlas",
  },
};

/** Swap in mock bait for locked cards (no route/href). */
export function resolveCardProject(project: Project): Project {
  if (!project.confidential) return project;

  const mock = projectMocks[project.slug];
  if (!mock) {
    return {
      slug: project.slug,
      title: project.title,
      description: "",
      tech: [],
      accent: project.accent,
      confidential: true,
    };
  }

  return {
    ...mock,
    slug: project.slug,
    confidential: true,
  };
}
