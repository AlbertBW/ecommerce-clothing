import { relations } from "drizzle-orm";
import { text, integer } from "drizzle-orm/pg-core";
import { pgTable } from "../utils/pgTableCreator";
import { colours } from "./colours";
import { products } from "./products";
import { sizes } from "./sizes";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const productVariants = pgTable("product_variants", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  colourId: integer("colour_id").references(() => colours.id),
  sizeId: integer("size_id").references(() => sizes.id),
  stock: integer("stock").notNull(),
  price: integer().notNull(),
  sku: text("sku").unique().notNull(),
});

export const productVariantRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    colour: one(colours, {
      fields: [productVariants.colourId],
      references: [colours.id],
    }),
    size: one(sizes, {
      fields: [productVariants.sizeId],
      references: [sizes.id],
    }),
  })
);

export type SelectProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = typeof productVariants.$inferInsert;
export type UpdateProductVariant = Partial<Omit<InsertProductVariant, "id">>;

export const productVariantSelectSchema = createSelectSchema(productVariants);
export const productVariantInsertSchema = createInsertSchema(productVariants);
export const productVariantUpdateSchema = createUpdateSchema(productVariants);
