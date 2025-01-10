import Link from "next/link";

export default function SignIn() {
  return (
    <Link href={"/login"} className="text-xs md:text-base">
      Sign In
    </Link>
  );
}
