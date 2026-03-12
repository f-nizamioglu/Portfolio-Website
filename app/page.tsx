import Hero from "@/components/Hero";
import SkillsScanner from "@/components/SkillsScanner";
import WebProjects from "@/components/WebProjects";
import ProjectTerminal from "@/components/ProjectTerminal";
import ContactConsole from "@/components/ContactConsole";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <Hero />
      <SkillsScanner />
      <WebProjects />
      <ProjectTerminal />
      <ContactConsole />
    </main>
  );
}
