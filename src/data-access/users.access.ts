import { db } from "@/db";
import { UpdatedUser, UserId, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(userId: UserId) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function updateUser(userId: UserId, updatedUser: UpdatedUser) {
  await db.update(users).set(updatedUser).where(eq(users.id, userId));
}
