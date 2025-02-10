"use client";

import { cancelOrderAction } from "@/actions/order.action";
import Modal from "@/app/_components/modal";
import { OrderId } from "@/lib/types";
import { useActionState, useState } from "react";

export default function CancelOrder({ orderId }: { orderId: OrderId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    cancelOrderAction,
    orderId
  );

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  console.log(state);

  return (
    <>
      <button onClick={toggleModal}>Cancel Order</button>
      {isModalOpen && (
        <Modal close={toggleModal}>
          <form
            className="dark:bg-slate-800 bg-zinc-300 p-4 rounded flex flex-col gap-4"
            action={formAction}
          >
            <h3 className="font-semibold text-xl">Cancel Order?</h3>
            <p>Are you sure you want to cancel this order?</p>
            <div className="flex gap-4 justify-end">
              <button
                disabled={pending}
                className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
                type="submit"
              >
                Yes
              </button>

              <button
                disabled={pending}
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
