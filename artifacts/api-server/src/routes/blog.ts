import { Router, type IRouter } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { desc, eq, and } from "drizzle-orm";
import { chatJson } from "../lib/ai";

const router: IRouter = Router();

const TOPICS_EN = [
  "10 daily habits to lower blood pressure naturally",
  "Understanding common drug interactions you should know",
  "How to read your blood test results: a simple guide",
  "Recognizing the early signs of diabetes",
  "Mental health and physical wellness: the connection",
  "Sleep quality and its impact on immunity",
  "Hydration myths debunked by science",
  "Heart-healthy foods backed by research",
];
const TOPICS_AR = [
  "10 عادات يومية لخفض ضغط الدم بشكل طبيعي",
  "فهم تفاعلات الأدوية الشائعة التي يجب معرفتها",
  "كيف تقرأ نتائج تحليل الدم: دليل مبسط",
  "التعرف على العلامات المبكرة لمرض السكري",
  "الصحة النفسية والعافية الجسدية: العلاقة بينهما",
  "جودة النوم وأثرها على المناعة",
  "خرافات شائعة عن شرب الماء يفندها العلم",
  "أطعمة صحية للقلب مدعومة بالأبحاث",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

type GeneratedArticle = {
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  tags: string[];
};

async function generateArticle(language: "en" | "ar"): Promise<void> {
  const topics = language === "ar" ? TOPICS_AR : TOPICS_EN;
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const langName = language === "ar" ? "Arabic" : "English";

  const article = await chatJson<GeneratedArticle>(
    `You are a medical content writer. Always respond in ${langName}. Output strict JSON only.`,
    `Write a comprehensive, evidence-informed health blog article in ${langName} about: "${topic}".
Return JSON with these fields:
- title: string (engaging title, max 80 chars)
- excerpt: string (2-3 sentence summary, max 200 chars)
- content: string (full article in markdown, 600-900 words, with ## headings)
- metaDescription: string (SEO meta description, max 160 chars)
- tags: string[] (4-6 relevant tags)

Always include a disclaimer at the end that this is educational content, not medical advice.`,
  );

  const baseSlug = slugify(article.title);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  await db.insert(blogPostsTable).values({
    slug,
    language,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    metaDescription: article.metaDescription,
    tags: article.tags ?? [],
  });
}

router.get("/blog", async (req, res) => {
  const lang = (req.query["lang"] as string) || "en";
  const posts = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.language, lang))
    .orderBy(desc(blogPostsTable.createdAt))
    .limit(50);
  return res.json({ posts });
});

router.get("/blog/:slug", async (req, res) => {
  const slug = req.params.slug;
  const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, slug));
  if (!post) return res.status(404).json({ error: "Not found" });
  return res.json({ post });
});

router.post("/blog/generate", async (req, res) => {
  const language = req.body?.language === "ar" ? "ar" : "en";
  try {
    await generateArticle(language);
    return res.json({ success: true });
  } catch (err) {
    console.error("Blog generation failed", err);
    return res.status(500).json({ error: "Generation failed" });
  }
});

export async function ensureSeedBlog(): Promise<void> {
  const [enCount] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.language, "en"))
    .limit(1);
  const [arCount] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.language, "ar"))
    .limit(1);

  try {
    if (!enCount) await generateArticle("en");
    if (!arCount) await generateArticle("ar");
  } catch (err) {
    console.warn("Initial blog seed failed (will retry next cron):", err);
  }
}

export function startBlogCron(): void {
  // Skip interval-based cron in serverless environments (Vercel, AWS Lambda).
  // For Vercel, configure /api/cron/blog as a Vercel Cron job in vercel.json.
  if (process.env["VERCEL"] || process.env["AWS_LAMBDA_FUNCTION_NAME"]) {
    return;
  }
  const ONE_DAY = 24 * 60 * 60 * 1000;
  setInterval(async () => {
    try {
      await generateArticle("en");
      await generateArticle("ar");
      console.log("[blog-cron] Generated daily articles");
    } catch (err) {
      console.error("[blog-cron] failed:", err);
    }
  }, ONE_DAY);
}

// Cron endpoint for Vercel Cron Jobs (POST /api/cron/blog).
router.post("/cron/blog", async (req, res) => {
  // Vercel adds Authorization: Bearer <CRON_SECRET> when calling cron endpoints.
  const auth = req.headers.authorization;
  if (process.env["CRON_SECRET"] && auth !== `Bearer ${process.env["CRON_SECRET"]}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await generateArticle("en");
    await generateArticle("ar");
    res.json({ ok: true, generated: 2 });
  } catch (err) {
    console.error("[cron/blog] failed:", err);
    res.status(500).json({ error: "Generation failed" });
  }
});

export default router;
