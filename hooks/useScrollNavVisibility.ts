"use client";

import { useEffect, useState } from "react";

/** Always show nav when within this distance from the top. */
export const NAV_TOP_ALWAYS_VISIBLE_PX = 72;
/** Hide after scrolling down at least this many pixels in one tick. */
const SCROLL_DOWN_HIDE_PX = 8;
/** Reveal after this much upward scroll is accumulated. */
const SCROLL_UP_REVEAL_PX = 32;

export type ScrollNavState = {
  visible: boolean;
  /** True when near the top of the page — nav uses default (no surface) styling. */
  atTop: boolean;
};

export function useScrollNavVisibility(): ScrollNavState {
  const [state, setState] = useState<ScrollNavState>({
    visible: true,
    atTop: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedUp = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;
      const atTop = currentScrollY <= NAV_TOP_ALWAYS_VISIBLE_PX;

      if (atTop) {
        setState({ visible: true, atTop: true });
        accumulatedUp = 0;
      } else if (delta > SCROLL_DOWN_HIDE_PX) {
        setState({ visible: false, atTop: false });
        accumulatedUp = 0;
      } else if (delta < 0) {
        accumulatedUp += -delta;
        if (accumulatedUp >= SCROLL_UP_REVEAL_PX) {
          setState({ visible: true, atTop: false });
        }
      }

      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
