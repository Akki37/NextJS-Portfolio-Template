"use client";

import Link from "next/link";
import { useMemo, type MouseEvent } from "react";
import { getSectionHref } from "@/util/getSectionHref";
import { generateNavItems } from "@/util/helpers";

type SiteNavProps = {
  className?: string;
  route?: string;
};

export default function SiteNav({ className = "", route = '' }: SiteNavProps) {
  const onHome = route === "/";

  const navItems = useMemo(() => generateNavItems(route, getSectionHref), [route]);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!onHome || !href.startsWith("#")) {
      return;
    }

    const target = document.getElementById(href.slice(1));
    if (!target) {
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    if (href === '#overview') {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${href}`,
      );
    } else {
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}${href}`,
    );
    }
  };

  return (
    <nav className={`${className} flex items-center`}>
      {!onHome && (
        <Link
          href="/"
          className="mr-5 pr-5 border-r dark:border-white/10 light:border-black/10 dark:text-neutral-500 dark:hover:text-neutral-300 light:text-neutral-600 light:hover:text-neutral-900 transition-colors flex items-center justify-center shrink-0"
          aria-label="Back to home"
        >
          <HomeIcon />
        </Link>
      )}
      <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {navItems.map((item) => {
          const isActive =
            item.href === "/resume"
              ? route === "/resume"
              : onHome && item.href.startsWith("#");

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                target={item.href === "/resume" ? "_blank" : undefined}
                rel={item.href === "/resume" ? "noopener noreferrer" : undefined}
                onClick={(event) => handleSectionClick(event, item.href)}
                className={`text-sm transition-colors duration-500 ${
                  isActive && item.href === "/resume"
                    ? "dark:text-neutral-200 light:text-neutral-900 font-medium"
                    : "dark:text-neutral-500 dark:hover:text-neutral-300 light:text-neutral-600 light:hover:text-neutral-900"
                }`}
                aria-current={isActive && item.href === "/resume" ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
