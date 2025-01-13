import { integer, text } from "drizzle-orm/pg-core";
import { pgTable } from "../utils/pgTableCreator";
import { relations } from "drizzle-orm";
import { productVariants } from "../schema";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const colours = pgTable("colour", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
});

export const colourRelations = relations(colours, ({ many }) => ({
  productVariants: many(productVariants),
}));

export type SelectColour = typeof colours.$inferSelect;
export type InsertColour = typeof colours.$inferInsert;

export const colourSelectSchema = createSelectSchema(colours);
export const colourInsertSchema = createInsertSchema(colours);
export const colourUpdateSchema = createUpdateSchema(colours);
