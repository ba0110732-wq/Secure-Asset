# MediAI — AI-Powered Health Intelligence Platform

## Overview

**MediAI** is a single integrated, AI-powered personal health platform deployable to Vercel as one project. It is the entire site — there is no separate "portfolio" wrapper. Eng. Abdulrazzaq Najib Al-Najjar (المهندس عبدالرزاق نجيب النجار) is credited as the engineer/creator.

## Routes

- `/` — Marketing landing page (medical-themed hero, 6 feature cards, trust strip, CTA, footer). No sidebar.
- `/dashboard` — User dashboard (stats, quick actions, recent activity)
- `/symptoms` — AI Symptom Checker
- `/drugs` — Drug Interaction Analyzer
- `/consultations` — AI Health Consultations (and `/consultations/:id`)
- `/vitals` — Vital Signs Tracker
- `/profile` — Personal Health Profile
- `/blog` — AI-curated health articles (and `/blog/:slug`)
- `/community` — Community forum (and `/community/:id`)
- `/account` — User account
- `/pricing` — Plans & pricing
- `/privacy` — Privacy policy
- `/terms` — Terms of service

All app routes (everything except `/`) are wrapped in `MediAILayout` which provides the medical sidebar.

## Stack

- **Monorepo**: pnpm workspaces
- **Frontend**: React 19 + Vite 7 + TypeScript + Tailwind 4 + Framer Motion + wouter
- **Backend**: Express 5 (Node in dev, Vercel Serverless Function in prod)
- **Database**: PostgreSQL via Drizzle ORM (DATABASE_URL)
- **AI**: OpenAI via Replit AI Integrations proxy
- **Languages**: 6 (English, Arabic/RTL, French, Spanish, Chinese, Hindi)
- **PWA**: manifest + service worker
- **SEO**: hreflang, JSON-LD WebApplication schema, dynamic `/api/sitemap.xml`

## Structure

- `artifacts/engineer-portal/` — frontend
  - `src/pages/landing.tsx` — landing page (root `/`)
  - `src/pages/medai-app/` — 15 app pages
  - `src/components/medai/Layout.tsx` — sidebar layout
  - `src/lib/i18n.tsx` — 6-language translations
- `artifacts/api-server/` — Express backend
  - `src/routes/` — blog, community, consultations, dashboard, drugs, health, profile, sitemap, symptoms, vitals
  - `src/jobs/blog-cron.ts` — daily AI blog generation (skips setInterval on Vercel; uses `/api/cron/blog` cron endpoint instead)
- `api/index.ts` — Vercel serverless entry (re-exports Express app)
- `vercel.json` — build, rewrites, daily cron at 06:00 UTC, 60s function timeout

## Vercel Deploy

1. Import repo on Vercel
2. Set env vars: `DATABASE_URL`, `SESSION_SECRET`, `OPENAI_API_KEY` (or Replit AI proxy keys), `CRON_SECRET`
3. Deploy — `vercel.json` handles build, SPA fallback, API routing, and the daily blog cron

See `DEPLOY.md` for full instructions.

## Brand Identity

- Product name: **MediAI**
- Subtitle: "Health Intelligence Platform"
- Engineer credit (footer/sidebar only): "Engineered by Eng. Abdulrazzaq Al-Najjar"
- Color system: teal/emerald gradients (medical), amber accents
- Dark theme by default
