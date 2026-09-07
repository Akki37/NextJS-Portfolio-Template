import { skillGroups } from "@/data/skills";
import { getStrings } from "@/strings";
import StickySection from "@/components/StickySection";

export default function AboutSection() {
  const { about: s } = getStrings();
  const stats = [s.stats.experience, s.stats.stack, s.stats.focus];

  return (
    <StickySection
      id="about"
      badgeLabel={s.sectionLabel}
      contentClassName="max-w-2xl w-full space-y-6"
    >
      <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
        {s.title}
      </h2>
      <p className="text-sm leading-relaxed dark:text-neutral-400 light:text-neutral-700 md:text-base">
        {s.paragraph1}
      </p>
      <p className="text-sm leading-relaxed dark:text-neutral-500 light:text-neutral-600 md:text-base">
        {s.paragraph2}
      </p>

      {/* Stats Metrics Layer */}
      <dl className="grid gap-8 border-t dark:border-white/5 light:border-black/5 pt-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-[12px] uppercase tracking-[0.2em] dark:text-neutral-500 light:text-neutral-600">
              {stat.label}
            </dt>
            <dd className="mt-2 text-sm dark:text-neutral-200 light:text-neutral-800 md:text-base">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Core Skills Chip Layer */}
      <div className="border-t dark:border-white/5 light:border-black/5 pt-10">
        <h3 className="text-[12px] uppercase tracking-[0.2em] dark:text-neutral-500 light:text-neutral-600">
          {s.skillsLabel}
        </h3>
        <div className="mt-6 space-y-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[12px] uppercase tracking-[0.16em] dark:text-neutral-600 light:text-neutral-500">
                {group.label}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border dark:border-white/5 dark:bg-white/[0.03] dark:text-neutral-400 dark:hover:border-white/20 dark:hover:text-neutral-200 light:border-black/10 light:bg-black/[0.03] light:text-neutral-700 light:hover:border-black/25 light:hover:text-black px-3 py-1 text-xs transition-colors duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </StickySection>
  );
}
