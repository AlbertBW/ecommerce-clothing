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
import { z } from "zod";

const pgTable = pgTableCreator((name) => `ec_${name}`);

export const roles = pgEnum("roles", ["owner", "admin", "customer"]);
export const orderStatus = pgEnum("order_status", [
  "unpaid",
  "paid",
  "fulfilled",
  "cancelled",
  "return requested",
  "returned",
]);
export const orderStatusSchema = z
  .string()
  .optional()
  .transform((val) => val?.replace("-", " ") as typeof val)
  .pipe(
    z
      .enum([
        "unpaid",
        "paid",
        "fulfilled",
        "cancelled",
        "return requested",
        "returned",
      ])
      .optional()
  );

export const collectionEnum = pgEnum("collection", ["men", "women", "unisex"]);
export type Collection = (typeof collectionEnum.enumValues)[number];
export const allCollections = collectionEnum.enumValues;

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

export const userRelations = relations(users, ({ one, many }) => ({
  addresses: many(addresses),
  orders: many(orders),
  wishlists: one(wishlists, {
    fields: [users.id],
    references: [wishlists.userId],
  }),
  carts: one(carts, {
    fields: [users.id],
    references: [carts.userId],
  }),
}));

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
    credentialID: text("credential_id").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
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

export const addresses = pgTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name"),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  county: text("county").notNull(),
  country: text("country").notNull(),
  postcode: text("postcode").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

export const addressesRelations = relations(addresses, ({ many, one }) => ({
  orders: many(orders),
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export const categories = pgTable("category", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  collection: collectionEnum("collection").notNull(),
  displayOrder: integer("display_order"),
  parentId: integer("parent_id").references((): AnyPgColumn => categories.id, {
    onDelete: "set null",
  }),
});

export const categoryRelations = relations(categories, ({ one, many }) => ({
  products: many(products),
  subcategories: many(categories, {
    relationName: "subcategories",
  }),
  parentCategory: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "subcategories",
  }),
}));

export const brands = pgTable("brand", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("brand").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const brandRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

export const products = pgTable("product", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  brandId: integer("brand_id")
    .notNull()
    .references(() => brands.id),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const productRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productRating: one(productRatings),
  productVariants: many(productVariants),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
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
  sku: text("sku").unique().notNull(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  colourId: integer("colour_id").references(() => colours.id, {
    onDelete: "set null",
  }),
  sizeId: integer("size_id").references(() => sizes.id, {
    onDelete: "set null",
  }),
  stock: integer("stock").notNull().default(0),
  sold: integer("sold").notNull().default(0),
  returns: integer("return").notNull().default(0),
  price: integer().notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const productVariantRelations = relations(
  productVariants,
  ({ one, many }) => ({
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
    orderItems: many(orderItems),
    cartItems: many(cartItems),
    wishlistItems: many(wishlistItems),
  })
);

export const productRatings = pgTable("product_rating", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  productId: integer("product_id")
    .references(() => products.id, {
      onDelete: "cascade",
    })
    .notNull(),
  rate: numeric("rate", { precision: 2, scale: 1 }),
  count: integer("count").notNull().default(0),
});

export const productRatingRelations = relations(productRatings, ({ one }) => ({
  product: one(products, {
    fields: [productRatings.productId],
    references: [products.id],
  }),
}));

export const orders = pgTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orderNumber: text("order_number").notNull().unique(),
  paymentIntentId: text("payment_intent_id"),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  email: text("email"),
  status: orderStatus("status"),
  price: integer("price").notNull(),
  shippingMethod: text("shipping_method").notNull(),
  shippingPrice: integer("shipping_price").notNull(),
  deliveryAddressId: text("delivery_address_id")
    .notNull()
    .references(() => addresses.id),
  customerNote: text("customer_note"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const orderRelations = relations(orders, ({ many, one }) => ({
  orderItems: many(orderItems),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  deliveryAddress: one(addresses, {
    fields: [orders.deliveryAddressId],
    references: [addresses.id],
    relationName: "deliveryAddress",
  }),
}));

export const orderItems = pgTable("order_item", {
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id),
  productVariantId: integer("product_variant_id")
    .notNull()
    .references(() => productVariants.id),
  quantity: integer("quantity").notNull(),
  productPrice: integer("price").notNull(),
});

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [orderItems.productVariantId],
    references: [productVariants.id],
  }),
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const carts = pgTable("cart", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
});

