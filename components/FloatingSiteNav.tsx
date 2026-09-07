"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollNavVisibility } from "@/hooks/useScrollNavVisibility";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme/ThemeProvider";
import SiteNav from "./SiteNav";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export default function FloatingSiteNav() {
  const { visible, atTop } = useScrollNavVisibility();
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const showSurface = visible && !atTop;

  if (pathname === "/resume") {
    return null;
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -20,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: smoothEase,
      }}
      className="fixed inset-x-0 top-8 z-50 flex justify-center md:top-12"
      aria-hidden={!visible}
    >
      <motion.div
        animate={{
          backgroundColor: showSurface
            ? isDark
              ? "rgba(0, 0, 0, 0.52)"
              : "rgba(255, 255, 255, 0.75)"
            : isDark
            ? "rgba(0, 0, 0, 0)"
            : "rgba(255, 255, 255, 0)",
          borderColor: showSurface
            ? isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
            : "rgba(0, 0, 0, 0)",
          boxShadow: showSurface
            ? isDark
              ? "0 12px 40px -12px rgba(0, 0, 0, 0.65)"
              : "0 12px 40px -12px rgba(0, 0, 0, 0.12)"
            : "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: smoothEase,
        }}
        className={`rounded-full border px-5 py-2.5 backdrop-blur-md md:px-7 md:py-3 ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <SiteNav route={pathname} />
      </motion.div>
    </motion.div>
  );
}
