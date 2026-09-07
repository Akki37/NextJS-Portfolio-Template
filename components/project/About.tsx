import { Project } from "@/lib/project/types";
import Container from "../Container";

type AboutProps = {
  project: Project;
};

export default function About({ project }: AboutProps) {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t dark:border-white/5 light:border-black/5 py-24 md:scroll-mt-28 md:py-32 space-y-20 md:space-y-32 transition-colors duration-300"
    >
      <Container>
        <div className="space-y-20 md:space-y-32">
          
          {/* 1. Overview Sub-Section */}
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-16 lg:gap-24 relative items-start pb-20 md:pb-32 border-b dark:border-white/5 light:border-black/5">
            {/* Sticky Side Badge Column */}
            <div className="md:sticky md:top-32 md:h-fit shrink-0">
              <p className="origin-left text-[12px] font-medium uppercase tracking-[0.35em] dark:text-neutral-500 light:text-neutral-600 md:[writing-mode:vertical-rl] md:rotate-180">
                About
              </p>
            </div>

            {/* Content Column */}
            <div className="max-w-2xl w-full">
              <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
                What is {project.title}?
              </h2>
              <p className="mt-3 text-sm leading-relaxed dark:text-neutral-400 light:text-neutral-700 md:text-base">
                {project.tagline}
              </p>
              <ul className="mt-6 space-y-3">
                {project.overview.paragraphs.map((paragraph) => (
                  <li key={paragraph} className="flex gap-3 text-sm leading-relaxed dark:text-neutral-500 light:text-neutral-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full dark:bg-neutral-600 light:bg-neutral-400" aria-hidden />
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Motivation Sub-Section */}
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-16 lg:gap-24 relative items-start pb-20 md:pb-32 border-b dark:border-white/5 light:border-black/5">
            {/* Sticky Side Badge Column */}
            <div className="md:sticky md:top-32 md:h-fit shrink-0">
              <p className="origin-left text-[12px] font-medium uppercase tracking-[0.35em] dark:text-neutral-500 light:text-neutral-600 md:[writing-mode:vertical-rl] md:rotate-180">
                Motivation
              </p>
            </div>

            {/* Content Column */}
            <div className="max-w-2xl w-full">
              <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
                Why I Built It
              </h2>
              <p className="mt-3 text-sm leading-relaxed dark:text-neutral-400 light:text-neutral-700 md:text-base">
                {project.tagline}
              </p>
              <ul className="mt-6 space-y-3">
                {project.motivation.paragraphs.map((paragraph) => (
                  <li key={paragraph} className="flex gap-3 text-sm leading-relaxed dark:text-neutral-500 light:text-neutral-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full dark:bg-neutral-600 light:bg-neutral-400" aria-hidden />
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Comparison Sub-Section */}
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-16 lg:gap-24 relative items-start">
            {/* Sticky Side Badge Column */}
            <div className="md:sticky md:top-32 md:h-fit shrink-0">
              <p className="origin-left text-[12px] font-medium uppercase tracking-[0.35em] dark:text-neutral-500 light:text-neutral-600 md:[writing-mode:vertical-rl] md:rotate-180">
                Comparison
              </p>
            </div>

            {/* Content Column */}
            <div className="max-w-2xl w-full">
              <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
                {project.comparison.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed dark:text-neutral-400 light:text-neutral-700 md:text-base">
                {project.comparison.description}
              </p>
              
              {/* Feature Comparison Table */}
              <div className="border-t dark:border-white/5 light:border-black/5 pt-10 mt-10">
                <h3 className="text-[12px] uppercase tracking-[0.2em] dark:text-neutral-500 light:text-neutral-600 mb-6">
                  Traditional Tools v/s {project.title}
                </h3>
                <div className="w-full overflow-hidden rounded-xl border dark:border-white/5 dark:bg-neutral-950/40 light:border-black/10 light:bg-neutral-100/60 backdrop-blur-sm">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b dark:border-white/5 dark:bg-white/[0.02] light:border-black/5 light:bg-black/[0.02]">
                        <th className="p-4 font-medium dark:text-neutral-400 light:text-neutral-700 w-1/2 border-r dark:border-white/5 light:border-black/5">
                          Traditional Tools
                        </th>
                        <th className="p-4 font-semibold dark:text-neutral-200 light:text-indigo-600 w-1/2 dark:text-indigo-400">
                          {project.title}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-white/5 light:divide-black/5">
                      {project.comparison.items.map(({ traditional, project: ourProject }, index) => (
                        <tr 
                          key={`comparison-${project.slug}-${index}`} 
                          className="dark:hover:bg-white/[0.01] light:hover:bg-black/[0.02] transition-colors duration-150"
                        >
                          <td className="p-4 leading-relaxed dark:text-neutral-500 light:text-neutral-600 border-r dark:border-white/5 light:border-black/5 vertical-align-top">
                            {traditional}
                          </td>
                          <td className="p-4 leading-relaxed dark:text-neutral-300 light:text-neutral-800 font-medium italic">
                            {ourProject}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
