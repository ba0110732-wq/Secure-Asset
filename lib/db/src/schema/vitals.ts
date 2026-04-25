import { pgTable, serial, integer, real, text, timestamp } from "drizzle-orm/pg-core";

export const vitalsTable = pgTable("vitals", {
  id: serial("id").primaryKey(),
  heartRate: integer("heart_rate"),
  systolic: integer("systolic"),
  diastolic: integer("diastolic"),
  temperature: real("temperature"),
  oxygenSaturation: integer("oxygen_saturation"),
  bloodSugar: real("blood_sugar"),
  weight: real("weight"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type VitalRow = typeof vitalsTable.$inferSelect;
