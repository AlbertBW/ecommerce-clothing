import { pgEnum } from "drizzle-orm/pg-core";

export const roles = pgEnum("roles", ["admin", "customer"]);
export const genderEnum = pgEnum("gender", ["men", "women", "unisex"]);
