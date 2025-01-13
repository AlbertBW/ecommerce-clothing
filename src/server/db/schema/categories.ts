import { AnyPgColumn, integer, text } from "drizzle-orm/pg-core";
import { pgTable } from "../utils/pgTableCreator";
import { relations } from "drizzle-orm";
import { products } from "../schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const categories = pgTable("category", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
  // e.g. "Clothing > T-Shirts"
  parentId: integer("parent_id").references((): AnyPgColumn => categories.id, {
    onDelete: "set null",
  }),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export const categorySelectSchema = createSelectSchema(categories);
export const categoryInsertSchema = createInsertSchema(categories);
export const categoryUpdateSchema = createUpdateSchema(categories);
