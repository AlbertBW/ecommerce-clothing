import { signInCredentials } from "@/app/actions/signin.action";

export default function CredentialsForm() {
  return (
    <form
      className="flex flex-col justify-center items-center"
      action={signInCredentials}
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
