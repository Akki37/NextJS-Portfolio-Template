import { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "@/components/project/Hero";
import About from "@/components/project/About";
import Architecture from "@/components/project/Architecture";
import Features from "@/components/project/Features";
import EngineeringChallenges from "@/components/project/EngineeringChallenges";
import TechStack from "@/components/project/TechStack";
import ProjectStats from "@/components/project/ProjectStats";
import Roadmap from "@/components/project/Roadmap";
import { getProject } from "@/lib/project";
import { projects as portfolioProjects } from "@/data/projects";

// import type { Project } from '@/lib/project/types';
import ProjectsCarousel from "@/components/ProjectsCarousel";
import ContactSection from "@/components/ContactSection";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isConfidentialSlug(slug: string) {
  return portfolioProjects.some(
    (project) => project.slug === slug && project.confidential,
  );
}

// might need to remove later - cursor
// export async function generateStaticParams() {
//   return getProjects().map(({ slug }: Project) => ({
//     slug,
//   }));
// }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isConfidentialSlug(slug)) {
    return {
      title: "Project Not Found",
    };
  }

  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Vikas Goswami`,
    description: project.description,

    openGraph: {
      title: project.title,
      description: project.description,
      images: project.coverImage
        ? [
            {
              url: project.coverImage,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.coverImage
        ? [project.coverImage]
        : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps) {
  const { slug } = await params;

  if (isConfidentialSlug(slug)) {
    notFound();
  }

  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Hero project={project} />

      <About project={project} />

      <Architecture project={project} />

      <Features project={project} />

      <EngineeringChallenges project={project} />

      <TechStack project={project} />

      <ProjectStats project={project} />

      <Roadmap project={project} />

      <ProjectsCarousel projectSlug={project.slug} />

      <ContactSection/>
    </main>
  );
}
