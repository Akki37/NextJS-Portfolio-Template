"use client";

import { getCarouselProjects } from "@/data/projects";
import { getStrings } from "@/strings";
import { projectCardId, PROJECT_CARD_ID_PREFIX, scrollToProjectCard } from "@/util/scrollToProjectCard";
import Container from "./Container";
import ProjectCard from "./ProjectCard";
import { useCallback, useEffect, useRef, useState } from "react";

const { projectsSection: s } = getStrings();
const projects = getCarouselProjects();

/** Movement before a gesture counts as drag (not click). */
const DRAG_THRESHOLD_PX = 10;
/** Pointer travel → scroll distance (drag-scroll-carousel-style multiplier). */
const DRAG_SPEED = 1.38;
/** Velocity decay per ~16ms frame after release. */
const MOMENTUM_DECAY = 0.94;
/** Stop inertia below this px/frame. */
const MIN_VELOCITY = 0.35;
/** Max throw speed px/frame. */
const MAX_VELOCITY = 42;

type DragState = {
  pointerId: number | null;
  startX: number;
  startScrollLeft: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  hasDragged: boolean;
};

export default function ProjectsCarousel({ projectSlug }: { projectSlug?: string | undefined }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    hasDragged: false,
  });
  const suppressClickRef = useRef(false);
  const momentumRafRef = useRef(0);
  const cardScaleRafRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isGliding, setIsGliding] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const stopMomentum = useCallback(() => {
    cancelAnimationFrame(momentumRafRef.current);
    momentumRafRef.current = 0;
    setIsGliding(false);
  }, []);

  const getScrollBounds = useCallback((el: HTMLDivElement) => {
    return Math.max(0, el.scrollWidth - el.clientWidth);
  }, []);

  const clampScroll = useCallback((el: HTMLDivElement, value: number) => {
    const max = getScrollBounds(el);
    return Math.max(0, Math.min(value, max));
  }, [getScrollBounds]);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft } = el;
    const max = getScrollBounds(el);
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < max - 4);
  }, [getScrollBounds]);

  const updateCardScales = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;

    for (const child of el.children) {
      if (!(child instanceof HTMLElement)) continue;
      const cardCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - cardCenter);
      const t = Math.min(distance / (el.clientWidth * 0.72), 1);
      const scale = 1 - t * 0.045;
      const opacity = 1 - t * 0.14;
      child.style.setProperty("--carousel-scale", scale.toFixed(3));
      child.style.setProperty("--carousel-opacity", opacity.toFixed(3));
    }
  }, []);

  const scheduleCardScaleUpdate = useCallback(() => {
    cancelAnimationFrame(cardScaleRafRef.current);
    cardScaleRafRef.current = requestAnimationFrame(updateCardScales);
  }, [updateCardScales]);

  const snapToNearest = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = getScrollBounds(el);
    if (max <= 0) return;

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    let nearestLeft = el.scrollLeft;
    let nearestDistance = Infinity;

    for (const child of el.children) {
      if (!(child instanceof HTMLElement)) continue;
      const cardCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - cardCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLeft = clampScroll(
          el,
          child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
        );
      }
    }

    el.scrollTo({ left: nearestLeft, behavior: "smooth" });
  }, [clampScroll, getScrollBounds]);

  const runMomentum = useCallback(
    (initialVelocity: number) => {
      stopMomentum();

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion || Math.abs(initialVelocity) < MIN_VELOCITY) {
        snapToNearest();
        return;
      }

      setIsGliding(true);
      let velocity = Math.max(
        -MAX_VELOCITY,
        Math.min(MAX_VELOCITY, initialVelocity),
      );
      let lastTime = performance.now();

      const step = (time: number) => {
        const el = scrollerRef.current;
        if (!el) {
          stopMomentum();
          return;
        }

        const dt = Math.min((time - lastTime) / 16.67, 2.5);
        lastTime = time;

        const max = getScrollBounds(el);
        const next = el.scrollLeft + velocity * dt;

        if (next <= 0 || next >= max) {
          el.scrollLeft = clampScroll(el, next);
          stopMomentum();
          snapToNearest();
          scheduleCardScaleUpdate();
          updateArrows();
          return;
        }

        el.scrollLeft = next;
        velocity *= MOMENTUM_DECAY ** dt;
        scheduleCardScaleUpdate();
        updateArrows();

        if (Math.abs(velocity) < MIN_VELOCITY) {
          stopMomentum();
          snapToNearest();
          return;
        }

        momentumRafRef.current = requestAnimationFrame(step);
      };

      momentumRafRef.current = requestAnimationFrame(step);
    },
    [
      clampScroll,
      getScrollBounds,
      scheduleCardScaleUpdate,
      snapToNearest,
      stopMomentum,
      updateArrows,
    ],
  );

  useEffect(() => {
    updateArrows();
    updateCardScales();

    const el = scrollerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      updateArrows();
      updateCardScales();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      stopMomentum();
      cancelAnimationFrame(cardScaleRafRef.current);
    };
  }, [stopMomentum, updateArrows, updateCardScales]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash.startsWith(PROJECT_CARD_ID_PREFIX)) return;

    const slug = hash.slice(PROJECT_CARD_ID_PREFIX.length);
    const frame = window.requestAnimationFrame(() => {
      scrollToProjectCard(slug);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const scrollByCards = (direction: -1 | 1) => {
    stopMomentum();
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector("article");
    const step =
      (first instanceof HTMLElement ? first.offsetWidth : 340) + 16;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    stopMomentum();
    suppressClickRef.current = false;

    const el = scrollerRef.current;
    if (!el) return;

    const now = performance.now();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      lastX: event.clientX,
      lastTime: now,
      velocity: 0,
      hasDragged: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    const drag = dragRef.current;
    if (!el || drag.pointerId !== event.pointerId) return;

    const deltaFromStart = event.clientX - drag.startX;

    if (!drag.hasDragged) {
      if (Math.abs(deltaFromStart) <= DRAG_THRESHOLD_PX) return;

      drag.hasDragged = true;
      setIsDragging(true);
      el.setPointerCapture(event.pointerId);
    }

    event.preventDefault();

    const now = performance.now();
    const dt = Math.max(now - drag.lastTime, 1);
    const instantVelocity = ((drag.lastX - event.clientX) / dt) * 16.67;
    drag.velocity = drag.velocity * 0.55 + instantVelocity * 0.45;
    drag.lastX = event.clientX;
    drag.lastTime = now;

    el.scrollLeft = clampScroll(
      el,
      drag.startScrollLeft - deltaFromStart * DRAG_SPEED,
    );
    scheduleCardScaleUpdate();
    updateArrows();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    const drag = dragRef.current;
    if (!el || drag.pointerId !== event.pointerId) return;

    if (drag.hasDragged && el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }

    const didDrag = drag.hasDragged;
    const releaseVelocity = drag.velocity;

    drag.pointerId = null;
    drag.hasDragged = false;
    setIsDragging(false);

    if (didDrag) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 300);
      runMomentum(releaseVelocity);
    }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const handleScroll = () => {
    updateArrows();
    scheduleCardScaleUpdate();
  };

  const isActive = isDragging || isGliding;
  let newProjects = projects;
  if (projectSlug) {
    newProjects = projects.filter(({ slug = '' }: { slug: string }) => projectSlug !== slug);
  }
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t dark:border-white/5 light:border-black/5 py-24 md:scroll-mt-28 md:py-32 transition-colors duration-300"
    >
      <Container>
        <div className="mb-12 flex flex-col gap-10 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex gap-10 md:gap-16">
            <p className="shrink-0 origin-left text-[12px] font-medium uppercase tracking-[0.35em] dark:text-neutral-500 light:text-neutral-600 md:[writing-mode:vertical-rl] md:rotate-180">
              {s.sectionLabel}
            </p>
            <div>
              <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
                {s.title}
              </h2>
              <p className="mt-3 max-w-md text-sm dark:text-neutral-500 light:text-neutral-600">
                {s.description}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative">
        <div
          ref={scrollerRef}
          data-dragging={isActive ? "true" : "false"}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleClickCapture}
          data-projects-carousel
          className={`projects-carousel-track flex gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2 pt-1 [scrollbar-width:none] [touch-action:pan-y] md:gap-5 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing select-none" : isGliding ? "cursor-grab" : "cursor-grab"}`}
          style={{ scrollSnapType: isActive ? "none" : "x mandatory" }}
        >
          {newProjects.map((project) => (
            <div
              key={project.slug}
              id={projectCardId(project.slug)}
              className="projects-carousel-slide shrink-0 snap-center"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div
          className={`pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r dark:from-black dark:to-black/0 light:from-white light:to-white/0 transition-[width,opacity] duration-300 ease-out ${isActive ? "w-24 opacity-100 md:w-32" : "w-16 opacity-80 md:w-24"}`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l dark:from-black dark:to-black/0 light:from-white light:to-white/0 transition-[width,opacity] duration-300 ease-out ${isActive ? "w-24 opacity-100 md:w-32" : "w-16 opacity-80 md:w-24"}`}
        />
      </div>

      <Container>
        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="flex gap-3">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => scrollByCards(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-white/20 dark:hover:bg-white/10 light:border-black/10 light:bg-black/5 light:text-neutral-700 light:hover:border-black/20 light:hover:bg-black/10 transition disabled:pointer-events-none disabled:opacity-30"
              aria-label={s.prevAriaLabel}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => scrollByCards(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-white/20 dark:hover:bg-white/10 light:border-black/10 light:bg-black/5 light:text-neutral-700 light:hover:border-black/20 light:hover:bg-black/10 transition disabled:pointer-events-none disabled:opacity-30"
              aria-label={s.nextAriaLabel}
            >
              <ChevronRightIcon />
            </button>
          </div>
          <p className="max-w-xl text-sm leading-relaxed dark:text-neutral-400 light:text-neutral-600 md:text-right">
            {s.footer}
          </p>
        </div>
      </Container>
    </section>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
