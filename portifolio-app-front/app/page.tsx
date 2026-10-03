import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ExperienceSection } from "./_components/ExperienceSection";
import { HeroSection } from "./_components/HeroSection";
// import { ProjectsSection } from "./_components/ProjectsSection";
import { SkillsSection } from "./_components/SkillsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        {/* <ProjectsSection /> */}
      </main>
      <Footer />
    </div>
  );
}
