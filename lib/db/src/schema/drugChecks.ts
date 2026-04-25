import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export type DrugInteraction = {
  drugA: string;
  drugB: string;
  description: string;
  severity: "low" | "moderate" | "high";
};

export const drugChecksTable = pgTable("drug_checks", {
  id: serial("id").primaryKey(),
  drugs: jsonb("drugs").$type<string[]>().notNull(),
  analysis: text("analysis").notNull(),
  riskLevel: text("risk_level").notNull(),
  interactions: jsonb("interactions").$type<DrugInteraction[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type DrugCheckRow = typeof drugChecksTable.$inferSelect;
