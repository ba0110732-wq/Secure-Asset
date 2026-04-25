# Eng. Abdulrazzaq Najib Al-Najjar — Integrated Portfolio + MediAI Platform

## Overview

A **single integrated project** combining:
1. **Portfolio website** for Eng. Abdulrazzaq Najib Al-Najjar (المهندس عبدالرزاق نجيب النجار) at `/`.
2. **MediAI** — a 6-language AI-powered health intelligence dashboard at `/app/*` (symptom checker, drug interactions, AI consultations, vitals tracker, health profile, AI-curated blog, community forum, account & pricing pages).

Designed for **one-click deployment to Vercel** as a single project (frontend static + serverless Express backend).

## Stack

- **Monorepo**: pnpm workspaces
- **Frontend**: React 19 + Vite 7 + TypeScript + Tailwind 4 + Framer Motion + wouter
- **Backend**: Express 5 (runs as Node server in dev, as Vercel Serverless Function in prod)
- **Database**: PostgreSQL via Drizzle ORM (DATABASE_URL)
- **AI**: OpenAI through Replit AI Integrations proxy (gpt-5.4)
- **Languages**: 6 (English, Arabic/RTL, French, Spanish, Chinese, Hindi)
- **PWA**: manifest + service worker (offline support)
- **SEO**: hreflang tags, JSON-LD person schema, dynamic `/api/sitemap.xml`

## Structure

- `artifacts/engineer-portal/` — frontend (portfolio + MediAI app)
  - `src/pages/` — portfolio pages
  - `src/pages/medai/` — 16 MediAI pages
  - `src/components/medai/Layout.tsx` — sidebar nav for `/app/*`
  - `src/lib/i18n.tsx` — unified 6-language translations
- `artifacts/api-server/` — Express backend
  - `src/routes/` — 10 route modules (blog, community, consultations, dashboard, drugs, health, profile, sitemap, symptoms, vitals)
  - `src/lib/ai.ts` — OpenAI proxy wrapper (chat / chatJson)
- `lib/db/` — Drizzle schemas (7 tables)
- `lib/api-spec/`, `lib/api-zod/`, `lib/api-client-react/` — OpenAPI codegen
- `api/index.ts` — Vercel serverless entry (re-exports the Express app)
- `vercel.json` — single-project deploy config (build, rewrites, cron, function settings)
- `DEPLOY.md` — full Vercel deployment instructions

## Key Routes

| Path | Description |
|------|-------------|
| `/` | Portfolio home (hero, projects, skills) |
| `/app` | MediAI dashboard |
| `/app/symptoms` | AI symptom checker |
| `/app/drugs` | Drug interactions checker |
| `/app/consultations` | AI consultations list |
| `/app/vitals` | Vital signs tracker |
| `/app/profile` | Health profile |
| `/app/blog` | AI-curated daily articles |
| `/app/community` | Community forum |
| `/app/account` `/app/pricing` `/app/privacy` `/app/terms` | Account & legal |
| `/api/*` | Express backend (symptoms, drugs, consultations, blog, sitemap, etc.) |

## Key Commands

- `pnpm --filter @workspace/engineer-portal run dev` — frontend dev server
- `pnpm --filter @workspace/api-server run dev` — backend dev server
- `pnpm --filter @workspace/db run push` — apply DB schema (uses DATABASE_URL)
- `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/engineer-portal build` — production build

## Required Environment Variables

| Variable | Used in |
|----------|---------|
| `DATABASE_URL` | Postgres connection |
| `AI_INTEGRATIONS_OPENAI_BASE_URL` | OpenAI proxy URL |
| `AI_INTEGRATIONS_OPENAI_API_KEY` | OpenAI proxy key |
| `CRON_SECRET` | (Vercel only) protects `/api/cron/blog` daily job |
| `SESSION_SECRET` | Express session middleware |
| `PORT`, `BASE_PATH` | Required by dev server / build |

## Deployment

See **DEPLOY.md**. Summary:
1. Push repo to GitHub.
2. Import on Vercel (auto-detects `vercel.json`).
3. Add env vars (DATABASE_URL, OpenAI keys, CRON_SECRET).
4. Run `pnpm --filter @workspace/db run push` once against the production DB.

The `vercel.json` configures: SPA rewrites for the frontend, `/api/*` rewrites to the serverless function, daily cron at 06:00 UTC for AI blog generation, and 60-second function timeout.

## Notes

- The blog cron auto-skips `setInterval` when `VERCEL` env var is set; Vercel triggers `/api/cron/blog` instead.
- Service worker registers in production only.
- All MediAI navigation is prefixed `/app/` and wrapped in the `MediAILayout` sidebar shell.
- Header includes 6-language dropdown and "Launch MediAI App" CTA.
