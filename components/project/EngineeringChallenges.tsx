import { Project, ProjectEngineeringChallenge } from "@/lib/project/types";
import StepItem from "../StepItems";
import StickySection from "@/components/StickySection";
import ProjectSectionHeader from "@/components/ProjectSectionHeader";

type EngineeringChallengesProps = {
  project: Project;
};

export default function EngineeringChallenges({ project }: EngineeringChallengesProps) {
  const { engineeringChallenges }: { engineeringChallenges: ProjectEngineeringChallenge } = project;
  const { header, challenges } = engineeringChallenges;

  return (
    <StickySection id="engineering-challenges" badgeLabel={header.badge}>
      <ProjectSectionHeader title={header.title} description={header.description} />

      {/* Stepper Timeline List */}
      <div className="space-y-0">
        {challenges.map((challenge, index) => {
          const isLast = index === challenges.length - 1;
          return (
            <StepItem
              key={challenge.title}
              index={index}
              title={challenge.title}
              description={challenge.description}
              isLast={isLast}
            />
          );
        })}
      </div>
    </StickySection>
  );
}
