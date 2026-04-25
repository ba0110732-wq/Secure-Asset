import { Router, type IRouter } from "express";
import { db, profileTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateProfileBody } from "@workspace/api-zod";

const router: IRouter = Router();

async function getOrCreate() {
  const [existing] = await db.select().from(profileTable).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(profileTable).values({}).returning();
  return created!;
}

router.get("/profile", async (_req, res) => {
  const row = await getOrCreate();
  return res.json(serialize(row));
});

router.put("/profile", async (req, res) => {
  const parsed = UpdateProfileBody.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.message });
  const existing = await getOrCreate();
  const [updated] = await db
    .update(profileTable)
    .set(parsed.data)
    .where(eq(profileTable.id, existing.id))
    .returning();
  return res.json(serialize(updated!));
});

function serialize(r: typeof profileTable.$inferSelect) {
  return {
    id: r.id,
    fullName: r.fullName,
    age: r.age,
    gender: r.gender,
    height: r.height,
    weight: r.weight,
    bloodType: r.bloodType,
    allergies: r.allergies,
    chronicConditions: r.chronicConditions,
    currentMedications: r.currentMedications,
  };
}

export default router;
