"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import portfolioData from "@/constants/data.json";

// ── Data ─────────────────────────────────────────────────────────────
const { profile } = portfolioData;

const ABOUT_TEXT =
  "Bridging high-level SaaS architecture with low-level systems programming. " +
  "Currently a 4th-Year Computer Engineering student at Yildiz Technical University.";

// ── Animation Variants ──────────────────────────────────────────────

/** Stagger container for boot sequence lines */
const bootContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

/** Individual line entrance */
const bootLineVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

/** Floating Y-axis animation for the headshot */
const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// ── Typewriter Hook ──────────────────────────────────────────────────
function useTypewriter(text: string, speed: number = 28, startDelay: number = 2000): string {
  const [displayed, setDisplayed] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  const tick = useCallback(() => {
    setDisplayed((prev) => {
      if (prev.length >= text.length) return prev;
      return text.slice(0, prev.length + 1);
    });
  }, [text]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed, tick]);

  return displayed;
}

// ── Component ────────────────────────────────────────────────────────
export default function Hero(): JSX.Element {
  const typedSummary = useTypewriter(ABOUT_TEXT, 28, 2200);
  const isTypingComplete = typedSummary.length >= ABOUT_TEXT.length;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-6 py-16 md:px-12 md:py-24 overflow-hidden">
      {/* ── Ambient Background Effects ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-emerald-500/[0.04] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -right-32 w-[24rem] h-[24rem] rounded-full bg-sky-500/[0.04] blur-[120px]"
      />

      {/* ── Main Two-Column Grid ───────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* ── LEFT COLUMN: Profile Image ───────────────────────────── */}
        <div className="flex justify-center md:justify-end order-1 md:order-1">
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              layout
              animate={floatAnimation}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-xl border border-white/10 backdrop-blur-md bg-white/[0.03] shadow-[0_0_40px_rgba(255,255,255,0.03)] overflow-hidden group"
            >
              {/* Glassmorphism inner glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.04] pointer-events-none"
              />

              {/* Interactive hover glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_70%)]"
              />

              {/* Headshot Image */}
              <Image
                src="/headshot.jpeg"
                alt="Fikrat Mammadov - Full-Stack Engineer"
                fill
                priority
                className="object-cover z-10"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 352px"
              />

              {/* Corner Bracket Accents */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/15 z-20" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/15 z-20" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/15 z-20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/15 z-20" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: System Boot Terminal ───────────────────── */}
        <div className="order-2 md:order-2 w-full">
          <motion.div
            layout
            className="w-full rounded-lg border border-white/5 bg-white/[0.02] p-5 sm:p-6 md:p-8 font-mono"
            variants={bootContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* ── Line 1: Status Badge ────────────────────────────── */}
            <motion.div
              variants={bootLineVariants}
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 tracking-wide"
            >
              <span className="text-emerald-500 mr-1" aria-hidden="true">●</span>
              <span>
                System Status:{" "}
                <span className="text-emerald-400 font-medium">Online</span>
              </span>
              <span className="text-white/15 mx-1">|</span>
              <span>
                Location:{" "}
                <span className="text-gray-300">{profile.contact?.location?.replace(", Turkiye", "") || "Unknown"} / Baku</span>
              </span>
            </motion.div>

            {/* ── Line 2: Name (Heading) ──────────────────────────── */}
            <motion.h1
              variants={bootLineVariants}
              className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.1]"
            >
              {profile.name}
            </motion.h1>

            {/* ── Line 3: Title (Sub-heading) ─────────────────────── */}
            <motion.p
              variants={bootLineVariants}
              className="mt-2 text-sm sm:text-base text-gray-400 tracking-widest uppercase"
            >
              {profile.title}
            </motion.p>

            {/* ── Divider ─────────────────────────────────────────── */}
            <motion.div
              variants={bootLineVariants}
              className="mt-6 mb-5 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"
              aria-hidden="true"
            />

            {/* ── About Me: Typewriter Block ──────────────────────── */}
            <motion.div variants={bootLineVariants}>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-500 mb-3 block">
                {`// about`}
              </span>
              <p
                className="text-sm sm:text-[0.9rem] leading-relaxed text-gray-400 min-h-[4.5rem]"
                aria-label={ABOUT_TEXT}
              >
                {typedSummary}
                <span
                  className={`inline-block ml-0.5 text-emerald-400 ${
                    isTypingComplete ? "animate-blink-cursor" : ""
                  }`}
                  aria-hidden="true"
                >
                  _
                </span>
              </p>
            </motion.div>

            {/* ── Terminal Prompt ──────────────────────────────────── */}
            <motion.div
              variants={bootLineVariants}
              className="mt-6 flex items-center gap-2 text-xs text-gray-500"
            >
              <span className="text-emerald-400">❯</span>
              <span className="text-gray-600">ready</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
