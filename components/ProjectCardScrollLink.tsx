"use client";

import type { MouseEvent, ReactNode } from "react";
import {
  PROJECT_CARD_ID_PREFIX,
  scrollToProjectCard,
} from "@/util/scrollToProjectCard";

type ProjectCardScrollLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function ProjectCardScrollLink({
  href,
  className,
  children,
}: ProjectCardScrollLinkProps) {
  const slug = href.startsWith(`#${PROJECT_CARD_ID_PREFIX}`)
    ? href.slice(`#${PROJECT_CARD_ID_PREFIX}`.length)
    : href.replace(/^#/, "");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToProjectCard(slug);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
