import {
  selectUserAndSessionCountByRole,
  selectUserByUserId,
  selectUsersByRole,
} from "@/data-access/users.access";
import { UserRole } from "@/db/schema";
import { UserId } from "@/lib/types";
import { z } from "zod";

export async function getAllUsersByRole({
  role,
  search,
  page = "1",
}: {
  role: UserRole;
  search?: string;
  page?: string;
}) {
  const pageNum = parseInt(page);

  if (isNaN(pageNum)) {
    throw new Error("Page is not a number");
  }

  const customers = await selectUsersByRole({
    role,
    search,
    page: pageNum,
  });

  return customers;
}

export async function getUserAndSesssionCount() {
  const info = await selectUserAndSessionCountByRole("customer");
  const { userCount, sessionCount } = info[0];
  return { userCount, sessionCount };
}

export async function getUserById(id: UserId) {
  const validatedId = z.string().uuid().parse(id);

  return await selectUserByUserId(validatedId);
}
