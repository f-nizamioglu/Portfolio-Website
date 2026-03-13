"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import portfolioData from "@/constants/data.json";

// ── Helpers ─────────────────────────────────────────────────────────────
/** Strip citation markers like [cite: 32] from skill strings */
const clean = (s: string): string => s.replace(/\s*\[cite:[\s\d,]*\]/gi, "");

// ── Module Configuration ────────────────────────────────────────────────
interface SkillModule {
  id: string;
  label: string;
  category: string;
  skills: string[];
  color: {
    text: string;
    border: string;
    badge: string;
    dot: string;
  };
}

const { skills } = portfolioData;

const MODULES: SkillModule[] = [
  {
    id: "web",
    label: "MODULE_01",
    category: "WEB",
    skills: skills.web.map(clean),
    color: {
      text: "text-blue-400",
      border: "border-blue-500/20",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      dot: "bg-blue-400",
    },
  },
  {
    id: "systems",
    label: "MODULE_02",
    category: "SYSTEMS & SECURITY",
    skills: [...skills.databases_and_security.map(clean), ...skills.tools.map(clean)],
    color: {
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
    },
  },
  {
    id: "languages",
    label: "MODULE_03",
    category: "LANGUAGES",
    skills: skills.languages.map(clean),
    color: {
      text: "text-violet-400",
      border: "border-violet-500/20",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      dot: "bg-violet-400",
    },
  },
  {
    id: "concepts",
    label: "MODULE_04",
    category: "CONCEPTS",
    skills: skills.concepts.map(clean),
    color: {
      text: "text-amber-400",
      border: "border-amber-500/20",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      dot: "bg-amber-400",
    },
  },
];

// ── Animation Variants ──────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// ── Module Card Sub-Component ───────────────────────────────────────────
interface ModuleCardProps {
  mod: SkillModule;
  index: number;
}

function ModuleCard({ mod, index }: ModuleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className={`relative rounded-xl border border-white/[0.05] bg-black/20 backdrop-blur-lg p-5 sm:p-6 overflow-hidden group/card`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
        index === 0 ? "via-blue-500/40" :
        index === 1 ? "via-emerald-500/40" :
        index === 2 ? "via-violet-500/40" :
        "via-amber-500/40"
      } to-transparent`} />

      {/* Corner brackets */}
      <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l ${mod.color.border} opacity-40`} />
      <div className={`absolute top-2 right-2 w-3 h-3 border-t border-r ${mod.color.border} opacity-40`} />
      <div className={`absolute bottom-2 left-2 w-3 h-3 border-b border-l ${mod.color.border} opacity-40`} />
      <div className={`absolute bottom-2 right-2 w-3 h-3 border-b border-r ${mod.color.border} opacity-40`} />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-[0.06] ${
          index === 0 ? "bg-blue-500" :
          index === 1 ? "bg-emerald-500" :
          index === 2 ? "bg-violet-500" :
          "bg-amber-500"
        }`}
      />

      {/* Module Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase ${mod.color.text}`}>
          [{mod.label}: {mod.category}]
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${mod.color.badge}`}>
          {mod.skills.length} items
        </span>
      </div>

      {/* Toolbox Chips */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap gap-2"
      >
        {mod.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={chipVariants}
            className="px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] text-xs sm:text-[13px] font-mono tracking-wide text-gray-300 transition-colors duration-200 hover:text-white hover:border-white/25"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Main SkillsScanner Component ────────────────────────────────────────
export default function SkillsScanner(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full px-6 py-20 md:px-12 md:py-28 overflow-hidden"
    >
      {/* ── Background Effects ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 w-[30rem] h-[30rem] rounded-full bg-emerald-500/[0.025] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[26rem] h-[26rem] rounded-full bg-blue-500/[0.025] blur-[140px]"
      />

      {/* ── Section Header ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto mb-12 md:mb-16"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-emerald-400 text-xs font-mono">❯</span>
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-gray-500 uppercase">
            {`// skills.scan()`}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          Technical Arsenal
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-500 font-mono max-w-xl">
          Runtime inventory of technologies used across product, systems, and low-level engineering work.
        </p>
      </motion.div>

      {/* ── Module Grid ───────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
      >
        {MODULES.map((mod, i) => (
          <ModuleCard key={mod.id} mod={mod} index={i} />
        ))}
      </motion.div>

      {/* ── Footer Status Bar ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 max-w-6xl mx-auto mt-8 flex items-center justify-between text-[10px] font-mono text-gray-600 px-1"
      >
        <span>
          <span className="text-emerald-500 mr-1">●</span>
          All modules operational
        </span>
        <span>
          {MODULES.reduce((acc, m) => acc + m.skills.length, 0)} skills indexed
        </span>
      </motion.div>
    </section>
  );
}
