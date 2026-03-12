"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import portfolioData from "@/constants/data.json";

export default function ProjectTerminal(): JSX.Element | null {
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  const project = portfolioData.projects.find((p) => p.id === "airport-traffic");

  if (!project) return null;

  // Clean cite references from text
  const title = project.title.replace(/\[cite:\s*\d+\]/g, "").trim();
  const description = "Designed a C-based routing algorithm emphasizing memory efficiency and optimized data structures.";

  const logLines = [
    { type: "INFO", text: "Initializing routing algorithm...", color: "text-blue-400" },
    { type: "SUCCESS", text: "Memory allocated: 512KB", color: "text-emerald-400" },
    { type: "PROCESS", text: "Optimizing path for Flight-TR702...", color: "text-yellow-400" },
    { type: "DONE", text: "Efficiency: 98.4%", color: "text-emerald-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const,
        staggerChildren: 0.3,
        delayChildren: 0.4
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.4, ease: "easeOut" as const } 
    },
  };

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-transparent flex flex-col items-center justify-center relative z-10">
      <div className="max-w-4xl w-full flex flex-col gap-10">
        
        {/* ── Context Header ── */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl px-4">
            {description}
          </p>
        </div>

        {/* ── Vintage Linux Terminal ── */}
        <motion.div
          className="w-full rounded-lg overflow-hidden border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-mono text-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          onAnimationComplete={() => setIsSequenceComplete(true)}
        >
          {/* Terminal Header */}
          <div className="w-full bg-[#111] border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-gray-400 text-xs md:text-sm tracking-wider">traffic_sim.c</div>
            <div className="w-12" /> {/* Spacer for centering */}
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-8 bg-[#0a0a0a]">
            
            {/* 1. Animated Build Logs */}
            <div className="flex flex-col gap-3">
              {logLines.map((log, index) => {
                const isEmerald = log.type === "SUCCESS" || log.type === "DONE";
                const isPulsing = isEmerald && isSequenceComplete;
                
                return (
                  <motion.div key={index} variants={lineVariants} className="flex flex-wrap sm:flex-nowrap gap-x-3 gap-y-1 text-gray-500">
                    <span className="shrink-0">
                      <span className={`font-semibold ${log.color} ${isPulsing ? "animate-pulse" : ""}`}>
                        [{log.type}]
                      </span>
                    </span>
                    <span className="text-gray-300">{log.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* 2. Static Code Snippet (High-end Syntax Style) */}
            <motion.div variants={lineVariants} className="mt-2 text-xs sm:text-sm">
              <div className="text-gray-500 mb-2">{`// memory_align.h : Data structure initialization`}</div>
              <div className="bg-[#050505] rounded-md p-5 border border-white/5 overflow-x-auto">
                <pre className="inline-block min-w-full text-gray-300 leading-loose">
                  <code>
                    <span className="text-pink-400">typedef struct</span> {"{"}
                    {"\n"}
                    {"    "}<span className="text-purple-400">uint32_t</span> flight_id;{"\n"}
                    {"    "}<span className="text-purple-400">uint16_t</span> altitude;{"\n"}
                    {"    "}<span className="text-purple-400">float</span> target_vector[<span className="text-orange-400">3</span>];{"\n"}
                    {"    "}<span className="text-pink-400">struct</span> RouteNode* next_waypoint;{"\n"}
                    {"}"} <span className="text-emerald-400">AircraftState</span>;{"\n"}
                    {"\n"}
                    <span className="text-blue-400">void*</span> <span className="text-yellow-200">init_routing_memory</span>(<span className="text-purple-400">size_t</span> registry_size) {"{"}
                    {"\n"}
                    {"    "}<span className="text-emerald-400">AircraftState</span>* grid = alloc_aligned(registry_size);{"\n"}
                    {"    "}<span className="text-pink-400">if</span> (!grid) <span className="text-pink-400">return</span> <span className="text-blue-400">NULL</span>;{"\n"}
                    {"    "}<span className="text-blue-400">memset</span>(grid, <span className="text-orange-400">0</span>, registry_size);{"\n"}
                    {"    "}<span className="text-pink-400">return</span> grid;{"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>
            </motion.div>

            {/* Terminal Prompt */}
            <motion.div variants={lineVariants} className="flex items-center gap-2 mt-2">
              <span className="text-emerald-400 font-semibold">user@system:~/airport-sim$</span>
              <span className="animate-blink-cursor text-white font-bold block w-2 h-4 bg-white/80"></span>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
