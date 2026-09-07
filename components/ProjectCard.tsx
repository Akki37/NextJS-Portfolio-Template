"use client";

import type { Project, ProjectAccent } from "@/data/projects";
import { resolveCardProject } from "@/data/projectMocks";
import { getStrings } from "@/strings";
import {
  AnimatedLogoCarousel,
  StaticProjectLogo,
} from "./ProjectCardLogo";
import { useToast } from "./ToastProvider";

type ProjectCardProps = {
  project: Project;
};

const { projectCard: cardStrings } = getStrings();

const accentSurfaces: Record<
  ProjectAccent,
  { panel: string; mesh: string; deco?: string }
> = {
  blue: {
    panel:
      "bg-gradient-to-br from-sky-400/90 via-blue-700/90 to-zinc-950 ring-1 ring-white/10",
    mesh: "bg-[radial-gradient(ellipse_80%_50%_at_70%_20%,rgba(255,255,255,0.25),transparent_55%)]",
  },
  ember: {
    panel:
      "bg-gradient-to-br from-amber-400/85 via-orange-700/90 to-zinc-950 ring-1 ring-white/10",
    mesh: "bg-[linear-gradient(105deg,rgba(0,0,0,0.2)_0%,transparent_40%),repeating-linear-gradient(0deg,transparent,transparent_11px,rgba(255,255,255,0.04)_11px,rgba(255,255,255,0.04)_12px)]",
  },
  lilac: {
    panel:
      "bg-gradient-to-br from-[#E8DEF6]/30 via-[#B795E7]/55 to-zinc-950 ring-1 ring-[#DCD3F0]/25",
    mesh: "bg-[radial-gradient(ellipse_75%_55%_at_20%_12%,rgba(232,222,246,0.4),transparent_52%),radial-gradient(circle_at_85%_25%,rgba(183,149,231,0.28),transparent_48%)]",
  },
  slate: {
    panel:
      "bg-gradient-to-br from-zinc-500/40 via-zinc-800 to-black ring-1 ring-white/10",
    mesh: "",
    deco: "glass",
  },
  violet: {
    panel:
      "bg-gradient-to-br from-violet-500/85 via-indigo-800/95 to-zinc-950 ring-1 ring-white/10",
    mesh: "bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.12),transparent_50%)]",
  },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const locked = Boolean(project.confidential);
  // Mock bait under the blur when locked; real project when confidential is false.
  const display = resolveCardProject(project);
  const s = accentSurfaces[display.accent];
  const { showToast } = useToast();

  const handleSelfLinkClick = () => {
    showToast(
      cardStrings.selfLinkToast.title,
      cardStrings.selfLinkToast.dismissLabel,
    );
  };

  const card = (
    <article className="group relative w-[min(78vw,300px)] shrink-0 overflow-hidden rounded-2xl border dark:border-white/10 light:border-black/10 dark:shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] light:shadow-none transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 dark:hover:border-white/20 light:hover:border-black/25 sm:w-[min(72vw,320px)] md:w-[340px]">
      <div className={`relative aspect-[4/5] overflow-hidden ${s.panel}`}>
        {display.logoCarousel ? (
          <AnimatedLogoCarousel carouselKey={display.logoCarousel} />
        ) : display.logo ? (
          <StaticProjectLogo logoKey={display.logo} />
        ) : null}

        {s.mesh ? <div className={`absolute inset-0 ${s.mesh}`} /> : null}

        {s.deco === "glass" ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="flex w-full max-w-[220px] flex-col gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left dark:shadow-lg light:shadow-sm backdrop-blur-md">
                <p className="text-[12px] font-medium uppercase tracking-widest text-white/70">
                  {cardStrings.featured}
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {display.title}
                  {display.tag ? (
                    <span className="ml-1 text-sm italic text-gray-700">
                      {display.tag}
                    </span>
                  ) : null}
                </p>
              </div>
              <div className="ml-6 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-left backdrop-blur-md">
                <p className="text-[12px] uppercase tracking-widest text-white/50">
                  {cardStrings.stack}
                </p>
                <p className="mt-1 text-xs text-white/90">
                  {display.tech.slice(0, 2).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-40 transition-opacity duration-500 group-hover:opacity-70">
            <div className="h-16 w-full rounded-sm border border-white/20 bg-gradient-to-t from-white/10 to-transparent" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
          <h3 className="text-lg font-medium tracking-tight text-white">
            {display.title}
          </h3>
          {display.tag ? (
            <span className="ml-1 text-sm italic text-gray-300">{display.tag}</span>
          ) : null}
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-300 md:text-sm">
            {display.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {display.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[11px] uppercase tracking-wider text-neutral-300 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {locked ? (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center dark:bg-black/55 light:bg-slate-950/70 px-6 backdrop-blur-md"
            role="status"
          >
            <p className="text-center text-sm font-medium tracking-wide text-white/90 sm:text-base">
              <span className="block text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {project.title}
              </span>
              <span className="mt-2 block uppercase tracking-[0.2em] text-white/70">
                {cardStrings.confidential.title}
              </span>
              <span className="mt-2 block text-base text-white sm:text-lg">
                {cardStrings.confidential.subtitle}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );

  if (locked) {
    return (
      <div
        className="block shrink-0 cursor-default"
        aria-label={`${project.title}: ${cardStrings.confidential.title}`}
      >
        {card}
      </div>
    );
  }

  if (display.selfLink) {
    return (
      <button
        type="button"
        onClick={handleSelfLinkClick}
        className="block shrink-0 cursor-pointer border-0 bg-transparent p-0 text-left"
      >
        {card}
      </button>
    );
  }

  if (display.route || display.href) {
    return (
      <a
        href={display.route || display.href}
        // target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        className="block shrink-0"
      >
        {card}
      </a>
    );
  }

  return card;
}
