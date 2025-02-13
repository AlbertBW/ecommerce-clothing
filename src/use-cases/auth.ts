import { auth, signIn } from "@/auth";
import { SIGNIN_ERROR_URL } from "@/config";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import type { ProviderForm, UserId } from "@/lib/types";
import { getOrCreateWishlist } from "./wishlists";
import { getOrCreateCart } from "./carts";
import { deleteUser } from "@/data-access/users.access";
import { updateOrdersAnonymize } from "@/data-access/orders.access";
import { revalidatePath } from "next/cache";

export async function signInWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
}

export async function signInWithProvider(state: ProviderForm) {
  try {
    await signIn(state.provider.id, {
      redirectTo: state.searchParams?.callbackUrl ?? "",
    });
  } catch (error) {
    // Signin can fail for a number of reasons, such as the user
    // not existing, or the user not having the correct role.
    // In some cases, you may want to redirect to a custom error
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    // Otherwise if a redirects happens Next.js can handle it
    // so you can just re-thrown the error and let Next.js handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error;
  }
}

export async function createCartAndWishlist(userId: UserId) {
  await getOrCreateCart(userId);
  await getOrCreateWishlist(userId);
}

export async function deleteAccount(userId: UserId) {
  const session = await auth();

  if (!session || !session.user || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  if (session.user.email) {
    await updateOrdersAnonymize(userId, session.user.email);
  }

  await deleteUser(userId);

  revalidatePath("/account/manage");
  revalidatePath("/");
}
