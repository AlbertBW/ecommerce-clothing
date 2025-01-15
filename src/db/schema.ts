import { relations } from "drizzle-orm";
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
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";

const pgTable = pgTableCreator((name) => `clothing_${name}`);

export const roles = pgEnum("roles", ["admin", "customer"]);
export const genderEnum = pgEnum("gender", ["men", "women", "unisex"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: roles("role").default("customer"),
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
  productRating: one(productRatings),
  productVariants: many(productVariants),
}));

export const colours = pgTable("colour", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
});

export const colourRelations = relations(colours, ({ many }) => ({
  productVariants: many(productVariants),
}));

export const sizes = pgTable("size", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
  displayOrder: integer("display_order"),
});

export const sizeRelations = relations(sizes, ({ many }) => ({
  productVariants: many(productVariants),
}));

export const productVariants = pgTable("product_variants", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  colourId: integer("colour_id").references(() => colours.id, {
    onDelete: "set null",
  }),
  sizeId: integer("size_id").references(() => sizes.id, {
    onDelete: "set null",
  }),
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

export const productRatingRelations = relations(productRatings, ({ one }) => ({
  product: one(products, {
    fields: [productRatings.productId],
    references: [products.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UpdatedUser = Partial<Omit<NewUser, "id">>;
export type UserId = User["id"];

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type UpdatedAccount = Partial<Omit<NewAccount, "id">>;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type UpdatedSession = Partial<Omit<NewSession, "id">>;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UpdatedCategory = Partial<Omit<NewCategory, "id">>;
export type CategoryId = Category["id"];

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type UpdatedProduct = Partial<Omit<NewProduct, "id">>;
export type ProductId = Product["id"];

export type ProductDetails = Product & {
  productVariants: (ProductVariant & {
    colour: Colour | null;
    size: Size | null;
  })[];
};

export type Colour = typeof colours.$inferSelect;
export type NewColour = typeof colours.$inferInsert;
export type UpdatedColour = Partial<Omit<NewColour, "id">>;

export type Size = typeof sizes.$inferSelect;
export type NewSize = typeof sizes.$inferInsert;
export type UpdatedSize = Partial<Omit<NewSize, "id">>;
export type SizeId = Size["id"];

export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;
export type UpdatedProductVariant = Partial<Omit<NewProductVariant, "id">>;
export type ProductVariantId = ProductVariant["id"];

export type ProductRating = typeof productRatings.$inferSelect;
export type NewProductRating = typeof productRatings.$inferInsert;
export type UpdatedProductRating = Partial<Omit<NewProductRating, "id">>;

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users);
export const userUpdateSchema = createUpdateSchema(users);
export const accountSelectSchema = createSelectSchema(accounts);
export const accountInsertSchema = createInsertSchema(accounts);
export const accountUpdateSchema = createUpdateSchema(accounts);
export const sessionSelectSchema = createSelectSchema(sessions);
export const sessionInsertSchema = createInsertSchema(sessions);
export const sessionUpdateSchema = createUpdateSchema(sessions);
export const categorySelectSchema = createSelectSchema(categories);
export const categoryInsertSchema = createInsertSchema(categories);
export const categoryUpdateSchema = createUpdateSchema(categories);
export const productSelectSchema = createSelectSchema(products);
export const productInsertSchema = createInsertSchema(products);
export const productUpdateSchema = createUpdateSchema(products);
export const colourSelectSchema = createSelectSchema(colours);
export const colourInsertSchema = createInsertSchema(colours);
export const colourUpdateSchema = createUpdateSchema(colours);
export const sizeSelectSchema = createSelectSchema(sizes);
export const sizeInsertSchema = createInsertSchema(sizes);
export const sizeUpdateSchema = createUpdateSchema(sizes);
export const productVariantSelectSchema = createSelectSchema(productVariants);
export const productVariantInsertSchema = createInsertSchema(productVariants);
export const productVariantUpdateSchema = createUpdateSchema(productVariants);
export const productRatingSelectSchema = createSelectSchema(productRatings);
export const productRatingInsertSchema = createInsertSchema(productRatings);
export const productRatingUpdateSchema = createUpdateSchema(productRatings);
