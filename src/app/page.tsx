import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import SignIn from "./components/sign-in";
import { auth } from "@/server/auth";

export default async function Home() {
  const users = await db.select().from(usersTable);
  const session = await auth();

  console.log(session);

  async function createUser(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string, 10);
    const email = formData.get("email") as string;

    await db.insert(usersTable).values({ name, age, email });

    revalidatePath("/");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SignIn />
        <form action={createUser}>
          <div className="flex flex-col gap-4">
            <label>
              Name:
              <input
                type="text"
                name="name"
                required
                className="border p-2 rounded bg-black"
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                required
                className="border p-2 rounded bg-black"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                required
                className="border p-2 rounded bg-black"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create User
            </button>
          </div>
        </form>
        {users.length &&
          users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.age}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
