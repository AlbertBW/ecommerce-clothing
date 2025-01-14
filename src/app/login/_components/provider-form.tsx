"use client";
import { ProviderInfo } from "@/lib/types";
import { signInProvider } from "@/app/actions/signin.action";
import { useActionState } from "react";

export type ProviderForm = {
  provider: ProviderInfo;
  searchParams: { callbackUrl: string | undefined };
};

export default function ProviderForm({ provider, searchParams }: ProviderForm) {
  const [state, formAction, pending] = useActionState<ProviderForm>(
    signInProvider,
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
