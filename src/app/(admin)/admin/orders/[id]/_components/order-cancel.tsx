"use client";

import { cancelOrderAction } from "@/actions/order.action";
import Modal from "@/app/_components/modal";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function OrderCancel({ orderId }: { orderId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const cancelOrderWithId = cancelOrderAction.bind(null, orderId);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button className="text-red-600" onClick={openModal}>
        Cancel Order
      </button>

      {isOpen && (
        <Modal close={closeModal}>
          <form action={cancelOrderWithId} className="p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold pb-12">
              Are you sure you want to cancel this order?
            </h3>

            <div className="flex gap-4 justify-end">
              <SubmitButton />
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Go back
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
    >
      Confirm
    </button>
  );
}
