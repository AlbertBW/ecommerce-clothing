import { db } from "@/db";
import { sessions, UpdatedUser, UserRole, users } from "@/db/schema";
import { UserId } from "@/lib/types";
import { and, count, eq, like, or } from "drizzle-orm";

export async function selectUserByUserId(userId: UserId) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      orders: { with: { orderItems: true }, limit: 5 },
    },
  });

  return user;
}

export async function selectUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function updateUser(userId: UserId, updatedUser: UpdatedUser) {
  await db.update(users).set(updatedUser).where(eq(users.id, userId));
}

export async function deleteUser(userId: UserId) {
  await db.delete(users).where(eq(users.id, userId));
}

export async function selectUsersByRole({
  role,
  search,
  page,
  limit = 10,
}: {
  role: UserRole;
  search?: string;
  page: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;
  return await db.query.users.findMany({
    where: and(
      eq(users.role, role),
      search
        ? or(like(users.email, search), like(users.name, search))
        : undefined
    ),
    with: {
      orders: true,
    },
    limit,
    offset,
  });
}

export async function selectUserAndSessionCountByRole(role: UserRole) {
  return await db
    .select({
      userCount: count(users),
      sessionCount: count(sessions),
    })
    .from(users)
    .leftJoin(sessions, eq(users.id, sessions.userId))
    .where(eq(users.role, role));
}
