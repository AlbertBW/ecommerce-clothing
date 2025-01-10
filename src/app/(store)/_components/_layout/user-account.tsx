import Link from "next/link";
import UserAvatar from "../_auth/user-avatar";

export default function UserAccount() {
  return (
    <div>
      <Link href={"/account"} className="hover:opacity-80">
        <UserAvatar />
      </Link>
    </div>
  );
}
