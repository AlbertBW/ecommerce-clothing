import { signInWithCredentialsAction } from "@/actions/sign-in.action";

export default function CredentialsForm() {
  return (
    <form
      className="flex flex-col justify-center items-center w-full gap-2"
      action={signInWithCredentialsAction}
    >
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-black dark:text-white border-gray-300 dark:border-gray-600`}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-black dark:text-white border-gray-300 dark:border-gray-600`}
        />
      </div>
      <input type="submit" value="Sign In" className="mt-4" />
    </form>
  );
}
