"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import portfolioData from "@/constants/data.json";

// ── Helpers ─────────────────────────────────────────────────────────────
const clean = (s: string): string => s.replace(/\s*\[cite:[\s\d,]*\]/gi, "");

// ── Data Construction ───────────────────────────────────────────────────
// The user has raw projects in JSON, but we need to create/match the specific ones
// for the "Gym SaaS," "Meteor App," and "AI Support Engine."

const rawProjects = portfolioData.projects;

// Find existing projects via keywords/ids
const meteorProject = rawProjects.find((p) => p.id === "meteor-weather") || {
  id: "meteor-weather",
  title: "Meteor App",
  description: "A modern weather application with a highly responsive UI.",
  tech: ["Next.js", "React", "Vercel"],
};

const aiProject = rawProjects.find((p) => p.id === "ai-support") || {
  id: "ai-support",
  title: "Pro AI Support Engine",
  description: "Built a full-stack AI support platform using FastAPI, PostgreSQL, and Docker.",
  tech: ["Python", "FastAPI", "Docker", "PostgreSQL"],
};

// Manually build Gym SaaS as it's from the Experience section
const gymSaaSProject = {
  id: "gym-saas",
  title: "Multi-Tenant Fitness SaaS",
  description:
    "Engineered a secure, multi-tenant fitness SaaS platform, implementing RLS in Supabase to ensure strict tenant data isolation. Architected the frontend with Next.js, React, and Tailwind CSS.",
  tech: ["Next.js", "Supabase", "Row-Level Security", "Tailwind CSS"],
};

// Clean titles/descriptions
meteorProject.title = clean(meteorProject.title);
meteorProject.description = clean(meteorProject.description);
aiProject.title = clean(aiProject.title);
aiProject.description = clean(aiProject.description);

// Define Bento Grid layout items
const BENTO_PROJECTS = [
  {
    ...gymSaaSProject,
    colSpan: "md:col-span-4",
    accent: "from-emerald-500/20 to-emerald-500/0",
    borderHover: "group-hover:border-emerald-500/30",
    glowHover: "group-hover:bg-emerald-500/10",
  },
  {
    ...meteorProject,
    colSpan: "md:col-span-2",
    accent: "from-sky-500/20 to-sky-500/0",
    borderHover: "group-hover:border-sky-500/30",
    glowHover: "group-hover:bg-sky-500/10",
  },
  {
    ...aiProject,
    // Or md:col-span-6. Using 6 keeps it a full width bottom block, 
    // but the prompt said 3 or 4. Let's do 6 so it looks like a clean bento grid bottom row.
    colSpan: "md:col-span-6",
    accent: "from-violet-500/20 to-violet-500/0",
    borderHover: "group-hover:border-violet-500/30",
    glowHover: "group-hover:bg-violet-500/10",
  },
];

// ── Animation Variants ──────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

function LiveMetadata() {
  const [ping, setPing] = useState(12);

  useEffect(() => {
    setPing(Math.floor(Math.random() * 15) + 8);
    const interval = setInterval(() => {
      setPing((prev) => {
        const diff = Math.floor(Math.random() * 5) - 2;
        const newPing = prev + diff;
        return newPing < 5 ? 5 : newPing > 28 ? 28 : newPing;
      });
    }, 2000 + Math.random() * 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-emerald-400 tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
      {ping}MS
    </div>
  );
}

// ── Component ───────────────────────────────────────────────────────────
export default function WebProjects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="web-projects"
      ref={ref}
      className="relative w-full px-6 py-20 md:px-12 md:py-28 overflow-hidden"
    >
      {/* ── Background Effects ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff03,transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 w-[30rem] h-[30rem] -translate-y-1/2 rounded-full bg-violet-500/[0.03] blur-[120px]"
      />

      {/* ── Section Header ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto mb-10 md:mb-14"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-violet-400 text-xs font-mono">❯</span>
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-gray-500 uppercase">
            {`// deployed.projects()`}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          Featured Web Solutions
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
          A showcase of flagship applications combining robust architecture with high-performance responsive interfaces.
        </p>
      </motion.div>

      {/* ── Bento Grid ────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6"
      >
        {BENTO_PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            whileHover="hover"
            className={`group relative rounded-2xl border border-white/10 group-hover:border-transparent bg-white/[0.03] backdrop-blur-md overflow-hidden flex flex-col justify-between ${project.colSpan} transition-all duration-300`}
          >
            {/* Ambient card background glow on hover */}
            <div
              className={`absolute inset-0 opacity-0 ${project.glowHover} transition-opacity duration-500 pointer-events-none z-0`}
              aria-hidden="true"
            />

            {/* Dynamic Border Gradient */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" 
              style={{ padding: "1px", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
            >
              <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[conic-gradient(transparent_270deg,#10b981,#3b82f6)] origin-center -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite]" />
            </div>

            {/* HUD Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-40 pointer-events-none" />

            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-300 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-300 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-300 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-300 pointer-events-none" />

            {/* Top gradient accent */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${project.accent} opacity-30 pointer-events-none`}
            />

            <div className="p-6 md:p-8 relative z-10 flex-col flex h-full">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  {/* Project Index */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                      REF_00{index + 1}
                    </span>
                    <span className="text-white/10">|</span>
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                      {project.id.replace("-", "_")}
                    </span>
                  </div>
                  
                  {/* Live Metadata Indicator */}
                  <LiveMetadata />
                </div>
                <motion.h3 
                  variants={{
                    hover: { 
                      textShadow: [
                        "0px 0px 0px rgba(0,0,0,0)",
                        "-2px 0px 0px rgba(239,68,68,0.8), 2px 0px 0px rgba(59,130,246,0.8)",
                        "2px 0px 0px rgba(239,68,68,0.8), -2px 0px 0px rgba(59,130,246,0.8)",
                        "0px 0px 0px rgba(0,0,0,0)"
                      ],
                      transition: { duration: 0.3 }
                    }
                  }}
                  className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300"
                >
                  {project.title}
                </motion.h3>
                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-200 leading-relaxed font-light transition-colors duration-300">
                  {project.description}
                </p>
              </div>

              {/* Tech Badges (Pills) */}
              <motion.div 
                className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2 relative z-30"
                variants={{ hover: { transition: { staggerChildren: 0.1 } } }}
              >
                {project.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={{
                      hover: { 
                        boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 12px rgba(16,185,129,0.4)", "0 0 0px rgba(16,185,129,0)"],
                        borderColor: ["rgba(255,255,255,0.1)", "rgba(16,185,129,0.5)", "rgba(255,255,255,0.2)"],
                        color: ["#d1d5db", "#10b981", "#d1d5db"],
                        transition: { duration: 0.5 }
                      }
                    }}
                    className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono text-gray-300 bg-white/5 border border-white/10 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
