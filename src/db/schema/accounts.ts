import { text, primaryKey, integer } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { pgTable } from "../utils/pgTableCreator";
import { users } from "./users";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

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

export type SelectAccount = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;
export type UpdateAccount = Partial<Omit<InsertAccount, "id">>;

export const accountSelectSchema = createSelectSchema(accounts);
export const accountInsertSchema = createInsertSchema(accounts);
export const accountUpdateSchema = createUpdateSchema(accounts);
