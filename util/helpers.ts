// const defaultItems = [
//     { label: jv.nav.about, href: getSectionHref({ hash: '#about', atPath }) },
//     { label: jv.nav.architecture, href: getSectionHref({ hash: '#architecture', atPath }) },
//     { label: jv.nav.features, href: getSectionHref({ hash: '#features', atPath }) },
//     { label: jv.nav.engineeringChallenges, href: getSectionHref({ hash: '#engineering-challenges', atPath }) },
//     { label: jv.nav.techStack, href: getSectionHref({ hash: '#tech-stack', atPath }) },
//     { label: jv.nav.roadmap, href: getSectionHref({ hash: '#roadmap', atPath }) },
//     { label: jv.nav.work, href: getSectionHref({ hash: '#work', atPath }) },
//     { label: jv.nav.stats, href: "/resume" },
//   ];

import { getStrings } from "@/strings";
import type { NavItems } from "@/lib/nav/types";
import { SectionHrefProps } from "./getSectionHref";

const lang = getStrings();

type NavRecord = Record<string, string>;

export function convertRouteIntoKeys(route: string) {
  return route.split("/").filter(Boolean);
}

export function fetchNavItemsFromLocal(route: string): NavRecord | undefined {
  const keys = convertRouteIntoKeys((!route || route === '/') ? 'home' : route);
  let targetGroup: unknown = lang;

  for (const key of keys) {
    if (!targetGroup || typeof targetGroup !== "object" || !(key in targetGroup)) {
      return undefined;
    }
    targetGroup = (targetGroup as Record<string, unknown>)[key];
  }

  if (targetGroup && typeof targetGroup === "object" && "nav" in targetGroup) {
    return (targetGroup as { nav: NavRecord }).nav;
  }

  return undefined;
}

export function generateNavItems(
  route: string,
  hook: (props: SectionHrefProps) => string,
): NavItems[] {
  const items = fetchNavItemsFromLocal(route);

  if (!items) return [];

  return Object.entries(items).map(([hash, label]) => ({
    label,
    href: hash === 'resume' ? '/resume' : hook({ hash: `#${hash}`, atPath: route, checkPath: route }),
  }));
}