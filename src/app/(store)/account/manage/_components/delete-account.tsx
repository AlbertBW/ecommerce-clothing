"use client";

import { deleteAccountAction } from "@/actions/user.action";
import Modal from "@/app/_components/modal";
import { UserId } from "@/lib/types";
import { useState } from "react";

export default function DeleteAccount({ userId }: { userId: UserId }) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  async function handleSubmit() {
    await deleteAccountAction(userId);
    window.location.href = "/";
  }
  return (
    <>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        onClick={openModal}
      >
        Delete Account
      </button>

      {isOpen && (
        <Modal close={closeModal}>
          <div className="p-4 flex flex-col gap-4 border border-gray-300 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Delete Account?</h3>

            <p className="text-sm text-red-600">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>

            <div className="w-full flex justify-center items-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Yes, Delete forever
              </button>
              <button
                onClick={closeModal}
                className="w-1/2 px-4 py-2 border border-gray-300 hover:bg-zinc-600 rounded transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
