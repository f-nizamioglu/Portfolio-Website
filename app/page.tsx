"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const grainTexture =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Cinematic scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.04] mix-blend-soft-light bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_3px)]"
      />
      {/* Subtle film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: grainTexture }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-24 md:gap-32">
        
        {/* Step 1: Hero Section */}
        <motion.section 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 min-h-[60vh]"
        >
          {/* Left Side (Headshot) */}
          <motion.div variants={itemVariants} className="w-full flex justify-center md:justify-start">
            <motion.div
              layout
              animate={floatAnimation}
              className="chromatic-border relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-xl border border-white/10 backdrop-blur-md bg-white/[0.03] shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden group"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.04] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_70%)]"
              />
              <Image
                src="/headshot.jpeg"
                alt="Portfolio headshot - Full-Stack Engineer"
                fill
                priority
                className="object-cover object-top z-10 rounded-xl"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 384px, 384px"
              />
              {/* Corner Bracket Accents */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/20 z-20" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/20 z-20" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/20 z-20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/20 z-20" />
            </motion.div>
          </motion.div>

          {/* Right Side (Intro Copy + Navigation) */}
          <motion.div variants={itemVariants} className="w-full flex flex-col items-start text-left">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Fikrat Mammadov
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mt-4 leading-relaxed">
              Full-Stack <span className="font-mono text-emerald-300">Engineer</span> &amp; Aviation Enthusiast
            </p>
            <p className="text-base sm:text-lg text-gray-400 mt-6 max-w-xl leading-relaxed font-light">
              4th-year Computer Engineering student at Yildiz Technical University. As a scout and pilot, I am drawn to environments where discipline, situational awareness, and calm execution matter - the same mindset I bring to building reliable software.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/console#full-stack-engineering"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 border border-zinc-700 bg-zinc-900/80 text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-[0_0_20px_-6px_rgba(16,185,129,0.55)]"
              >
                <span>View Engineering</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="#passions-section"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 border border-zinc-700 bg-zinc-900/60 text-gray-200 font-medium transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/50 hover:text-white"
              >
                Explore Passions
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Step 2 & 3: Grid Layout for Narratives */}
        <motion.section 
          id="passions-section"
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 -mt-8"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 sm:p-10 transition-colors hover:bg-zinc-900/80 hover:border-zinc-700">
            <h2 className="text-sm font-semibold tracking-widest text-white uppercase mb-4">
              The Foundation
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-4xl">
              My journey began in Baku, Azerbaijan, where I graduated with an honorary decree from the Türkiye Diyanet Vakfı Bakü Türk Lisesi. Believing in quantifiable foundations, I secured a 1440 on the SAT and an 8.0 on the IELTS. These benchmarks became my bridge to Istanbul, where I now apply that same academic discipline to full-stack development and low-level systems programming.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 sm:p-10 transition-colors hover:bg-zinc-900/80 hover:border-zinc-700 flex flex-col h-full">
            <h2 className="text-sm font-semibold tracking-widest text-white uppercase mb-6">
              Global Adaptability
            </h2>
            <div className="w-full aspect-video rounded-xl mb-6 overflow-hidden">
              <Image
                src="/Chipotle Pic.jpg"
                alt="WAT Chipotle Team"
                width={1600}
                height={900}
                quality={100}
                unoptimized
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <p className="text-base text-gray-300 font-light leading-relaxed flex-grow">
              Growth requires stepping into unfamiliar systems. During a summer in the US on the Work and Travel (WAT) program, I operated in high-throughput environments across two demanding roles: kitchen operations at Sodexo Live! in Water Country and line execution at Chipotle. Adapting quickly, staying accurate under pressure, and delivering consistently across long shifts built the operational resilience I now bring to engineering teams and production systems.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 sm:p-10 transition-colors hover:bg-zinc-900/80 hover:border-zinc-700 flex flex-col h-full">
            <h2 className="text-sm font-semibold tracking-widest text-white uppercase mb-6">
              Passions & Precision
            </h2>
            <div className="w-full aspect-video rounded-xl mb-6 overflow-hidden">
              <Image
                src="/Plane Pic.jpg"
                alt="Piper Cherokee Aviation"
                width={1600}
                height={900}
                quality={100}
                unoptimized
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <p className="text-base text-gray-300 font-light leading-relaxed flex-grow">
              When I step away from the IDE, I stay close to precision-driven systems. Aviation sharpened my decision-making in dynamic conditions, while seven years of fortepiano training taught me disciplined repetition and exact interpretation of complex notation. Reading dense sheet music with control and timing mirrors how I approach low-level C programming: careful structure, precise execution, and zero room for careless errors.
            </p>
          </motion.div>
        </motion.section>

        {/* Step 4: The Gateway (Call to Action) */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="pt-16 pb-24 flex justify-center"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-8 text-center w-full">
            <div className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
            <Link 
              href="/console" 
              className="group relative inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-medium text-base transition-all duration-300 hover:scale-105 active:scale-95 border border-zinc-700 hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_var(--tw-shadow-color)] hover:shadow-emerald-500/40"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 tracking-wide">Enter the Engineering Console</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-all z-10" />
            </Link>
          </motion.div>
        </motion.section>

      </div>
    </main>
  );
}
