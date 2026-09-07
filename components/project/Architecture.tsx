import { Project } from "@/lib/project/types";
import StepItem from "../StepItems";
import StickySection from "@/components/StickySection";
import ProjectSectionHeader from "@/components/ProjectSectionHeader";

type ArchitectureProps = {
  project: Project;
};

export default function Architecture({ project }: ArchitectureProps) {
  return (
    <StickySection id="architecture" badgeLabel="Architecture">
      <ProjectSectionHeader
        title="How It Works"
        description={`${project.title} follows a layered architecture where every stage transforms the previous one into the next, allowing runtime execution to be simulated and visualized step-by-step.`}
      />

      {/* Stepper Timeline List */}
      <div className="space-y-0">
        {project.architecture.map((step, index) => {
          const isLast = index === project.architecture.length - 1;
          return (
            <StepItem
              key={step.title}
              index={index}
              title={step.title}
              description={step.description}
              isLast={isLast}
            />
          );
        })}
      </div>
    </StickySection>
  );
}
