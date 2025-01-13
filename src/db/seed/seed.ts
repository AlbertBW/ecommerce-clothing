import "dotenv/config";

import { db } from "..";
import { categories, products } from "../schema";
import { categorySeedData, productSeedData } from "./seedData";

async function seed() {
  // Script to seed the database

  await db.insert(categories).values(categorySeedData).onConflictDoNothing();

  productSeedData.forEach(async (product) => {
    await db.insert(products).values(product);
  });
}

seed();
