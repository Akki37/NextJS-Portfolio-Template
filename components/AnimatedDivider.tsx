"use client";

import { motion } from "framer-motion";

type AnimatedDividerProps = {
  className?: string;
  delay?: number;
};

const smoothEase = [0.16, 1, 0.3, 1] as const;

const lineReveal = {
  initial: { opacity: 0, scaleX: 0 },
  animate: { opacity: 1, scaleX: 1 },
};

export default function AnimatedDivider({
  className = "",
  delay = 0,
}: AnimatedDividerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={lineReveal}
      transition={{ duration: 2, ease: smoothEase, delay }}
      className={`origin-center hidden h-px w-full max-w-xl bg-gradient-to-r from-transparent dark:via-white/35 light:via-black/35 to-transparent md:block transition-colors duration-300 ${className}`}
    />
  );
}
