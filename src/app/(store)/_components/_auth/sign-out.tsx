import Link from "next/link";

export function SignOut() {
  return (
    <Link className="hover:opacity-75" href={"/logout"}>
      Sign Out
    </Link>
  );
}
