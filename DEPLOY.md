# Deploy to Vercel — One Project, One Click

This entire site is a **single integrated project**. Deployment is just two steps.

## Option 1 — Vercel (recommended)

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the GitHub repo.
3. Vercel auto-detects `vercel.json` — click **Deploy**.

That's it. You'll get a public URL like `https://your-name.vercel.app`.

The included `vercel.json` already configures:

- `installCommand` → installs pnpm and dependencies.
- `buildCommand` → builds only the `engineer-portal` artifact.
- `outputDirectory` → `artifacts/engineer-portal/dist`.
- SPA rewrites so client-side routes work.

## Option 2 — Replit Deployments

Use the green **Publish** button at the top of the workspace. Replit handles everything automatically.

## Custom domain

On Vercel → Project → Settings → Domains, add any domain you own. Vercel issues HTTPS automatically.
