import { Project } from "@/lib/project/types";
import StepItem from "../StepItems";
import StickySection from "@/components/StickySection";
import ProjectSectionHeader from "@/components/ProjectSectionHeader";

type RoadmapProps = {
  project: Project;
};

export default function Roadmap({ project }: RoadmapProps) {
  // Destructure based on your new object properties: 'header' and 'milestones'
  const { header, milestones } = project.roadmap;

  return (
    <StickySection id="roadmap" badgeLabel={header.badge}>
      <ProjectSectionHeader title={header.title} description={header.description} />

      {/* Reusing your StepItem Component over the milestones array */}
      <div className="space-y-0">
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1;

          return (
            <StepItem
              key={milestone.title}
              index={index}
              title={milestone.title}
              description={milestone.description}
              isLast={isLast}
            >
              <div className="mt-4 space-y-3">
                {/* Milestone Status Pill */}
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono tracking-wide ${
                      milestone.completed
                        ? "dark:bg-emerald-500/10 dark:text-emerald-400/90 dark:border-emerald-500/20 light:bg-emerald-500/15 light:text-emerald-700 light:border-emerald-500/30 border"
                        : "dark:bg-neutral-900 dark:text-neutral-500 dark:border-white/5 light:bg-neutral-200 light:text-neutral-600 light:border-black/10 border"
                    }`}
                  >
                    {milestone.completed ? "✓ Milestone Done" : "○ Milestone Planned"}
                  </span>
                </div>

                {/* Nested Sub-tasks (Items Array Rendering) */}
                {milestone.items && milestone.items.length > 0 && (
                  <ul className="flex flex-wrap gap-2 pt-1" aria-label={`Tasks for ${milestone.title}`}>
                    {milestone.items.map((task) => (
                      <li
                        key={task.title}
                        className={`rounded-md px-2 py-0.5 font-mono text-[11px] border ${
                          task.completed
                            ? "dark:border-emerald-500/10 dark:bg-emerald-950/10 dark:text-emerald-500/70 light:border-emerald-500/30 light:bg-emerald-500/10 light:text-emerald-700"
                            : "dark:border-white/5 dark:bg-neutral-900/40 dark:text-neutral-500 light:border-black/5 light:bg-neutral-200/60 light:text-neutral-600"
                        }`}
                      >
                        {task.completed ? "✓ " : "○ "}
                        {task.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </StepItem>
          );
        })}
      </div>
    </StickySection>
  );
}
