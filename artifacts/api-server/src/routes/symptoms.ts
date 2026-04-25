import { Router, type IRouter } from "express";
import { db, symptomChecksTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { CreateSymptomCheckBody } from "@workspace/api-zod";
import { chatJson } from "../lib/ai";

const router: IRouter = Router();

router.get("/symptoms", async (_req, res) => {
  const rows = await db
    .select()
    .from(symptomChecksTable)
    .orderBy(desc(symptomChecksTable.createdAt))
    .limit(50);
  return res.json(rows.map(serialize));
});

router.get("/symptoms/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [row] = await db
    .select()
    .from(symptomChecksTable)
    .where(eq(symptomChecksTable.id, id));
  if (!row) res.status(404).json({ error: "Not found" });
  return res.json(serialize(row));
});

router.post("/symptoms", async (req, res) => {
  const parsed = CreateSymptomCheckBody.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.message });
  const { symptoms, language } = parsed.data;
  const lang = language === "ar" ? "Arabic" : "English";

  const sys = `You are a careful medical AI assistant. Always respond in ${lang}. Analyze the symptoms the user reports. Return ONLY a JSON object with this exact shape:
{
  "analysis": "string - 2-4 sentences explaining possible causes in plain language",
  "severity": "low" | "medium" | "high",
  "recommendations": ["string", "string", ...] (3-5 short actionable items)
}
Always remind the user (within analysis) that this is not a diagnosis. Be conservative — if symptoms suggest emergency, mark severity high.`;

  const ai = await chatJson<{
    analysis: string;
    severity: "low" | "medium" | "high";
    recommendations: string[];
  }>(sys, symptoms);

  const [row] = await db
    .insert(symptomChecksTable)
    .values({
      symptoms,
      analysis: ai.analysis,
      severity: ai.severity,
      recommendations: ai.recommendations ?? [],
    })
    .returning();
  return res.json(serialize(row!));
});

function serialize(r: typeof symptomChecksTable.$inferSelect) {
  return {
    id: r.id,
    symptoms: r.symptoms,
    analysis: r.analysis,
    severity: r.severity,
    recommendations: r.recommendations ?? [],
    createdAt: r.createdAt.toISOString(),
  };
}

export default router;
