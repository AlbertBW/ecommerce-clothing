"use server";

import { AddUserToRoleType } from "@/app/(admin)/admin/staff/_components/add-user-to-role";
import { UserRole } from "@/db/schema";
import { UserId } from "@/lib/types";
import { deleteAccount } from "@/use-cases/auth";
import { addUserToRole, changeUserRole } from "@/use-cases/user";

export async function deleteAccountAction(userId: UserId) {
  await deleteAccount(userId);
}

export async function changeUserRoleAction(userId: UserId, role: UserRole) {
  await changeUserRole(userId, role);
}

export async function addUserToRoleAction(
  state: AddUserToRoleType,
  formData: FormData
) {
  return await addUserToRole(state, formData);
}
