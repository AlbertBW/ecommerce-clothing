import { auth } from "@/auth";
import { getStaff } from "@/use-cases/user";
import { notFound } from "next/navigation";
import ChangeRole from "./_components/change-role";
import AddUserToRole from "./_components/add-user-to-role";

export default async function StaffPage() {
  const session = await auth();

  if (!session || session.user.role !== "owner") notFound();

  const { owners, admins } = await getStaff();
  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <div className="mb-8">
        <div className="w-full flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Owners</h2>
          <AddUserToRole role={"owner"} />
        </div>
        <ul className="space-y-2">
          {owners.map((owner) => (
            <li
              key={owner.id}
              className="p-4 dark:bg-zinc-800 bg-zinc-200 rounded shadow flex justify-between items-center"
            >
              <span>
                <span className="font-semibold">{owner.name}</span> -{" "}
                {owner.email}
              </span>
              {session.user.id !== owner.id && (
                <ChangeRole
                  username={owner.name!}
                  userId={owner.id}
                  currentRole={owner.role || "owner"}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="w-full flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Admins</h2>
          <AddUserToRole role={"admin"} />
        </div>
        <ul className="space-y-2">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="p-4 dark:bg-zinc-800 bg-zinc-200 rounded shadow flex justify-between items-center"
            >
              <span>
                <span className="font-semibold">{admin.name}</span> -{" "}
                {admin.email}
              </span>
              {session.user.id !== admin.id && (
                <ChangeRole
                  username={admin.name!}
                  userId={admin.id}
                  currentRole={admin.role || "admin"}
                />
              )}
            </li>
          ))}

          {admins.length === 0 && (
            <div className="flex justify-center items-center">No admins</div>
          )}
        </ul>
      </div>
    </div>
  );
}
