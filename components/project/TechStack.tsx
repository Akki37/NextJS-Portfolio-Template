import { Project } from "@/lib/project/types";
import StickySection from "@/components/StickySection";
import ProjectSectionHeader from "@/components/ProjectSectionHeader";

type TechStackProps = {
  project: Project;
};

export default function TechStack({ project }: TechStackProps) {
  const { header, categories } = project.techStack;

  return (
    <StickySection id="tech-stack" badgeLabel={header.badge} contentClassName="max-w-4xl w-full">
      <ProjectSectionHeader title={header.title} description={header.description} />

      {/* Tech Categories Grid Matrix */}
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category.category}
            className="group flex flex-col justify-between p-6 rounded-2xl border dark:border-white/5 dark:bg-neutral-950/40 light:border-black/10 light:bg-neutral-100/60 backdrop-blur-sm transition-all duration-300 dark:hover:border-white/10 dark:hover:bg-neutral-900/20 light:hover:border-black/20 light:hover:bg-neutral-200/50"
          >
            <div className="space-y-2 mb-6">
              <h3 className="text-base font-medium dark:text-neutral-200 dark:group-hover:text-white light:text-neutral-800 light:group-hover:text-black transition-colors duration-300">
                {category.category}
              </h3>
              {category.description && (
                <p className="text-sm leading-relaxed dark:text-neutral-500 dark:group-hover:text-neutral-400 light:text-neutral-600 light:group-hover:text-neutral-800 transition-colors duration-300">
                  {category.description}
                </p>
              )}
            </div>

            {/* Sub-Technology Inline Badges */}
            <div className="flex flex-wrap gap-2">
              {category.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border dark:border-white/[0.04] dark:bg-white/[0.02] dark:text-neutral-400 dark:hover:border-white/20 dark:hover:text-neutral-200 light:border-black/10 light:bg-black/[0.03] light:text-neutral-700 light:hover:border-black/25 light:hover:text-black px-2.5 py-1 font-mono text-xs transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </StickySection>
  );
}
