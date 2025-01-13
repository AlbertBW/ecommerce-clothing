import { integer, numeric } from "drizzle-orm/pg-core";
import { products } from "./products";
import { pgTable } from "../utils/pgTableCreator";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { createInsertSchema } from "drizzle-zod";

export const productRatings = pgTable("product_rating", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  productId: integer("product_id")
    .references(() => products.id, {
      onDelete: "cascade",
    })
    .notNull(),
  rate: numeric("rate", { precision: 2, scale: 1 }).notNull(),
  count: integer("count").notNull(),
});

export type SelectProductRating = typeof productRatings.$inferSelect;
export type InsertProductRating = typeof productRatings.$inferInsert;

export const productRatingSelectSchema = createSelectSchema(productRatings);
export const productRatingInsertSchema = createInsertSchema(productRatings);
export const productRatingUpdateSchema = createUpdateSchema(productRatings);
