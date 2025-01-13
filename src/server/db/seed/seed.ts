import "dotenv/config";

import { db } from "..";
import { categories, products } from "../schema";
import { categorySeedData } from "./seedData";

async function seed() {
  // Script to seed the database

  await db.insert(categories).values(categorySeedData).onConflictDoNothing();
}

seed();
