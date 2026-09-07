export const PROJECT_CARD_ID_PREFIX = "project-";

export function projectCardId(slug: string) {
  return `${PROJECT_CARD_ID_PREFIX}${slug}`;
}

export function scrollToProjectCard(slug: string) {
  if (typeof window === "undefined") return;

  const slide = document.getElementById(projectCardId(slug));
  const section = document.getElementById("projects");
  if (!slide) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  const scroller = slide.closest<HTMLElement>("[data-projects-carousel]");
  if (scroller) {
    const slideRect = slide.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const delta =
      slideRect.left +
      slideRect.width / 2 -
      (scrollerRect.left + scrollerRect.width / 2);

    scroller.scrollTo({
      left: scroller.scrollLeft + delta,
      behavior,
    });
  } else {
    slide.scrollIntoView({ behavior, inline: "center", block: "nearest" });
  }

  section?.scrollIntoView({ behavior, block: "start" });
}
