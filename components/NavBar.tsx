"use client";

import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#050505]/60 border-b border-white/5">
      <div className="flex items-center gap-3 text-white font-mono font-bold tracking-widest text-sm sm:text-base">
        <span className="text-emerald-500">FM</span>
        <span className="text-white/10 hidden sm:inline">|</span>
        <span className="hidden sm:inline text-gray-400 font-light text-xs">PORTFOLIO.CONSOLE</span>
      </div>

      <div className="flex items-center gap-2.5 border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md">
        <div className="relative flex items-center justify-center w-2 h-2">
          {/* Pulsing glow using SVG-like scaling or simple framer-motion */}
          <motion.div
            className="absolute inset-0 bg-emerald-500 rounded-full"
            animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Core dot (SVG approach) */}
          <svg className="relative w-2 h-2 text-emerald-400" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 tracking-wider uppercase font-medium">
          SYSTEM: ACTIVE
        </span>
      </div>
    </nav>
  );
}
