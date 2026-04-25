import { Router, type IRouter } from "express";
import {
  db,
  symptomChecksTable,
  drugChecksTable,
  consultationsTable,
  vitalsTable,
} from "@workspace/db";
import { desc, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res) => {
  const [s] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(symptomChecksTable);
  const [d] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(drugChecksTable);
  const [c] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(consultationsTable);
  const [v] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(vitalsTable);
  const [latest] = await db
    .select()
    .from(vitalsTable)
    .orderBy(desc(vitalsTable.createdAt))
    .limit(1);

  res.json({
    consultations: c?.c ?? 0,
    symptomChecks: s?.c ?? 0,
    drugChecks: d?.c ?? 0,
    vitalRecords: v?.c ?? 0,
    lastVitalAt: latest ? latest.createdAt.toISOString() : null,
  });
});

router.get("/dashboard/activity", async (_req, res) => {
  const symptoms = await db
    .select()
    .from(symptomChecksTable)
    .orderBy(desc(symptomChecksTable.createdAt))
    .limit(10);
  const drugs = await db
    .select()
    .from(drugChecksTable)
    .orderBy(desc(drugChecksTable.createdAt))
    .limit(10);
  const consults = await db
    .select()
    .from(consultationsTable)
    .orderBy(desc(consultationsTable.updatedAt))
    .limit(10);
  const vitals = await db
    .select()
    .from(vitalsTable)
    .orderBy(desc(vitalsTable.createdAt))
    .limit(10);

  type Item = {
    id: string;
    kind: "symptom" | "drug" | "consultation" | "vital";
    title: string;
    subtitle: string;
    severity: "low" | "medium" | "high" | null;
    createdAt: string;
  };

  const items: Item[] = [
    ...symptoms.map((r) => ({
      id: `symptom-${r.id}`,
      kind: "symptom" as const,
      title: "Symptom Analysis",
      subtitle: r.symptoms.slice(0, 80),
      severity: r.severity as "low" | "medium" | "high",
      createdAt: r.createdAt.toISOString(),
    })),
    ...drugs.map((r) => ({
      id: `drug-${r.id}`,
      kind: "drug" as const,
      title: "Drug Interaction Check",
      subtitle: `Checked: ${(r.drugs ?? []).join(", ")}`,
      severity: null,
      createdAt: r.createdAt.toISOString(),
    })),
    ...consults.map((r) => ({
      id: `consultation-${r.id}`,
      kind: "consultation" as const,
      title: r.title,
      subtitle: `${(r.messages ?? []).length} messages — active`,
      severity: null,
      createdAt: r.updatedAt.toISOString(),
    })),
    ...vitals.map((r) => ({
      id: `vital-${r.id}`,
      kind: "vital" as const,
      title: "Vital Signs Recorded",
      subtitle: r.heartRate ? `HR: ${r.heartRate}bpm` : "Vitals updated",
      severity: null,
      createdAt: r.createdAt.toISOString(),
    })),
  ];

  items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  res.json(items.slice(0, 20));
});

const TIPS = [
  {
    tip: "Aim for 150 minutes of moderate aerobic exercise per week, per WHO guidelines.",
    tipAr: "استهدف 150 دقيقة من التمارين الهوائية المعتدلة أسبوعياً وفق توصيات منظمة الصحة العالمية.",
  },
  {
    tip: "Drink at least 6-8 glasses of water daily to support kidney function and overall hydration.",
    tipAr: "اشرب 6-8 أكواب من الماء يومياً على الأقل لدعم وظائف الكلى والترطيب العام.",
  },
  {
    tip: "Adults need 7-9 hours of sleep per night for optimal cognitive and immune function.",
    tipAr: "يحتاج البالغون من 7-9 ساعات من النوم كل ليلة لأداء معرفي ومناعي مثالي.",
  },
  {
    tip: "Limit added sugars to less than 10% of daily calorie intake.",
    tipAr: "قلل من السكريات المضافة إلى أقل من 10% من السعرات اليومية.",
  },
  {
    tip: "Take a 5-minute walk every hour you sit to reduce cardiovascular risk.",
    tipAr: "خذ استراحة مشي 5 دقائق كل ساعة جلوس لتقليل مخاطر القلب والأوعية الدموية.",
  },
  {
    tip: "Wash your hands for at least 20 seconds to effectively prevent infection spread.",
    tipAr: "اغسل يديك لمدة 20 ثانية على الأقل للوقاية الفعالة من انتشار العدوى.",
  },
];

router.get("/dashboard/health-tip", (_req, res) => {
  const day = Math.floor(Date.now() / 86400000);
  const tip = TIPS[day % TIPS.length]!;
  res.json(tip);
});

export default router;
