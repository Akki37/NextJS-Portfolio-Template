"use client";

import { motion } from "framer-motion";
import { getStrings } from "@/strings";
import WaveText from "@components/smoothui/wave-text";
import ScrambleHover from "@components/smoothui/scramble-hover";
import AnimatedDivider from "@/components/AnimatedDivider";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const { home: s } = getStrings();

export default function Hero() {
  return (
    <section
      id="overview"
      data-hero-section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <AnimatedDivider className="mb-10" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          {...fadeUp}
          transition={{ duration: 1.5, ease: smoothEase, delay: 0.35 }}
          className="cursor-default bg-gradient-to-b dark:from-white dark:via-white dark:to-zinc-500 light:from-black light:via-black light:to-zinc-600 bg-clip-text py-1 text-5xl font-semibold tracking-tight text-transparent text-edge-outline sm:text-7xl md:text-8xl"
        >
          <ScrambleHover>{s.name}</ScrambleHover>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{
            duration: 1.5,
            ease: smoothEase,
            delay: 0.65,
          }}
          className="mt-5 max-w-xl text-lg dark:text-neutral-200 light:text-neutral-800 lg:text-base"
        >
          {s.role}
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{
            duration: 1.5,
            ease: smoothEase,
            delay: 0.9,
          }}
          className="mt-3 max-w-lg text-xs dark:text-neutral-500 light:text-neutral-600 md:text-sm"
        >
          {s.tagline}
        </motion.p>
      </div>

      <AnimatedDivider className="mt-10" delay={0.5} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.6, ease: smoothEase }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[12px] uppercase tracking-[0.25em] dark:text-neutral-600 light:text-neutral-500"
      >
        <WaveText>{s.scrollHint}</WaveText>
      </motion.div>
    </section>
  );
}
