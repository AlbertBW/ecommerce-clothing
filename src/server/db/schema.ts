import {
  boolean,
  timestamp,
  text,
  primaryKey,
  integer,
  pgTableCreator,
  pgEnum,
  numeric,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

const pgTable = pgTableCreator((name) => `clothing_${name}`);

export const roles = pgEnum("roles", ["admin", "customer"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: roles().default("customer"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

export const genderEnum = pgEnum("gender", ["men", "women", "unisex"]);

export const categories = pgTable("category", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
  parentId: integer("parent_id").references((): AnyPgColumn => categories.id, {
    onDelete: "set null",
  }),
});

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

export const colours = pgTable("colour", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
});

export const sizes = pgTable("size", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
  displayOrder: integer("display_order"),
});

export const productVariants = pgTable("product_variants", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  colourId: integer("colour_id").references(() => colours.id),
  sizeId: integer("size_id").references(() => colours.id),
  stock: integer("stock").notNull(),
  price: integer().notNull(),
  sku: text("sku").unique().notNull(),
});

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

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export type SelectColour = typeof colours.$inferSelect;
export type InsertColour = typeof colours.$inferInsert;

export type SelectSize = typeof sizes.$inferSelect;
export type InsertSize = typeof sizes.$inferInsert;

export type SelectProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = typeof productVariants.$inferInsert;

export type SelectProductRating = typeof productRatings.$inferSelect;
export type InsertProductRating = typeof productRatings.$inferInsert;
