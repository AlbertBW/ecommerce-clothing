import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import type { Provider } from "next-auth/providers";
import { ProviderInfo } from "@/lib/types";
import { createCartAndWishlist } from "./use-cases/auth";

const providers: Provider[] = [GitHub];

export const providerMap: ProviderInfo[] = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async createUser({ user }) {
      if (user && user.id) {
        await createCartAndWishlist(user.id);
      }
    },
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    session: async ({ session, user }) => {
      session.user.role = user.role;
      return session;
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  // trustHost: true,
});
