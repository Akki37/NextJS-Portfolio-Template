"use client";

import { motion } from "framer-motion";
import { getStrings } from "@/strings";
import WaveText from "@components/smoothui/wave-text";
import ScrambleHover from "@components/smoothui/scramble-hover";
import type { Project } from "@/lib/project/types";
import AnimatedDivider from "@/components/AnimatedDivider";
import { LinkIcon } from "@/components/icons";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const { globalStrings: gs } = getStrings();

export default function Hero({ project }: { project: Project }) {
  return (
    <section
      id="overview"
      data-hero-section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-foreground"
    >
      {/* Top Decorative Line */}
      <AnimatedDivider className="mb-12" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Main Project Title Header */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 1.5, ease: smoothEase, delay: 0.35 }}
          className="cursor-default bg-gradient-to-b dark:from-white dark:via-neutral-100 dark:to-neutral-500 light:from-black light:via-neutral-900 light:to-neutral-600 bg-clip-text py-1 text-5xl font-semibold tracking-tight text-transparent sm:text-7xl md:text-8xl"
        >
          <ScrambleHover>{project.title}</ScrambleHover>
        </motion.h1>

        {/* Primary Tagline Statement */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 1.5, ease: smoothEase, delay: 0.65 }}
          className="mt-6 max-w-xl text-base dark:text-neutral-300 light:text-neutral-700 sm:text-lg leading-relaxed"
        >
          {project.tagline}
        </motion.p>

        {/* Supporting Context Description */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 1.5, ease: smoothEase, delay: 0.8 }}
          className="mt-4 max-w-lg text-sm dark:text-neutral-500 light:text-neutral-600 leading-relaxed px-4"
        >
          {project.description}
        </motion.p>

        {/* Action Call-To-Action (CTA) Links Container */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 1.5, ease: smoothEase, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {project.links.map((link) => {
            const isLiveDemo = link.label.toLowerCase().includes("live");
            const isDownload =
              link.label.toLowerCase().includes("download") ||
              link.icon === "android" ||
              link.href.toLowerCase().endsWith(".apk");
            const isPlaceholder = link.href === "#";
            const className = `inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 border ${
              isLiveDemo || isDownload
                ? "dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200 light:bg-black light:text-white light:border-black light:hover:bg-neutral-800"
                : "dark:bg-white/[0.03] dark:text-neutral-300 dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-white/[0.06] light:bg-black/[0.03] light:text-neutral-700 light:border-black/10 light:hover:border-black/30 light:hover:bg-black/[0.06]"
            } ${isPlaceholder ? "cursor-default opacity-80" : ""}`;

            if (isPlaceholder) {
              return (
                <span
                  key={link.label}
                  className={className}
                  aria-disabled="true"
                >
                  {link.icon ? (
                    <LinkIcon icon={link.icon} className="h-4 w-4 shrink-0" />
                  ) : null}
                  {link.label}
                </span>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                {...(isDownload ? { download: "poppins.apk" } : {})}
              >
                {link.icon ? (
                  <LinkIcon icon={link.icon} className="h-4 w-4 shrink-0" />
                ) : null}
                {link.label}
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Center Separation Line */}
      <AnimatedDivider className="mt-12" delay={0.5} />

      {/* Dynamic Key Metadata Highlights Group */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-6xl px-4 text-center">
        {project.highlights.map((highlight, index) => (
          <div key={highlight.label} className="flex items-center gap-x-6">
            <motion.span
              {...fadeUp}
              transition={{
                duration: 1.5,
                ease: smoothEase,
                delay: 1.1 + index * 0.1,
              }}
              className="text-xs font-mono tracking-wide dark:text-neutral-500 dark:hover:text-neutral-400 light:text-neutral-600 light:hover:text-neutral-800 transition-colors"
            >
              {highlight.label}
            </motion.span>
            {index !== project.highlights.length - 1 && (
              <span
                className="h-1 w-1 rounded-full dark:bg-neutral-800 light:bg-neutral-300 hidden sm:block"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Layout Scroll Indicator Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.6, ease: smoothEase }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.35em] dark:text-neutral-600 light:text-neutral-500 select-none pointer-events-none"
      >
        <WaveText>{gs.scrollHint}</WaveText>
      </motion.div>
    </section>
  );
}
