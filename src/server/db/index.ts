import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Ensure the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

async function main() {
  // Script to test database
}

main();
