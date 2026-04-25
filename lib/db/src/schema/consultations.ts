import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export const consultationsTable = pgTable("consultations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  messages: jsonb("messages").$type<ChatMessage[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ConsultationRow = typeof consultationsTable.$inferSelect;
