import { relations } from "drizzle-orm";
import { text, integer } from "drizzle-orm/pg-core";
import { pgTable } from "../utils/pgTableCreator";
import { productVariants } from "./productVariants";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const sizes = pgTable("size", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
  displayOrder: integer("display_order"),
});

export const sizeRelations = relations(sizes, ({ many }) => ({
  productVariants: many(productVariants),
}));

export type Size = typeof sizes.$inferSelect;
export type NewSize = typeof sizes.$inferInsert;
export type UpdatedSize = Partial<Omit<NewSize, "id">>;
export type SizeId = Size["id"];

export const sizeSelectSchema = createSelectSchema(sizes);
export const sizeInsertSchema = createInsertSchema(sizes);
export const sizeUpdateSchema = createUpdateSchema(sizes);
