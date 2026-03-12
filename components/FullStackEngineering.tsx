"use client";

import { motion, type Variants } from "framer-motion";

type ProjectCard = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
};

const PROJECTS: ProjectCard[] = [
  {
    id: "saas-gym-platform",
    title: "SaaS Gym Platform",
    summary:
      "A full-stack platform built for modern gym operations, combining robust backend data flows with a polished product experience.",
    stack: ["Next.js", "React", "Supabase"],
  },
  {
    id: "ms-paint-clone",
    title: "MS Paint Clone",
    summary:
      "A desktop drawing application recreation focused on rendering controls, brush behavior, and smooth UI interactions.",
    stack: ["C#"],
  },
  {
    id: "airport-traffic-management",
    title: "Airport Traffic Management Algorithm",
    summary:
      "A low-level systems programming project in C for modeling and optimizing runway and traffic coordination logic.",
    stack: ["C"],
  },
  {
    id: "numerical-methods-calculator",
    title: "Numerical Methods Calculator",
    summary:
      "An algorithm-first calculator in C implementing core numerical methods with a strong focus on precision and performance.",
    stack: ["C"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FullStackEngineering(): JSX.Element {
  return (
    <section
      id="full-stack-engineering"
      className="relative w-full px-6 py-20 md:px-12 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff05,transparent_45%)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-emerald-400 text-xs font-mono">&gt;</span>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-gray-500 uppercase">
              {`// full-stack.engineering`}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white chromatic-text skills-glitch">
            Full-Stack Engineering
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
            Core builds across product development, low-level systems, and algorithmic implementation.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="group chromatic-border rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-7 transition-transform duration-300 hover:scale-[1.02] hover:bg-zinc-900/80 hover:border-zinc-700"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {project.summary}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={`${project.id}-${tech}`}
                    className="px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/60 text-xs font-mono tracking-wide text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
