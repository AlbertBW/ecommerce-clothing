import { integer, text } from "drizzle-orm/pg-core";
import { pgTable } from "../utils/pg-table-creator";
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

export type Colour = typeof colours.$inferSelect;
export type NewColour = typeof colours.$inferInsert;
export type UpdatedColour = Partial<Omit<NewColour, "id">>;

export const colourSelectSchema = createSelectSchema(colours);
export const colourInsertSchema = createInsertSchema(colours);
export const colourUpdateSchema = createUpdateSchema(colours);
