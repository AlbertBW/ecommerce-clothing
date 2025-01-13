import { text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "../utils/pgTableCreator";
import { users } from "./users";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const sessions = pgTable("session", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export type SelectSession = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
export type UpdateSession = Partial<Omit<InsertSession, "id">>;

export const sessionSelectSchema = createSelectSchema(sessions);
export const sessionInsertSchema = createInsertSchema(sessions);
export const sessionUpdateSchema = createUpdateSchema(sessions);
