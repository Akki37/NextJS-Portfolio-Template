"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_UP_HIDE_PX = 6;
const SCROLL_DOWN_SHOW_PX = 8;

function isPastHeroSection(): boolean {
  const hero = document.querySelector("[data-hero-section]");
  if (!hero) {
    return window.scrollY > window.innerHeight * 0.92;
  }

  const { bottom } = hero.getBoundingClientRect();
  return bottom <= window.innerHeight * 0.55;
}

export function useScrollToTopButton(enabled: boolean) {
  const [visible, setVisible] = useState(false);
  const returningToTopRef = useRef(false);
  const scrolledDownPastHeroRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;
      const pastHero = isPastHeroSection();

      if (!pastHero || currentScrollY <= 0) {
        setVisible(false);
        returningToTopRef.current = false;
        scrolledDownPastHeroRef.current = false;
      } else if (returningToTopRef.current) {
        setVisible(false);
        if (currentScrollY <= 48 || !pastHero) {
          returningToTopRef.current = false;
        }
      } else if (delta < -SCROLL_UP_HIDE_PX) {
        setVisible(false);
        scrolledDownPastHeroRef.current = false;
      } else if (delta > SCROLL_DOWN_SHOW_PX) {
        scrolledDownPastHeroRef.current = true;
        setVisible(true);
      } else if (pastHero && scrolledDownPastHeroRef.current) {
        setVisible(true);
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
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  const scrollToTop = () => {
    returningToTopRef.current = true;
    setVisible(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { visible: enabled && visible, scrollToTop };
}
