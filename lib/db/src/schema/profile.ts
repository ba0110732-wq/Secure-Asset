import { pgTable, serial, integer, real, text } from "drizzle-orm/pg-core";

export const profileTable = pgTable("profile", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  age: integer("age"),
  gender: text("gender"),
  height: real("height"),
  weight: real("weight"),
  bloodType: text("blood_type"),
  allergies: text("allergies"),
  chronicConditions: text("chronic_conditions"),
  currentMedications: text("current_medications"),
});

export type ProfileRow = typeof profileTable.$inferSelect;
