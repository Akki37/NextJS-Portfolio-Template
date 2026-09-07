import { experience, type ExperienceEntry } from "@/data/experience";
import { getStrings } from "@/strings";
import StickySection from "@/components/StickySection";
import ProjectCardScrollLink from "@/components/ProjectCardScrollLink";

function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((highlight) => (
        <li
          key={highlight}
          className="flex gap-3 text-sm leading-relaxed dark:text-neutral-500 light:text-neutral-600"
        >
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full dark:bg-neutral-600 light:bg-neutral-400"
            aria-hidden
          />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  );
}

function CompanyLabel({
  entry,
  className,
}: {
  entry: ExperienceEntry;
  className: string;
}) {
  if (!entry.companyHref) {
    return <span className={className}>{entry.company}</span>;
  }

  const linkClassName = `${className} inline-flex items-center gap-1.5 transition-colors duration-200 dark:hover:text-white light:hover:text-black`;

  if (entry.companyHref.startsWith("#")) {
    return (
      <ProjectCardScrollLink href={entry.companyHref} className={linkClassName}>
        <span>{entry.company}</span>
        <span
          className="text-xs dark:text-neutral-600 light:text-neutral-500"
          aria-hidden
        >
          ↗
        </span>
      </ProjectCardScrollLink>
    );
  }

  return (
    <a
      href={entry.companyHref}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      <span>{entry.company}</span>
      <span
        className="text-xs dark:text-neutral-600 light:text-neutral-500"
        aria-hidden
      >
        ↗
      </span>
    </a>
  );
}

export default function ExperienceSection() {
  const { experience: s } = getStrings();

  return (
    <StickySection id="experience" badgeLabel={s.sectionLabel}>
      <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
        {s.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed dark:text-neutral-500 light:text-neutral-600 md:text-base">
        {s.description}
      </p>

      <ol className="mt-12 space-y-12 border-t dark:border-white/5 light:border-black/5 pt-10">
        {experience.map((entry) => (
          <li key={`${entry.company}-${entry.period}`} className="relative">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                {entry.leadWithCompany ? (
                  <>
                    <h3 className="text-base font-medium dark:text-neutral-100 light:text-neutral-900 md:text-lg">
                      <CompanyLabel entry={entry} className="" />
                    </h3>
                    <p className="mt-1 text-sm dark:text-neutral-400 light:text-neutral-700">
                      {entry.role}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-base font-medium dark:text-neutral-100 light:text-neutral-900 md:text-lg">
                      {entry.role}
                    </h3>
                    <p className="mt-1 text-sm dark:text-neutral-400 light:text-neutral-700">
                      <CompanyLabel entry={entry} className="" />
                    </p>
                  </>
                )}
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="text-[13px] uppercase tracking-[0.14em] dark:text-neutral-500 light:text-neutral-600">
                  {entry.period}
                </p>
                <p className="mt-1 text-xs dark:text-neutral-600 light:text-neutral-500">
                  {entry.location}
                </p>
              </div>
            </div>

            {entry.highlights && entry.highlights.length > 0 && (
              <HighlightList items={entry.highlights} />
            )}

            {entry.engagements && entry.engagements.length > 0 && (
              <div className="mt-6 space-y-8 border-l dark:border-white/10 light:border-black/10 pl-5 md:pl-6">
                {entry.engagements.map((engagement) => (
                  <div key={`${engagement.company}-${engagement.period}`}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <div>
                        <h4 className="text-sm font-medium dark:text-neutral-200 light:text-neutral-800 md:text-base">
                          {engagement.company}
                          <span className="font-normal dark:text-neutral-400 light:text-neutral-600">
                            {" "}
                            — {engagement.role}
                          </span>
                        </h4>
                        {engagement.context && (
                          <p className="mt-1 text-xs dark:text-neutral-500 light:text-neutral-600">
                            {engagement.context}
                          </p>
                        )}
                      </div>
                      <p className="shrink-0 text-[12px] uppercase tracking-[0.14em] dark:text-neutral-500 light:text-neutral-600 sm:text-right">
                        {engagement.period}
                      </p>
                    </div>
                    <HighlightList items={engagement.highlights} />
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </StickySection>
  );
}
