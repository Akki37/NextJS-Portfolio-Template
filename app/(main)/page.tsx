import AboutSection from "@/components/(main)/AboutSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/(main)/EducationSection";
import ExperienceSection from "@/components/(main)/ExperienceSection";
import Hero from "@/components/(main)/Hero";
import ProjectsCarousel from "@/components/ProjectsCarousel";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsCarousel />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
