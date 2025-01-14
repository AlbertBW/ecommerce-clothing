"use server";

import type { ProviderForm } from "@/lib/types";
import { signInWithCredentials, signInWithProvider } from "@/use-cases/sign-in";

export async function signInWithCredentialsAction(formData: FormData) {
  await signInWithCredentials(formData);
}

export async function signInWithProviderAction(
  state: ProviderForm
): Promise<ProviderForm> {
  await signInWithProvider(state);
  return state;
}
