import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import SignIn from "./components/sign-in";
import { auth } from "@/server/auth";
import UserAvatar from "./components/user-avatar";
import { SignOut } from "./components/sign-out";

export default async function Home() {
  const session = await auth();
  const allUsers = await db.select().from(users);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <UserAvatar />
        {session?.user ? <SignOut /> : <SignIn />}

        {allUsers.length &&
          allUsers.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
