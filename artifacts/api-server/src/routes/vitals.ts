import { Router, type IRouter } from "express";
import { db, vitalsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { CreateVitalBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/vitals", async (_req, res) => {
  const rows = await db
    .select()
    .from(vitalsTable)
    .orderBy(desc(vitalsTable.createdAt))
    .limit(100);
  return res.json(rows.map(serialize));
});

router.get("/vitals/latest", async (_req, res) => {
  const [row] = await db
    .select()
    .from(vitalsTable)
    .orderBy(desc(vitalsTable.createdAt))
    .limit(1);
  return res.json(row ? serialize(row) : null);
});

router.post("/vitals", async (req, res) => {
  const parsed = CreateVitalBody.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.message });
  const [row] = await db
    .insert(vitalsTable)
    .values(parsed.data)
    .returning();
  return res.json(serialize(row!));
});

function serialize(r: typeof vitalsTable.$inferSelect) {
  return {
    id: r.id,
    heartRate: r.heartRate,
    systolic: r.systolic,
    diastolic: r.diastolic,
    temperature: r.temperature,
    oxygenSaturation: r.oxygenSaturation,
    bloodSugar: r.bloodSugar,
    weight: r.weight,
    notes: r.notes,
    createdAt: r.createdAt.toISOString(),
  };
}

export default router;
