"use client";
import { signOut } from "next-auth/react";
import BackButton from "../_components/back-button";

export default function SignOutPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <h5>Are you sure you want to sign out?</h5>
      <div className="flex gap-8">
        <div className="hover:opacity-75">
          <BackButton />
        </div>
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="hover:opacity-75"
          type="submit"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
