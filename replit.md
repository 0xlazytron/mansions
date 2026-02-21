# Mansions of the Moon

## Overview
NFT marketplace/showcase website built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript. Features an astrology-themed digital art collection with wallet connectivity, auctions, and team sections.

## Recent Changes
- 2026-02-21: Initial Replit setup — configured Next.js for port 5000, allowed all dev origins for proxy compatibility, set up deployment.

## Project Architecture
- **Framework**: Next.js 16 (App Router) with Turbopack
- **UI**: Tailwind CSS v4, Radix UI primitives, shadcn/ui components
- **State**: React Context (wallet-context, terms-context)
- **Styling**: PostCSS with @tailwindcss/postcss plugin
- **Structure**:
  - `app/` — Next.js app router pages and layouts
  - `components/` — UI components (navbar, hero, NFT cards, modals, etc.)
  - `components/ui/` — shadcn/ui base components
  - `context/` — React context providers
  - `hooks/` — Custom React hooks
  - `lib/` — Utility functions
  - `data/` — Static data files
  - `public/` — Static assets (images, logos)
  - `styles/` — Global styles

## Running
- Dev: `npm run dev` (runs on 0.0.0.0:5000)
- Build: `npm run build`
- Start: `npm run start` (runs on 0.0.0.0:5000)

## User Preferences
- None recorded yet
