"use server";

import { UserId } from "@/lib/types";
import { deleteAccount } from "@/use-cases/auth";

export async function deleteAccountAction(userId: UserId) {
  await deleteAccount(userId);
}
