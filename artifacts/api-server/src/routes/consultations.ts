import { Router, type IRouter } from "express";
import { db, consultationsTable, type ChatMessage } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import {
  CreateConsultationBody,
  PostConsultationMessageBody,
} from "@workspace/api-zod";
import { chatText } from "../lib/ai";

const router: IRouter = Router();

function systemPrompt(language: "en" | "ar" | "fr" | "es" | "zh" | "hi"): string {
  const langMap: Record<string, string> = { en: "English", ar: "Arabic", fr: "French", es: "Spanish", zh: "Chinese", hi: "Hindi" };
  const lang = langMap[language] || "English";
  return `You are MediAI, a helpful, careful medical AI assistant. Always respond in ${lang}. Provide educational health information in clear, simple language. Always remind the user that you are not a doctor and they should consult qualified healthcare professionals for medical decisions. Be warm, concise, and structured (use short paragraphs or bullet points when helpful). If the question hints at an emergency, urge them to seek immediate care.`;
}

router.get("/consultations", async (_req, res) => {
  const rows = await db
    .select()
    .from(consultationsTable)
    .orderBy(desc(consultationsTable.updatedAt))
    .limit(50);
  return res.json(rows.map(serialize));
});

router.get("/consultations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [row] = await db
    .select()
    .from(consultationsTable)
    .where(eq(consultationsTable.id, id));
  if (!row) res.status(404).json({ error: "Not found" });
  return res.json(serialize(row));
});

router.post("/consultations", async (req, res) => {
  const parsed = CreateConsultationBody.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.message });
  const { message, language } = parsed.data;

  const userMsg: ChatMessage = {
    role: "user",
    content: message,
    createdAt: new Date().toISOString(),
  };

  const reply = await chatText(systemPrompt(language), [
    { role: "user", content: message },
  ]);

  const assistantMsg: ChatMessage = {
    role: "assistant",
    content: reply,
    createdAt: new Date().toISOString(),
  };

  const title = message.length > 60 ? message.slice(0, 60) + "…" : message;

  const [row] = await db
    .insert(consultationsTable)
    .values({ title, messages: [userMsg, assistantMsg] })
    .returning();
  return res.json(serialize(row!));
});

router.post("/consultations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const parsed = PostConsultationMessageBody.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.message });
  const { message, language } = parsed.data;

  const [existing] = await db
    .select()
    .from(consultationsTable)
    .where(eq(consultationsTable.id, id));
  if (!existing) res.status(404).json({ error: "Not found" });

  const history: ChatMessage[] = existing.messages ?? [];

  const userMsg: ChatMessage = {
    role: "user",
    content: message,
    createdAt: new Date().toISOString(),
  };

  const reply = await chatText(
    systemPrompt(language),
    [...history, userMsg].map((m) => ({ role: m.role, content: m.content })),
  );

  const assistantMsg: ChatMessage = {
    role: "assistant",
    content: reply,
    createdAt: new Date().toISOString(),
  };

  const newMessages = [...history, userMsg, assistantMsg];
  const [updated] = await db
    .update(consultationsTable)
    .set({ messages: newMessages, updatedAt: new Date() })
    .where(eq(consultationsTable.id, id))
    .returning();
  return res.json(serialize(updated!));
});

function serialize(r: typeof consultationsTable.$inferSelect) {
  return {
    id: r.id,
    title: r.title,
    messages: r.messages ?? [],
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export default router;
