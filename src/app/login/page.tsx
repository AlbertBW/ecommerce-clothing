import { providerMap } from "@/server/auth";
import CredentialsForm from "./_components/credentials-form";
import ProviderForm from "./_components/provider-form";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="flex flex-col gap-2">
      <CredentialsForm />
      {Object.values(providerMap).map((provider) => (
        <ProviderForm key={provider.id} provider={provider} props={props} />
      ))}
    </div>
  );
}
