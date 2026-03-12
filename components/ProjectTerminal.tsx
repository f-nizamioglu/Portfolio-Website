"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import portfolioData from "@/constants/data.json";

type TerminalHistoryItem = {
  type: "input" | "output" | "error";
  content: React.ReactNode;
};

export default function ProjectTerminal(): JSX.Element | null {
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (history.length > 1 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [history]);

  const handleAnimationComplete = () => {
    setIsSequenceComplete(true);
    setHistory([
      { 
        type: "output", 
        content: <span className="text-blue-400 font-bold">[SYSTEM] <span className="text-gray-300 font-normal">Interactive shell active. Type &apos;help&apos; to view available commands.</span></span>
      }
    ]);
  };

  const handleTerminalClick = () => {
    if (isSequenceComplete) {
      inputRef.current?.focus();
    }
  };

  const executeCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();
    if (!cmd) return;

      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      
      setInputVal("");
      setHistory((prev) => [...prev, { type: "input", content: <span className="text-emerald-400 font-semibold shrink-0">guest@fnizamioglu.dev:~$ <span className="text-white font-normal">{cmd}</span></span> }]);

      const parts = cmd.split(" ");
      const base = parts[0]?.toLowerCase();
      const flag = parts[1];
      const arg = parts[2];

      if (base === "projects") {
        if (flag === "--list") {
          const listContent = portfolioData.projects.map((p) => (
            <div key={p.id} className="text-gray-400">
              [ID] <span className="text-emerald-400">{p.id}</span> | [TITLE] {p.title.replace(/\[cite:\s*\d+\]/g, "").trim()}
            </div>
          ));
          setHistory((prev) => [...prev, { type: "output", content: <div className="flex flex-col gap-1">{listContent}</div> }]);
        } else if (flag === "--view" && arg) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const project: any = portfolioData.projects.find((p) => p.id === arg);
          if (project) {
            let outputContent;
            if (project.id === "oop-paint-clone") {
              outputContent = (
                <div className="flex flex-col gap-2 text-gray-400 my-2">
                  <div className="text-white font-bold text-lg mb-1">{project.title.replace(/\[cite:\s*\d+\]/g, "").trim()}</div>
                  <div>{project.description}</div>
                  <div className="text-emerald-400 mt-2">{`>> ARCHITECTURE: Event-Driven Desktop Application`}</div>
                  <div className="text-emerald-400">{`>> PATTERNS: Strategy Pattern (Tool Swapping), Command Pattern (Undo/Redo Stack)`}</div>
                  <div className="text-emerald-400">{`>> GRAPHICS API: System.Drawing (GDI+)`}</div>
                  <div className="mt-2 text-xs">TECH STACK: {(project.tech || project.techStack || []).join(", ")}</div>
                </div>
              );
            } else {
              outputContent = (
                <div className="flex flex-col gap-2 text-gray-400 my-2">
                  <div className="text-white font-bold text-lg mb-1">{project.title.replace(/\[cite:\s*\d+\]/g, "").trim()}</div>
                  <div>{project.description}</div>
                  <div className="mt-2 text-xs">TECH STACK: {(project.tech || project.techStack || []).join(", ")}</div>
                </div>
              );
            }
            setHistory((prev) => [...prev, { type: "output", content: outputContent }]);
          } else {
            setHistory((prev) => [
              ...prev,
              { type: "error", content: <span className="text-red-400">[ERROR] Project reference not found. Execute &apos;projects --list&apos; to view valid targets.</span> }
            ]);
          }
        } else {
          setHistory((prev) => [
            ...prev,
            { type: "error", content: <span className="text-red-400">[ERROR] Invalid usage. Try &apos;projects --list&apos; or &apos;projects --view &lt;id&gt;&apos;.</span> }
          ]);
        }
      } else if (base === "help") {
        const helpContent = (
          <div className="flex flex-col gap-2 text-gray-400 my-2">
            <div className="text-white font-bold">AVAILABLE COMMANDS:</div>
            <div className="flex gap-4"><span className="text-emerald-400 min-w-[200px]">projects --list</span><span>: View all indexed project reference IDs.</span></div>
            <div className="flex gap-4"><span className="text-emerald-400 min-w-[200px]">projects --view &lt;id&gt;</span><span>: View architectural details of a specific project.</span></div>
            <div className="flex gap-4"><span className="text-emerald-400 min-w-[200px]">neofetch</span><span>: View personal system stats.</span></div>
            <div className="flex gap-4"><span className="text-emerald-400 min-w-[200px]">clear</span><span>: Clear the terminal output.</span></div>
          </div>
        );
        setHistory((prev) => [...prev, { type: "output", content: helpContent }]);
      } else if (base === "neofetch") {
        const neofetchContent = (
          <div className="my-2 grid grid-cols-1 sm:grid-cols-[16ch,1fr] gap-4 font-mono text-xs sm:text-sm">
            <pre className="text-emerald-400 leading-tight whitespace-pre">
{`       __|__
--o--o-(_)-o--o--
       /_\
`}
            </pre>
            <pre className="text-gray-300 leading-relaxed whitespace-pre">
{`┌────────────────────────────────────────────────────────┐
│ dual.identity@console                                 │
├────────────────────────────────────────────────────────┤
│ distro      : Yildiz Technical University (4th Year)  │
│ kernel      : Computer Engineering                    │
│ uptime      : 21 Years (since 2005)                  │
│ shell       : Azerbaijani (Native) / English (C1)    │
│ locale-pack : French (A2)                            │
│ toolchain   : Piano Diploma (7yr), WAT 2025          │
│              Scout Leader                             │
│ wm          : Pilot in Training                       │
│ dual-stack  : Cockpit Precision x IDE Execution       │
└────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        );
        setHistory((prev) => [...prev, { type: "output", content: neofetchContent }]);
      } else if (base === "clear") {
        setHistory([]);
      } else {
        setHistory((prev) => [
          ...prev,
          { type: "error", content: <span className="text-red-400">[ERROR] Command not found: {base}</span> }
        ]);
      }
  };

  const handleCommandSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const next = historyIndex <= 0 ? commandHistory.length - 1 : historyIndex - 1;
      setHistoryIndex(next);
      setInputVal(commandHistory[next]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const next = historyIndex === -1 ? 0 : (historyIndex + 1) % commandHistory.length;
      setHistoryIndex(next);
      setInputVal(commandHistory[next]);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

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
          onAnimationComplete={handleAnimationComplete}
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

          <div className="p-6 md:p-8 flex flex-col gap-8 bg-[#0a0a0a] cursor-text" onClick={handleTerminalClick}>
            
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

            {/* 3. Interactive Command History */}
            {history.map((item, i) => (
              <div key={i} className="text-sm font-mono tracking-wide">
                {item.content}
              </div>
            ))}

            {/* Terminal Prompt (Interactive) */}
            {isSequenceComplete && (
              <form 
                onSubmit={handleCommandSubmit} 
                className="flex items-center gap-2 mt-4 text-sm font-mono w-full"
              >
                <span className="text-emerald-500 shrink-0">guest@fnizamioglu.dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-gray-300 font-mono focus:ring-0 p-0 shadow-none"
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="text-emerald-400 font-mono animate-blink-cursor select-none">█</span>
              </form>
            )}
            
            <div ref={bottomRef} />

          </div>
        </motion.div>
      </div>
    </section>
  );
}
