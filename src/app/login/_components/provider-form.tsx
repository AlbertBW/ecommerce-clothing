"use client";

import { signInWithProviderAction } from "@/actions/sign-in.action";
import { useActionState } from "react";
import type { ProviderForm } from "@/lib/types";

export default function ProviderForm({ provider, searchParams }: ProviderForm) {
  const [state, formAction, pending] = useActionState<ProviderForm>(
    signInWithProviderAction,
    {
      provider,
      searchParams,
    }
  );

  if (pending) return <div>Signing in with {state.provider.name}...</div>;

  return (
    <form key={provider.id} action={formAction}>
      <button type="submit">
        <span>Sign in with {provider.name}</span>
      </button>
    </form>
  );
}
