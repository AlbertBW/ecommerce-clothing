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
      <div className="w-9/12 sm:w-96 flex justify-start p-6 pb-2">
        <BackButton />
      </div>
      <div className="w-11/12 sm:w-96 border rounded-md border-zinc-600">
        <div className="text-2xl font-semibold p-6">Sign up</div>
        <div className="flex flex-col gap-2 p-6 pt-0">
          {Object.values(providerMap).map((provider) => (
            <ProviderForm
              key={provider.id}
              provider={provider}
              searchParams={searchParams}
            />
          ))}
          <div>
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
            </div>
          </div>
          <CredentialsForm />
        </div>
      </div>
    </div>
  );
}
