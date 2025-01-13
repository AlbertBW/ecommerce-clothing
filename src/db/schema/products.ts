import { integer, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "../utils/pgTableCreator";
import { genderEnum } from "../utils/enums";
import { relations } from "drizzle-orm";
import { categories } from "./categories";
import { productVariants } from "../schema";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const products = pgTable("product", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  brand: text("brand").notNull(),
  brandSlug: text("brand-slug").notNull(),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  gender: genderEnum("gender").notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
});

export const productRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productVariants: many(productVariants),
}));

export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type UpdateProduct = Partial<Omit<InsertProduct, "id">>;

export const productSelectSchema = createSelectSchema(products);
export const productInsertSchema = createInsertSchema(products);
export const productUpdateSchema = createUpdateSchema(products);
