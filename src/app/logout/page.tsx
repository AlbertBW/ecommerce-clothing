import { signOut } from "@/server/auth";
import BackButton from "../_components/back-button";

export default function SignOutPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <h5>Are you sure you want to sign out?</h5>
      <form
        className="flex gap-8"
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <div className="hover:opacity-75">
          <BackButton />
        </div>
        <button className="hover:opacity-75" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
