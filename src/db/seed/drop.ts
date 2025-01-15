import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "..";
import {
  accounts,
  authenticators,
  categories,
  colours,
  productRatings,
  products,
  productVariants,
  sessions,
  sizes,
  users,
  verificationTokens,
  addresses,
  brands,
  cartItems,
  carts,
  orders,
  orderItems,
  wishlistItems,
  wishlists,
} from "../schema";

async function drop() {
  await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${accounts} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${authenticators} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${verificationTokens} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${sessions} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${categories} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${products} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${productVariants} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${colours} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${sizes} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${productRatings} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${addresses} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${brands} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${cartItems} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${carts} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${orders} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${orderItems} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${wishlistItems} CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS ${wishlists} CASCADE`);
}

drop();
