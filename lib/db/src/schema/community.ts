import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const communityPostsTable = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  authorName: varchar("author_name", { length: 100 }).notNull().default("Anonymous"),
  language: varchar("language", { length: 8 }).notNull().default("en"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  replyCount: integer("reply_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const communityRepliesTable = pgTable("community_replies", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => communityPostsTable.id, { onDelete: "cascade" }),
  authorName: varchar("author_name", { length: 100 }).notNull().default("Anonymous"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type CommunityPost = typeof communityPostsTable.$inferSelect;
export type NewCommunityPost = typeof communityPostsTable.$inferInsert;
export type CommunityReply = typeof communityRepliesTable.$inferSelect;
export type NewCommunityReply = typeof communityRepliesTable.$inferInsert;
