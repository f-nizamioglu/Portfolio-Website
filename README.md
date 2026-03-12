# ⚡ Fikrat Mammadov | Engineering Terminal & Portfolio

> A high-performance, interactive developer portfolio architected to bridge modern scalable web development with low-level systems engineering.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#) [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](#) [![Vercel](https://img.shields.io/badge/Vercel-Edge_Deployed-black.svg)](#)

## 💻 System Overview
This repository contains the source code for my interactive engineering portfolio, operating live at [fnizamioglu.dev](https://fnizamioglu.dev). Designed as a "Command Console," it serves as a technical demonstration of strict type safety, responsive component design, and production-grade security hardening. 

As a 4th-year Computer Engineering student at Yildiz Technical University, I built this application to showcase a range of competencies—from handling Row-Level Security in multi-tenant architectures to writing memory-efficient algorithms in C.

## 🏗️ Architecture & Tech Stack
* **Framework:** Next.js / React (App Router)
* **Styling:** Tailwind CSS & Framer Motion (Hardware-accelerated animations)
* **Backend Integration:** API Route Handlers via Edge Network
* **Communication:** Resend Node.js SDK
* **Infrastructure:** Vercel (Edge caching, WAF headers)

## 🛡️ Security & Hardening (Level 3 Audit Passed)
This application goes beyond standard static portfolios by implementing strict, enterprise-level security protocols on its open API routes:
* **Layer 7 DDoS Mitigation:** `vercel.json` configured with strict WAF headers, Cross-Origin Deny policies, and cache invalidation boundaries.
* **IP Spoofing Protection:** Relies exclusively on `x-real-ip` from the Vercel Edge proxy for accurate rate-limiting, dropping trivial bot impersonation.
* **Payload Sanitization:** The contact terminal enforces strict character limits and utilizes a recursive HTML tag-stripping loop to prevent XSS and downstream payload injections.
* **504 Gateway Resiliency:** Frontend cleanly catches 502/504 errors from the Resend provider, preventing UI locks and dispatching a graceful terminal error state.

## 📦 Featured Sub-Systems & Projects
This repository acts as the central hub for my wider engineering work, highlighting both high-level SaaS development and low-level system design:

### 1. Multi-Tenant Fitness SaaS
* **Stack:** Next.js, React, Supabase, Tailwind CSS.
* **Details:** Engineered a secure platform utilizing Supabase Row-Level Security (RLS) to ensure absolute tenant data isolation and scalable user management.

### 2. Low-Level Systems & Algorithms
* **Airport Traffic Management (C):** Developed a routing algorithm emphasizing memory efficiency, data structure optimization, and real-time processing simulation.
* **Numerical Methods Calculator (C):** Engineered a precision-focused calculator for complex mathematical modeling.

### 3. Object-Oriented Applications
* **MS Paint Clone (C#):** Built a fully functional raster graphics editor to demonstrate deep understanding of OOP principles, event handling, and GUI state management.

## ⚡ Performance & QA
The repository maintains strict adherence to core web vitals and developer experience standards:
* **Zero-Tolerance Type Checking:** CI/CD pipeline enforces `tsc --noEmit`. The codebase contains zero `any` types.
* **Strict Linting:** Passes `npm run lint` with absolutely zero ESLint warnings or suppressed rules.
* **Optimized Rendering:** Eliminates Cumulative Layout Shift (CLS) through strict Next.js Image component mapping and intelligent Framer Motion `layout` properties.
* **Safe State Management:** Utilizes optional chaining and safe memory sweeping (`clearTimeout`) to prevent zombie closures and fatal React runtime crashes.

## 🚀 Local Deployment
To run this console locally:

```bash
# 1. Clone the repository
git clone [https://github.com/yourusername/portfolio-console.git](https://github.com/yourusername/portfolio-console.git)

# 2. Install dependencies
npm install

# 3. Configure the environment
# Create a .env.local file and add your Resend API Key:
# RESEND_API_KEY="re_your_api_key_here"

# 4. Boot the development server
npm run dev