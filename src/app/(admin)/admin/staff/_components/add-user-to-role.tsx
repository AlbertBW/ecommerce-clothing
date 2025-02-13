"use client";

import { addUserToRoleAction } from "@/actions/user.action";
import Modal from "@/app/_components/modal";
import { User, UserRole } from "@/db/schema";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";

const initialState = (role: UserRole) => ({
  role,
  email: "" as string | undefined,
  user: undefined as User | undefined,
  error: undefined as string | undefined,
  success: false as boolean,
});

export type AddUserToRoleType = ReturnType<typeof initialState>;

export default function AddUserToRole({ role }: { role: UserRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, pending] = useActionState(addUserToRoleAction, {
    ...initialState(role),
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (state.success) {
      closeModal();
    }
  }, [state.success]);

  return (
    <>
      <button onClick={openModal} className="hover:underline">
        Add {role}
      </button>

      {isOpen && (
        <Modal close={closeModal}>
          <form
            action={formAction}
            className="p-6 dark:bg-zinc-800 rounded shadow w-96"
          >
            <h2 className="text-xl font-bold mb-4">Add {role}</h2>
            {!state.user && (
              <>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Enter User&apos;s email
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white"
                />
              </>
            )}

            {state.error && <p className="text-red-500">{state.error}</p>}

            {state.user && (
              <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-zinc-700 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">User Found</h3>
                {state.user.role === role && (
                  <p className="text-yellow-500 font-semibold">
                    {state.user.name} is already a {role}
                  </p>
                )}
                <div className="flex flex-col items-center">
                  {state.user.image ? (
                    <Image
                      src={state.user.image}
                      width={180}
                      height={0}
                      alt={`${state.user?.name}'s profile picture`}
                      className="rounded-full pt-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <UserCircleIcon
                        width={200}
                        height={200}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No profile picture
                      </p>
                    </div>
                  )}
                  <p className="mt-4 text-lg font-medium">{state.user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {state.user.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {state.user.role}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4 gap-2">
              {!state.user && (
                <>
                  <button
                    disabled={pending}
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    Find User
                  </button>
                  <button
                    type="reset"
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </>
              )}
              {state.user && (
                <>
                  <button
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    {state.user.role === role ? "Go Back" : `Make ${role}`}
                  </button>
                  {state.user.role !== role && (
                    <button
                      type="reset"
                      className="p-2 bg-blue-500 text-white rounded"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
