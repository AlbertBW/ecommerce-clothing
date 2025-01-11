import { providerMap } from "@/server/auth";
import CredentialsForm from "./_components/credentials-form";
import ProviderForm from "./_components/provider-form";
import { use } from "react";

export default function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const searchParams = use(props.searchParams);
  return (
    <div className="flex flex-col gap-2">
      <CredentialsForm />
      {Object.values(providerMap).map((provider) => (
        <ProviderForm
          key={provider.id}
          provider={provider}
          searchParams={searchParams}
        />
      ))}
    </div>
  );
}
