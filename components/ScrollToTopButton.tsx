"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useScrollToTopButton } from "@/hooks/useScrollToTopButton";
import { getStrings } from "@/strings";

const smoothEase = [0.16, 1, 0.3, 1] as const;
const breatheDuration = 2.4;

const { home: s } = getStrings();

function UpArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const { visible, scrollToTop } = useScrollToTopButton(Boolean(pathname));
  const reduceMotion = useReducedMotion();

  if (!Boolean(pathname) || pathname === "/resume") return null;

  const breathe = visible && !reduceMotion;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
        scale: visible ? 1 : 0.88,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: smoothEase,
      }}
      className={`fixed bottom-6 left-6 z-40 ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label={s.scrollToTopLabel}
        animate={
          breathe
            ? { y: [0, -3, 0] }
            : { y: 0 }
        }
        transition={
          breathe
            ? {
                duration: breatheDuration * 1.15,
                delay: 0.22,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0 }
        }
        className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-white/10 dark:bg-black/52 dark:text-neutral-300 dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] dark:hover:border-white/20 dark:hover:text-white light:border-black/10 light:bg-white/80 light:text-neutral-700 light:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] light:hover:border-black/20 light:hover:text-black backdrop-blur-md transition-colors"
      >
        <motion.span
          animate={
            breathe
              ? { y: [0, -5, 0], opacity: [0.85, 1, 0.85] }
              : { y: 0, opacity: 1 }
          }
          transition={
            breathe
              ? {
                  duration: breatheDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0 }
          }
          className="flex items-center justify-center"
        >
          <UpArrowIcon />
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
