import { certificates, education } from "@/data/education";
import { getStrings } from "@/strings";
import StickySection from "@/components/StickySection";
import ListRowItem from "@/components/ListRowItem";

export default function EducationSection() {
  const { education: s } = getStrings();

  return (
    <StickySection id="education" badgeLabel={s.sectionLabel}>
      {/* Header Block */}
      <div className="space-y-3">
        <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
          {s.title}
        </h2>
        <p className="text-sm leading-relaxed dark:text-neutral-500 light:text-neutral-600 md:text-base">
          {s.description}
        </p>
      </div>

      {/* Formal Timeline Directory */}
      <ul className="mt-12 divide-y dark:divide-white/5 light:divide-black/5 border-y dark:border-white/5 light:border-black/5">
        {education.map((entry) => (
          <ListRowItem key={`${entry.institution}-${entry.period}`}>
            {/* Primary Degree Track */}
            <div>
              <p className="text-sm font-medium dark:text-neutral-200 light:text-neutral-800 md:text-base transition-colors duration-200 dark:group-hover:text-white light:group-hover:text-black">
                {entry.degree}
              </p>
              <p className="mt-1 text-sm dark:text-neutral-500 light:text-neutral-600 transition-colors duration-200 dark:group-hover:text-neutral-400 light:group-hover:text-neutral-700">
                {entry.institution}
              </p>
            </div>

            {/* Temporal Context Data */}
            <div className="shrink-0 sm:text-right">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] dark:text-neutral-500 light:text-neutral-600">
                {entry.period}
              </p>
              <p className="mt-1 text-xs dark:text-neutral-600 light:text-neutral-500 transition-colors duration-200 dark:group-hover:text-neutral-500 light:group-hover:text-neutral-600">
                {entry.location}
              </p>
            </div>
          </ListRowItem>
        ))}
      </ul>

      {/* Secondary Certifications Sub-Layer */}
      <div className="mt-8 pt-10">
        <h3 className="text-[12px] uppercase tracking-[0.2em] dark:text-neutral-500 light:text-neutral-600 mb-6">
          {s.certificatesLabel}
        </h3>
        <ul className="space-y-4">
          {certificates.map((cert) => (
            <li key={cert.title} className="flex items-center">
              {cert.href ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm dark:text-neutral-300 light:text-neutral-700 transition-colors duration-200 dark:hover:text-white light:hover:text-black md:text-base"
                >
                  <span className="underline underline-offset-4 decoration-white/0 dark:group-hover:decoration-white/30 light:group-hover:decoration-black/30 transition-all duration-200">
                    {cert.title}
                  </span>
                  <span className="inline-block dark:text-neutral-600 light:text-neutral-500 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-400">
                    ↗
                  </span>
                </a>
              ) : (
                <span className="text-sm dark:text-neutral-400 light:text-neutral-700 md:text-base">
                  {cert.title}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </StickySection>
  );
}
