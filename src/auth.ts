import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import {
  accounts,
  authenticators,
  sessions,
  signInSchema,
  users,
  verificationTokens,
} from "./db/schema";
import type { Provider } from "next-auth/providers";
import { ProviderInfo } from "@/lib/types";
import { createCartAndWishlist } from "./use-cases/auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { encode as defaultEncode } from "next-auth/jwt";

const providers: Provider[] = [
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
];

const adapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  authenticatorsTable: authenticators,
  sessionsTable: sessions,
  verificationTokensTable: verificationTokens,
});

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
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    session: async ({ session, user }) => {
      session.user.role = user.role;
      return session;
    },
  },
  adapter,
  providers: [
    ...providers,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
        const { email, password } = await signInSchema.parseAsync(credentials);
        // logic to verify if user exists
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) {
          console.log("user not found");
          throw new Error("User not found.");
        }

        if (!user.password) {
          throw new Error("No password");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          throw new Error("Login failed.");
        }
        console.log(user);

        return user as User;
      },
    }),
  ],

  jwt: {
    encode: async function (params) {
      console.log("params", params);
      if (params.token?.credentials) {
        const sessionToken = randomUUID();

        if (!params.token.sub) {
          throw new Error("No sub");
        }

        const newSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!newSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  secret: process.env.AUTH_SECRET,
  // trustHost: true,
});
