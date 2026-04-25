import { Router, type IRouter } from "express";
import { db, blogPostsTable } from "@workspace/db";

const router: IRouter = Router();

const STATIC_PATHS = [
  "/",
  "/symptoms",
  "/drugs",
  "/consultations",
  "/vitals",
  "/profile",
  "/pricing",
  "/account",
  "/community",
  "/blog",
  "/privacy",
  "/terms",
];

const LANGS = ["en", "ar", "fr", "es", "zh", "hi"];

router.get("/sitemap.xml", async (req, res) => {
  const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const base = `${proto}://${host}`;

  const posts = await db.select().from(blogPostsTable);

  const urls: string[] = [];

  for (const path of STATIC_PATHS) {
    const url = `${base}${path}`;
    const alts = LANGS.map(
      (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${url}?lang=${l}"/>`,
    ).join("");
    urls.push(`<url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      ${alts}
    </url>`);
  }

  for (const post of posts) {
    const url = `${base}/blog/${post.slug}`;
    urls.push(`<url>
      <loc>${url}</loc>
      <lastmod>${post.createdAt.toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  return res.send(xml);
});

export default router;
