"use client";

import { cancelOrderAction } from "@/actions/order.action";
import Modal from "@/app/_components/modal";
import { OrderId } from "@/lib/types";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function CancelOrder({ orderId }: { orderId: OrderId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cancelOrderWithId = cancelOrderAction.bind(null, orderId);

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <>
      <button onClick={toggleModal}>Cancel Order</button>
      {isModalOpen && (
        <Modal close={toggleModal}>
          <form
            className="dark:bg-slate-800 bg-zinc-300 p-4 rounded flex flex-col gap-4"
            action={cancelOrderWithId}
          >
            <h3 className="font-semibold text-xl">Cancel Order?</h3>
            <p>Are you sure you want to cancel this order?</p>
            <div className="flex gap-4 justify-end">
              <SubmitButton />

              <button
                className="bg-gray-500 py-2 px-4 rounded hover:bg-gray-600"
                type="button"
                onClick={toggleModal}
              >
                No
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
      disabled={pending}
      className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
      type="submit"
    >
      Confirm
    </button>
  );
}
