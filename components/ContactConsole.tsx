"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Github, Linkedin, Mail } from "lucide-react";
import portfolioData from "@/constants/data.json";

export default function ContactConsole(): JSX.Element {
  const { contact } = portfolioData.profile;
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (formState !== "idle") {
      setFormState("idle");
    }
    
    // Smooth scroll to the terminal section
    const terminalNode = document.getElementById("contact-terminal");
    if (terminalNode) {
      terminalNode.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Delay focus slightly to allow animations/DOM updates
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as const } 
    },
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormState("sending");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setFormState("error");
    }
  };

  return (
    <section id="contact-terminal" className="w-full py-24 px-6 md:px-12 flex items-center justify-center relative z-10 pb-32">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        
        {/* Terminal Window */}
        <motion.div
          className="w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] font-mono text-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Header Bar */}
          <div className="w-full bg-[#111]/80 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-gray-400 text-xs md:text-sm tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span>fikrat@yildiz-tech: <span className="text-blue-400">~/contact</span></span>
            </div>
            <div className="w-16" /> {/* Spacer */}
          </div>

          <div className="p-5 sm:p-8 flex flex-col gap-6">
            
            {/* Command Line Input */}
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-emerald-400 font-bold shrink-0">guest@portfolio:~$</span>
              <span className="text-gray-200 tracking-wider">contact --send</span>
            </div>

            {/* Interactive Form or Terminal Output */}
            <div className="bg-[#050505]/50 rounded-lg border border-white/5 p-5 md:p-6 overflow-hidden min-h-[250px] relative">
              <AnimatePresence mode="wait">
                
                {formState === "idle" && (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSend}
                    className="flex flex-col gap-4 text-xs sm:text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-gray-500 uppercase tracking-widest text-[10px]">--name</label>
                        <input 
                          id="name"
                          type="text" 
                          required
                          ref={nameInputRef}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-colors w-full focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-gray-500 uppercase tracking-widest text-[10px]">--email</label>
                        <input 
                          id="email"
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-colors w-full"
                          placeholder="you@domain.com"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-gray-500 uppercase tracking-widest text-[10px]">--message</label>
                      <textarea 
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-colors w-full resize-none"
                        placeholder="Type your message here..."
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="mt-2 self-start flex items-center gap-2 bg-white/5 hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/50 transition-all rounded px-6 py-2 uppercase tracking-widest text-[11px] font-bold group"
                    >
                      <span>Execute</span>
                      <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
                )}

                {formState === "sending" && (
                  <motion.div 
                    key="sending"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-emerald-400"
                  >
                    <div className="flex items-center gap-2">
                       <span className="animate-spin w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full" />
                       <span className="animate-pulse tracking-widest">[SENDING PARQUETS...]</span>
                    </div>
                  </motion.div>
                )}

                {formState === "success" && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex flex-col items-start justify-center p-6 sm:p-8"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <span className="text-green-400 font-bold shrink-0">[SUCCESS]</span>
                        <span className="text-gray-300">Message dispatched to <span className="text-emerald-400">{contact.email}</span>.</span>
                      </div>
                      <div className="flex gap-2 text-gray-500">
                        <span className="text-blue-400 font-bold shrink-0">[INFO]</span>
                        <span>Connection closed. Awaiting response...</span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                        <span className="text-emerald-400">❯</span>
                        <span className="animate-pulse text-gray-500">_</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {formState === "error" && (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex flex-col items-start justify-center p-6 sm:p-8"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <span className="text-red-500 font-bold shrink-0">[ERROR]</span>
                        <span className="text-gray-300">Connection timeout. Please use <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0a66c2] hover:underline font-bold tracking-wide">LinkedIn</a>.</span>
                      </div>
                      <div className="flex gap-2 text-gray-500">
                        <span className="text-blue-400 font-bold shrink-0">[INFO]</span>
                        <span>Terminal reset required.</span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                        <span className="text-emerald-400">❯</span>
                        <span className="animate-pulse text-gray-500">_</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </div>
            
            {/* System Links */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-600 uppercase tracking-widest">
                {`// System Links`}
              </div>
              <div className="flex gap-4">
                <a 
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#0a66c2] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.5)] transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="mailto:fnizamioglu@gmail.com"
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-emerald-400 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
