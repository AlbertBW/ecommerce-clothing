"use client";
import { changeUserRoleAction } from "@/actions/user.action";
import Modal from "@/app/_components/modal";
import { UserRole } from "@/db/schema";
import { UserId } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangeRole({
  userId,
  username,
  currentRole,
}: {
  userId: UserId;
  username: string;
  currentRole: UserRole;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<UserRole>(currentRole);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmitForm() {
    if (role === currentRole) {
      toast.info("Role is already set to " + role);
      closeModal();
      return;
    }

    if (role !== currentRole) {
      await changeUserRoleAction(userId, role);
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="ml-4 p-2 bg-blue-500 text-white rounded"
      >
        Edit
      </button>

      {isOpen && (
        <Modal close={closeModal}>
          <div className="p-6 dark:bg-zinc-800 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Change Role</h2>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Role for {username}
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="mt-1 block w-full dark:bg-zinc-600 bg-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <form
              action={handleSubmitForm}
              className="flex justify-end mt-4 gap-2"
            >
              <button
                type="submit"
                className="p-2 bg-green-500 text-white rounded"
              >
                Confirm
              </button>
              <button
                type="button"
                className="p-2 bg-blue-500 text-white rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
