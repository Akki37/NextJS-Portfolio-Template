import { Project } from "@/lib/project/types";
import StepItem from "../StepItems";
import StickySection from "@/components/StickySection";
import ProjectSectionHeader from "@/components/ProjectSectionHeader";

type FeaturesProps = {
  project: Project;
};

export default function Features({ project }: FeaturesProps) {
  return (
    <StickySection id="features" badgeLabel={project.features.header.badge}>
      <ProjectSectionHeader
        title={project.features.header.title}
        description={project.features.header.description}
      />
      {project.features.items.map((item, index) => {
        const isLast = index === project.features.items.length - 1;
        return (
          <StepItem
            key={item.title}
            index={index}
            title={item.title}
            description={item.description}
            isLast={isLast}
          />
        );
      })}
    </StickySection>
  );
}