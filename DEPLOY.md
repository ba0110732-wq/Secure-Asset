# Deploy MediAI — One Project, One Click

This entire project (portfolio site + MediAI app + AI backend + database) is **one integrated project** that deploys to Vercel as a single unit.

## Quick Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository.
3. **Do not change any build settings** — `vercel.json` configures everything automatically.
4. Click **Deploy**.

### Step 3 — Add Environment Variables

In your Vercel project, go to **Settings → Environment Variables** and add the following.

| Variable | Source / How to get it |
|----------|------------------------|
| `DATABASE_URL` | A serverless Postgres connection string. Easiest: create a free database on [neon.tech](https://neon.tech) — copy the connection string. |
| `AI_INTEGRATIONS_OPENAI_BASE_URL` | `https://api.openai.com/v1` |
| `AI_INTEGRATIONS_OPENAI_API_KEY` | Your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys) |
| `CRON_SECRET` | Any random string — used to authenticate the daily blog-generation cron job |

After adding variables, click **Redeploy** on the Deployments tab so the new env vars take effect.

### Step 4 — Initialize the Database

After your first deploy, run the database migration locally one time to create all tables in your Neon DB:

```bash
DATABASE_URL="<your-neon-connection-string>" pnpm --filter @workspace/db run push
```

That's it — your site is live.

---

## What You Get After Deploy

- **Public URL** — `https://<your-project>.vercel.app`
- **Free HTTPS** — automatically.
- **Auto-deploys** — every git push redeploys.
- **Serverless API** — all `/api/*` routes scale automatically.
- **Daily AI blog cron** — runs every day at 06:00 UTC (configured in `vercel.json`).
- **PWA** — users can install the app to their phone home screen.
- **Multi-language SEO** — search engines see all 6 languages via `hreflang` tags.

## Custom Domain

Vercel → Project → **Settings → Domains** → add any domain you own (e.g. `al-najjar.dev`). Vercel issues HTTPS automatically.

---

## Alternative — Replit Deployments

Click the green **Publish** button at the top of the Replit workspace. Replit handles infrastructure, secrets, and HTTPS automatically. You'll get a `.replit.app` URL (custom domain optional).

---

## Project Structure

```
artifacts/engineer-portal/   # Frontend (React + Vite) — portfolio + MediAI app
artifacts/api-server/        # Express backend (used both in dev and as Vercel function)
api/index.ts                 # Vercel serverless entry point (re-exports the Express app)
lib/db/                      # Drizzle ORM + PostgreSQL schemas
lib/api-spec/                # OpenAPI contract
lib/api-zod/                 # Generated zod validators
lib/api-client-react/        # Generated React Query hooks
vercel.json                  # Single-project Vercel deployment config
```
