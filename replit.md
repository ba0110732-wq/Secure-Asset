# Eng. Abdulrazzaq Najib Al-Najjar — Portfolio

## Overview

A single integrated portfolio + showcase website for **Eng. Abdulrazzaq Najib Al-Najjar (المهندس عبدالرزاق نجيب النجار)**. Built as a single deployable project with no backend split — designed for one-click deployment to Vercel.

## Stack

- **Monorepo**: pnpm workspaces
- **Frontend**: React 19 + Vite + TypeScript + Tailwind 4 + Framer Motion
- **Routing**: wouter
- **Bilingual**: English + Arabic (RTL)
- **Deploy target**: Vercel (single project) — see `DEPLOY.md`

## Structure

- `artifacts/engineer-portal/` — the portfolio website (the only artifact users see)
- `artifacts/api-server/` — scaffolded API server (not used by the portfolio; safe to ignore for deployment)
- `artifacts/mockup-sandbox/` — design sandbox (not used by the portfolio)

The Vercel build only ships `artifacts/engineer-portal` — see `vercel.json`.

## Key Commands

- `pnpm --filter @workspace/engineer-portal run dev` — run the portfolio locally
- `pnpm --filter @workspace/engineer-portal run build` — build for production
