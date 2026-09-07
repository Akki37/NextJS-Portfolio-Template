// lib/project/index.ts

import { projects } from "@/app/projects/content";

export function getProject(slug: string) {
  return projects[slug];
}

export function getProjects() {
  return Object.values(projects);
}