import { providerMap } from "@/auth";
import CredentialsForm from "./_components/credentials-form";
import ProviderForm from "./_components/provider-form";
import { use } from "react";
import BackButton from "../_components/back-button";

export default function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const searchParams = use(props.searchParams);
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <CredentialsForm />
      {Object.values(providerMap).map((provider) => (
        <ProviderForm
          key={provider.id}
          provider={provider}
          searchParams={searchParams}
        />
      ))}
      <BackButton />
    </div>
  );
}
