import type { ReactNode } from "react";
import Container from "@components/Container";

type StickySectionProps = {
  id: string;
  badgeLabel: string;
  children: ReactNode;
  contentClassName?: string;
  className?: string;
};

export default function StickySection({
  id,
  badgeLabel,
  children,
  contentClassName = "max-w-2xl w-full",
  className = "",
}: StickySectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t dark:border-white/5 light:border-black/5 py-24 md:scroll-mt-28 md:py-32 transition-colors duration-300 ${className}`}
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-16 lg:gap-24 relative items-start">
          {/* Sticky Side Badge Column */}
          <div className="md:sticky md:top-32 md:h-fit shrink-0">
            <p className="origin-left text-[12px] font-medium uppercase tracking-[0.35em] dark:text-neutral-500 light:text-neutral-600 md:[writing-mode:vertical-rl] md:rotate-180">
              {badgeLabel}
            </p>
          </div>

          {/* Core Content Flow Column */}
          <div className={contentClassName}>{children}</div>
        </div>
      </Container>
    </section>
  );
}
