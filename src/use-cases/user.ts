import { AddUserToRoleType } from "@/app/(admin)/admin/staff/_components/add-user-to-role";
import { auth } from "@/auth";
import {
  selectUserAndSessionCountByRole,
  selectUserByEmail,
  selectUserByUserId,
  selectUsersByRole,
  updateUserRole,
} from "@/data-access/users.access";
import { UserRole } from "@/db/schema";
import { UserId } from "@/lib/types";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
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

export async function getStaff() {
  const owners = await selectUsersByRole({ role: "owner" });
  const admins = await selectUsersByRole({ role: "admin" });
  return { owners, admins };
}

export async function changeUserRole(userId: UserId, role: UserRole) {
  const session = await auth();

  if (!session || session.user.role !== "owner") {
    throw new AuthError("Not authenticated");
  }

  const validatedId = z.string().uuid().parse(userId);

  await updateUserRole(validatedId, role);

  revalidatePath("/admin/staff");
}

export async function addUserToRole(
  state: AddUserToRoleType,
  formData: FormData
) {
  if (!state.user) {
    const email = formData.get("emailAddress");
    const validatedEmail = z.string().email().safeParse(email);

    if (validatedEmail.error) {
      return {
        ...state,
        error: "Invalid email",
      };
    }

    const user = await selectUserByEmail(validatedEmail.data);

    if (!user) {
      return {
        success: false,
        role: state.role,
        email: undefined,
        user: undefined,
        error: "User not found",
      };
    }

    return {
      success: false,
      role: state.role,
      error: undefined,
      user: user,
      email: undefined,
    };
  }
  if (state.user && state.user.role) {
    if (state.user.role === state.role) {
      return {
        success: false,
        role: state.role,
        error: undefined,
        user: undefined,
        email: undefined,
      };
    }

    await updateUserRole(state.user.id, state.role);

    revalidatePath("/admin/staff");

    return {
      success: true,
      role: state.role,
      error: undefined,
      user: undefined,
      email: "",
    };
  }

  return {
    success: false,
    role: state.role,
    error: undefined,
    user: undefined,
    email: "",
  };
}
