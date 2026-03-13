import Hero from "@/components/Hero";
import SkillsScanner from "@/components/SkillsScanner";
import FullStackEngineering from "@/components/FullStackEngineering";
import ProjectTerminal from "@/components/ProjectTerminal";
import ContactConsole from "@/components/ContactConsole";
import Link from "next/link";

export default function ConsolePage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="fixed top-20 right-6 z-50">
        <Link
          href="/"
          className="font-mono text-xs sm:text-sm text-gray-400 border border-white/10 bg-black/30 px-3 py-1.5 rounded-md transition-colors duration-200 hover:text-emerald-300 hover:border-emerald-400/40"
        >
          [ cd .. ]
        </Link>
      </div>
      <Hero />
      <SkillsScanner />
      <FullStackEngineering />
      <ProjectTerminal />
      <ContactConsole />
    </main>
  );
}
