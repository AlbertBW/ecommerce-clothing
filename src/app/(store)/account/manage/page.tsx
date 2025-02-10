import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function ManagePage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full items-center max-w-screen-lg mx-auto justify-center min-h-[calc(100vh-197px)]">
      <div className="text-2xl font-bold mb-6">Account Details</div>
      <div className="flex flex-col justify-start p-6 border-2 dark:border-white border-black shadow-xl rounded w-11/12 md:w-1/2">
        <div className="mb-2 flex justify-between border-b p-6 dark:border-white border-black">
          <div>
            <div className="font-bold mb-2">Name</div>
            <div>{session.user.name}</div>
          </div>
        </div>
        <div className="mb-2 flex justify-between border-b p-6 dark:border-white border-black">
          <div>
            <div className="font-bold mb-2">Email</div>
            <div>{session.user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
