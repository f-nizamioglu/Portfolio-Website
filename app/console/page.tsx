import Hero from "@/components/Hero";
import SkillsScanner from "@/components/SkillsScanner";
import FullStackEngineering from "@/components/FullStackEngineering";
import ProjectTerminal from "@/components/ProjectTerminal";
import ContactConsole from "@/components/ContactConsole";

export default function ConsolePage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <Hero />
      <SkillsScanner />
      <FullStackEngineering />
      <ProjectTerminal />
      <ContactConsole />
    </main>
  );
}
