import { Router, type IRouter } from "express";
import { db, drugChecksTable, type DrugInteraction } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { CreateDrugCheckBody } from "@workspace/api-zod";
import { chatJson } from "../lib/ai";

const router: IRouter = Router();

router.get("/drugs", async (_req, res) => {
  const rows = await db
    .select()
    .from(drugChecksTable)
    .orderBy(desc(drugChecksTable.createdAt))
    .limit(50);
  return res.json(rows.map(serialize));
});

router.get("/drugs/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [row] = await db
    .select()
    .from(drugChecksTable)
    .where(eq(drugChecksTable.id, id));
  if (!row) res.status(404).json({ error: "Not found" });
  return res.json(serialize(row));
});

router.post("/drugs", async (req, res) => {
  const parsed = CreateDrugCheckBody.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.message });
  const { drugs, language } = parsed.data;
  const lang = language === "ar" ? "Arabic" : "English";

  const sys = `You are a clinical pharmacology AI. Always respond in ${lang}. Analyze drug interactions for the given list. Return ONLY JSON with shape:
{
  "analysis": "1-3 sentence overall summary",
  "riskLevel": "none" | "low" | "moderate" | "high",
  "interactions": [
    { "drugA": "name", "drugB": "name", "description": "1-2 sentences", "severity": "low" | "moderate" | "high" }
  ]
}
If only one drug or no real interactions exist, return interactions: [] and riskLevel: "none". Always remind the user this is not a substitute for a pharmacist within analysis.`;

  const ai = await chatJson<{
    analysis: string;
    riskLevel: "none" | "low" | "moderate" | "high";
    interactions: DrugInteraction[];
  }>(sys, `Drugs: ${drugs.join(", ")}`);

  const [row] = await db
    .insert(drugChecksTable)
    .values({
      drugs,
      analysis: ai.analysis,
      riskLevel: ai.riskLevel,
      interactions: ai.interactions ?? [],
    })
    .returning();
  return res.json(serialize(row!));
});

function serialize(r: typeof drugChecksTable.$inferSelect) {
  return {
    id: r.id,
    drugs: r.drugs,
    analysis: r.analysis,
    riskLevel: r.riskLevel,
    interactions: r.interactions ?? [],
    createdAt: r.createdAt.toISOString(),
  };
}

export default router;
