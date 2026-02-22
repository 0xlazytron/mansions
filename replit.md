# Mansions of the Moon

## Overview
NFT marketplace/showcase website built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript. Features an astrology-themed digital art collection with wallet connectivity, auctions, and team sections.

## Recent Changes
- 2026-02-22: Visual overhaul to align with m3th1ld3.art artist identity:
  - Typography: Switched from Cinzel to Cormorant Garamond (serif) + Inter (sans-serif)
  - Color palette: Shifted from cool purple to warm rose-mauve (#b8707e, #4a3540, #7a4a58)
  - Background: Warmed from blue-black to charcoal (#100d0e)
  - Space background: Reduced density, removed shooting stars/nebulas, warmed star colors
  - Spacing: Increased section vertical padding for editorial breathing room
  - Cards: Softened borders, reduced glass/blur effects
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

## Design System
- **Font tokens**: `font-cormorant` (headings/display), `font-sans` (body/Inter)
- **Color tokens**: Rose accent (#b8707e), warm charcoal bg (#100d0e), card bg (#1a1517), border (#4a3540), muted text (#9a8588), heading text (#e8dde0)
- **Visual direction**: Align with m3th1ld3.art while maintaining own identity — warm, editorial, gallery-like

## User Preferences
- Visual style should match m3th1ld3.art (the artist's website) while having its own identity
- Keep existing structure and functionality
- User will provide updated text content separately
