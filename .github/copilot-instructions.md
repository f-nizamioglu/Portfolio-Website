# Copilot Instructions

## Project Overview

This is a personal portfolio website for Fikrat Mammadov (f-nizamioglu), a Full-Stack Engineer and Computer Engineering student at Yildiz Technical University. The site is built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3 with a dark theme (primary background `#050505`, accent color `emerald-500`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Resend
- **Deployment**: Vercel

## Project Structure

```
app/                  # Next.js App Router pages and API routes
  api/                # API route handlers (e.g. contact form)
  console/            # /console route and sub-pages
  fonts/              # Local font files (Geist Sans, Geist Mono)
  globals.css         # Global CSS
  layout.tsx          # Root layout with metadata and fonts
  page.tsx            # Home page (/)
components/           # Reusable React components
constants/
  data.json           # Centralised portfolio data (profile, experience, skills, projects)
public/               # Static assets (images, favicon)
```

## Key Conventions

- **`"use client"` directive**: Add to any component that uses React hooks, event handlers, or browser APIs. Server components (no directive) are preferred when possible.
- **TypeScript**: Use explicit types; avoid `any`. Import `Variants` from `framer-motion` for animation variant objects.
- **Tailwind CSS**: Use utility classes directly. The design system uses:
  - Dark backgrounds: `bg-[#050505]`, `bg-zinc-900`, `bg-zinc-900/50`
  - Text: `text-[#ededed]`, `text-gray-300`, `text-gray-400`
  - Accent/highlight color: `emerald-400` / `emerald-500`
  - Secondary accent: `sky-400`
  - Borders: `border-zinc-700`, `border-zinc-800`, `border-white/10`
  - Cards: `rounded-2xl`, `backdrop-blur-md`
- **Data**: Portfolio content (projects, skills, experience) lives in `constants/data.json`. Read from there rather than hardcoding.
- **Images**: Use `next/image` with `fill` or explicit `width`/`height`. Provide meaningful `alt` text.
- **Links**: Use `next/link` for internal navigation.
- **Fonts**: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) are loaded as CSS variables in the root layout.

## Animation Patterns

Framer Motion animations follow a consistent stagger pattern:

```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
```

Use `initial="hidden" animate="visible"` for above-the-fold content and `initial="hidden" whileInView="visible" viewport={{ once: true }}` for sections further down the page.

## Commands

```bash
npm run dev       # Start local dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint (next lint)
```

## ESLint

The project extends `next/core-web-vitals` and `next/typescript`. Run `npm run lint` before submitting changes.
