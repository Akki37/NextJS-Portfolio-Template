import { Project } from "@/lib/project/types";
import StickySection from "@/components/StickySection";
import ProjectSectionHeader from "@/components/ProjectSectionHeader";

type ProjectStatsProps = {
  project: Project;
};

export default function ProjectStats({ project }: ProjectStatsProps) {
  const { header, items } = project.stats;

  return (
    <StickySection id="stats" badgeLabel={header.badge} contentClassName="max-w-4xl w-full">
      <ProjectSectionHeader title={header.title} description={header.description} />

      {/* Metrics Dashboard Grid */}
      {/* Changed from 'grid' to an adaptive 'flex wrap' layout */}
      <div className="flex flex-wrap gap-4 w-full">
        {items.map((stat) => (
          <article
            key={stat.label}
            // 'flex-auto min-w-[140px]' lets shorter text stay compact, while longer text grows the card smoothly
            className="group flex flex-col gap-1 p-6 flex-auto min-w-[140px] max-w-full rounded-2xl border dark:border-white/5 dark:bg-neutral-950/40 light:border-black/10 light:bg-neutral-100/60 backdrop-blur-sm transition-all duration-300 dark:hover:border-neutral-500/20 dark:hover:bg-neutral-900/10 light:hover:border-black/20 light:hover:bg-neutral-200/50"
          >
            {/* Huge Numeric Output Display */}
            {/* Added 'whitespace-nowrap' so metrics like numbers/percentages never break to a new line awkwardly */}
            <h3 className="font-mono text-3xl font-semibold tracking-tight dark:text-white light:text-black md:text-4xl transition-colors duration-300 group-hover:text-indigo-500 whitespace-nowrap">
              {stat.value}
            </h3>
            
            {/* Explanatory Metric Label */}
            {/* Removed 'uppercase' if it was artificially inflating word length, or kept safe with a fluid wrap */}
            <p className="text-xs uppercase tracking-wider dark:text-neutral-500 light:text-neutral-600 transition-colors duration-300 dark:group-hover:text-neutral-400 light:group-hover:text-neutral-800 leading-normal">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </StickySection>
  );
}
