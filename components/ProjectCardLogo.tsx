"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  projectLogoCarousels,
  projectLogos,
  type ProjectLogoCarouselKey,
  type ProjectLogoComponent,
  type ProjectLogoKey,
} from "./project-logos";

const LOGO_FRAME_CLASS =
  "pointer-events-none absolute left-0 top-[-28px] z-10 h-fit w-full opacity-90 transition duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-100 [mask-image:linear-gradient(to_bottom,black_50%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_92%)]";

const ATLAS_LOGO_FRAME_CLASS =
  "pointer-events-none absolute inset-x-0 top-[-28px] z-10 flex h-fit w-full items-center justify-center opacity-90 transition duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-100 [mask-image:linear-gradient(to_bottom,black_50%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_92%)]";

const LOGO_MEDIA_CLASS =
  "h-auto w-full object-contain object-left-top drop-shadow-[0_16px_48px_rgba(0,0,0,0.5)]";

const ATLAS_LOGO_MEDIA_CLASS =
  "aspect-square h-auto w-[138%] max-w-none object-contain object-center drop-shadow-[0_16px_48px_rgba(0,0,0,0.5)]";

const BOARD_GAMES_LOGO_FRAME_CLASS =
  "pointer-events-none absolute inset-x-0 top-[-20px] z-10 flex h-[58%] w-full items-center justify-center opacity-90 transition duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-100 [mask-image:linear-gradient(to_bottom,black_55%,transparent_94%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_94%)]";

const BOARD_GAMES_LOGO_MEDIA_CLASS = "h-full w-full";

type LogoFrameProps = {
  children: ReactNode;
  className?: string;
};

function LogoFrame({ children, className = LOGO_FRAME_CLASS }: LogoFrameProps) {
  return (
    <div className={className} aria-hidden>
      {children}
    </div>
  );
}

type StaticProjectLogoProps = {
  logoKey: ProjectLogoKey;
};

export function StaticProjectLogo({ logoKey }: StaticProjectLogoProps) {
  const Logo = projectLogos[logoKey];

  if (logoKey === "atlas") {
    return (
      <LogoFrame className={ATLAS_LOGO_FRAME_CLASS}>
        <Logo className={ATLAS_LOGO_MEDIA_CLASS} aria-hidden />
      </LogoFrame>
    );
  }

  return (
    <LogoFrame>
      <Logo className={LOGO_MEDIA_CLASS} aria-hidden />
    </LogoFrame>
  );
}

const CAROUSEL_INTERVAL_MS = 5500;
const CAROUSEL_FADE_S = 0.45;

type AnimatedLogoCarouselProps = {
  carouselKey: ProjectLogoCarouselKey;
};

export function AnimatedLogoCarousel({
  carouselKey,
}: AnimatedLogoCarouselProps) {
  const logos = projectLogoCarousels[carouselKey];
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || logos.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % logos.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, logos.length]);

  const ActiveLogo: ProjectLogoComponent = logos[index] ?? logos[0];
  const isBoardGames = carouselKey === "boardGames";
  const frameClass = isBoardGames
    ? BOARD_GAMES_LOGO_FRAME_CLASS
    : LOGO_FRAME_CLASS;
  const mediaClass = isBoardGames
    ? BOARD_GAMES_LOGO_MEDIA_CLASS
    : LOGO_MEDIA_CLASS;

  return (
    <LogoFrame className={frameClass}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: CAROUSEL_FADE_S, ease: "easeInOut" }}
          className={
            isBoardGames
              ? "flex h-full w-full items-center justify-center"
              : "w-full"
          }
        >
          <ActiveLogo className={mediaClass} aria-hidden />
        </motion.div>
      </AnimatePresence>
    </LogoFrame>
  );
}
