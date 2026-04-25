import { Router, type IRouter } from "express";
import { db, communityPostsTable, communityRepliesTable } from "@workspace/db";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

const PostSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().min(5).max(5000),
  authorName: z.string().max(100).optional(),
  language: z.enum(["en", "ar", "fr", "es", "zh", "hi"]).default("en"),
});

const ReplySchema = z.object({
  body: z.string().min(2).max(2000),
  authorName: z.string().max(100).optional(),
});

router.get("/community", async (_req, res) => {
  const posts = await db
    .select()
    .from(communityPostsTable)
    .orderBy(desc(communityPostsTable.createdAt))
    .limit(100);
  return res.json({ posts });
});

router.post("/community", async (req, res) => {
  const parsed = PostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
  const data = parsed.data!;
  const [created] = await db
    .insert(communityPostsTable)
    .values({
      title: data.title,
      body: data.body,
      authorName: data.authorName?.trim() || "Anonymous",
      language: data.language,
    })
    .returning();
  return res.json({ post: created });
});

router.get("/community/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });
  const [post] = await db.select().from(communityPostsTable).where(eq(communityPostsTable.id, id));
  if (!post) return res.status(404).json({ error: "Not found" });
  const replies = await db
    .select()
    .from(communityRepliesTable)
    .where(eq(communityRepliesTable.postId, id))
    .orderBy(communityRepliesTable.createdAt);
  return res.json({ post, replies });
});

router.post("/community/:id/replies", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });
  const parsed = ReplySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
  const data = parsed.data!;
  const [reply] = await db
    .insert(communityRepliesTable)
    .values({
      postId: id,
      body: data.body,
      authorName: data.authorName?.trim() || "Anonymous",
    })
    .returning();
  await db
    .update(communityPostsTable)
    .set({ replyCount: sql`${communityPostsTable.replyCount} + 1` })
    .where(eq(communityPostsTable.id, id));
  return res.json({ reply });
});

export default router;
