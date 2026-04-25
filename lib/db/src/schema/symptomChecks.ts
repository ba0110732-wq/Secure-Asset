import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const symptomChecksTable = pgTable("symptom_checks", {
  id: serial("id").primaryKey(),
  symptoms: text("symptoms").notNull(),
  analysis: text("analysis").notNull(),
  severity: text("severity").notNull(),
  recommendations: jsonb("recommendations").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SymptomCheckRow = typeof symptomChecksTable.$inferSelect;