export const cartRelations = relations(carts, ({ many, one }) => ({
  cartItems: many(cartItems),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

export const cartItems = pgTable(
  "cart_item",
  {
    cartId: text("cart_id")
      .notNull()
      .references(() => carts.id),
    productVariantId: integer("product_variant_id")
      .notNull()
      .references(() => productVariants.id),
    quantity: integer("quantity").notNull(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({
          name: "cart_item_id",
          columns: [table.cartId, table.productVariantId],
        }),
      },
    ];
  }
);

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [cartItems.productVariantId],
    references: [productVariants.id],
  }),
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
}));

export const wishlists = pgTable("wishlist", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const wishlistRelations = relations(wishlists, ({ many, one }) => ({
  wishlistItems: many(wishlistItems),
  user: one(users, {
    fields: [wishlists.userId],
    references: [users.id],
  }),
}));

export const wishlistItems = pgTable(
  "wishlist_item",
  {
    wishlistId: text("wishlist_id")
      .notNull()
      .references(() => wishlists.id, { onDelete: "cascade" }),
    productVariantId: integer("product_variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),
  },
  (table) => {
    return [
      {
        pk: primaryKey({
          name: "wishlist_item_id",
          columns: [table.wishlistId, table.productVariantId],
        }),
      },
    ];
  }
);

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [wishlistItems.productVariantId],
    references: [productVariants.id],
  }),
  wishlist: one(wishlists, {
    fields: [wishlistItems.wishlistId],
    references: [wishlists.id],
  }),
}));

// Types inferred from Schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UpdatedUser = Partial<Omit<NewUser, "id">>;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type UpdatedAccount = Partial<Omit<NewAccount, "id">>;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type UpdatedSession = Partial<Omit<NewSession, "id">>;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UpdatedCategory = Partial<Omit<NewCategory, "id">>;

export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
export type UpdatedBrand = Partial<Omit<NewBrand, "id">>;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type UpdatedProduct = Partial<Omit<NewProduct, "id">>;

export type Colour = typeof colours.$inferSelect;
export type NewColour = typeof colours.$inferInsert;
export type UpdatedColour = Partial<Omit<NewColour, "id">>;

export type Size = typeof sizes.$inferSelect;
export type NewSize = typeof sizes.$inferInsert;
export type UpdatedSize = Partial<Omit<NewSize, "id">>;

export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;
export type UpdatedProductVariant = Partial<Omit<NewProductVariant, "id">>;

export type ProductRating = typeof productRatings.$inferSelect;
export type NewProductRating = typeof productRatings.$inferInsert;
export type UpdatedProductRating = Partial<Omit<NewProductRating, "id">>;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type UpdatedOrder = Partial<Omit<NewOrder, "id">>;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type UpdatedOrderItem = Partial<Omit<NewOrderItem, "id">>;

export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
export type UpdatedCartItem = NewCartItem;

export type Wishlist = typeof wishlists.$inferSelect;
export type NewWishlist = typeof wishlists.$inferInsert;

export type WishlistItem = typeof wishlistItems.$inferSelect;
export type NewWishlistItem = typeof wishlistItems.$inferInsert;

export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
export type UpdatedAddress = Partial<Omit<NewAddress, "id">>;

// Zod Schemas
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

export const orderSelectSchema = createSelectSchema(orders);
export const orderInsertSchema = createInsertSchema(orders);
export const orderUpdateSchema = createUpdateSchema(orders);

export const orderItemSelectSchema = createSelectSchema(orderItems);
export const orderItemInsertSchema = createInsertSchema(orderItems);
export const orderItemUpdateSchema = createUpdateSchema(orderItems);

export const cartSelectSchema = createSelectSchema(carts);
export const cartInsertSchema = createInsertSchema(carts);
export const cartUpdateSchema = createUpdateSchema(carts);

export const cartItemSelectSchema = createSelectSchema(cartItems);
export const cartItemInsertSchema = createInsertSchema(cartItems);
export const cartItemUpdateSchema = createUpdateSchema(cartItems);

export const addressSelectSchema = createSelectSchema(addresses);
export const addressInsertSchema = createInsertSchema(addresses, {
  userId: z.string().uuid().nullable(),
  name: z.string().min(3).max(255),
  addressLine1: z.string().min(3).max(255),
  addressLine2: z.string().max(255).nullable(),
  city: z.string().min(3).max(255),
  county: z.string().min(3).max(255),
  country: z.string().min(3).max(255),
  postcode: z.string().min(5).max(10),
  phoneNumber: z.string().min(10).max(15),
});
export const addressUpdateSchema = createInsertSchema(addresses);
export type AddressFormFieldErrors = z.inferFlattenedErrors<
  typeof addressInsertSchema
>["fieldErrors"];

export const emailFormSchema = z.string().email();

export type EmailFormErrors = z.inferFlattenedErrors<
  typeof emailFormSchema
>["formErrors"];
