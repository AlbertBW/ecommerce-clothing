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
}

drop();
