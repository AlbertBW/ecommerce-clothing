import "dotenv/config";

import { db } from "..";
import { categories, colours, products, sizes } from "../schema";
import {
  categorySeedData,
  colourSeedData,
  productSeedData,
  sizeSeedData,
} from "./seed-data";

async function seed() {
  // Script to seed the database
  await db.insert(categories).values(categorySeedData);
  await db.insert(colours).values(colourSeedData);
  await db.insert(sizes).values(sizeSeedData);

  productSeedData.forEach(async (product) => {
    const newProduct = await db.insert(products).values(product).returning();
    console.log(newProduct);
  });
}

seed();
