"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NAV_TOP_ALWAYS_VISIBLE_PX } from "@/hooks/useScrollNavVisibility";

const SECTION_IDS = ["about", "experience", "projects", "education", "contact"];
const ACTIVE_SECTION_OFFSET_PX = 160;

function updateUrlHash(hash: string | null) {
  const { pathname, search, hash: currentHash } = window.location;
  const nextHash = hash ? `#${hash}` : "";

  if (currentHash === nextHash) {
    return;
  }

  window.history.replaceState(
    window.history.state,
    "",
    `${pathname}${search}${nextHash}`,
  );
}

export default function SectionHashSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section instanceof HTMLElement,
    );

    if (sections.length === 0) {
      return;
    }

    let ticking = false;

    const syncHash = () => {
      ticking = false;

      if (window.scrollY <= NAV_TOP_ALWAYS_VISIBLE_PX) {
        updateUrlHash(null);
        return;
      }

      let activeSectionId: string | null = null;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= ACTIVE_SECTION_OFFSET_PX) {
          activeSectionId = section.id;
        }
      }

      updateUrlHash(activeSectionId);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncHash);
    };

    if (!window.location.hash || window.scrollY > NAV_TOP_ALWAYS_VISIBLE_PX) {
      syncHash();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
