import { redirect } from "next/navigation";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { SIGNIN_ERROR_URL } from "@/config";

export default function CredentialsForm() {
  return (
    <form
      className="flex flex-col justify-center items-center"
      action={async (formData) => {
        "use server";
        try {
          await signIn("credentials", formData);
        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
          }
          throw error;
        }
      }}
    >
      <label htmlFor="email">
        Email
        <input name="email" id="email" />
      </label>
      <label htmlFor="password">
        Password
        <input name="password" id="password" />
      </label>
      <input type="submit" value="Sign In" />
    </form>
  );
}
