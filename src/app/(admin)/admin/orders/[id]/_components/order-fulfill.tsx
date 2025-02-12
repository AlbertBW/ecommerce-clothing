"use client";

import { createShipmentAction } from "@/actions/shipment.action";
import Modal from "@/app/_components/modal";
import { OrderWithDetails } from "@/data-access/orders.access";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function OrderFulfill({ order }: { order: OrderWithDetails }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!order) throw new Error("Order not found");

  const createShipmentWithId = createShipmentAction.bind(null, order.id);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        onClick={openModal}
      >
        Fulfill Order
      </button>

      {isOpen && (
        <Modal close={closeModal}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3>Confirm details</h3>
              <button onClick={closeModal} className="text-red-500">
                Cancel
              </button>
            </div>

            <div className="mt-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
              <div className="space-y-1 text-sm">
                <p className="flex">
                  <span className="w-40 font-medium">Name:</span>
                  <span>{order?.deliveryAddress.name}</span>
                </p>
                <p className="flex">
                  <span className="w-40 font-medium">Address Line 1:</span>
                  <span>{order?.deliveryAddress.addressLine1}</span>
                </p>
                <p className="flex">
                  <span className="w-40 font-medium">Address Line 2:</span>
                  <span>{order?.deliveryAddress.addressLine2}</span>
                </p>
                <p className="flex">
                  <span className="w-40 font-medium">City:</span>
                  <span>{order?.deliveryAddress.city}</span>
                </p>
                <p className="flex">
                  <span className="w-40 font-medium">Postcode:</span>
                  <span>{order?.deliveryAddress.postcode}</span>
                </p>
                <p className="flex">
                  <span className="w-40 font-medium">Country:</span>
                  <span>{order?.deliveryAddress.country}</span>
                </p>
                <p className="flex">
                  <span className="w-40 font-medium">Phone:</span>
                  <span>{order?.deliveryAddress.phoneNumber}</span>
                </p>
              </div>
            </div>

            <div className="mt-6 py-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Order Items</h3>

              <div>
                <div>
                  <div className="flex flex-row items-center justify-between border-b border-zinc-500 py-2 text-sm">
                    <div className="flex items-center w-full">
                      <p className="ml-2 w-1/2 text-sm">SKU</p>
                      <p className="ml-2 w-1/2">Quantity</p>
                    </div>
                    <div></div>
                  </div>
                </div>
                {order?.orderItems.map((item) => (
                  <div key={item.productVariantId}>
                    <div className="flex flex-row items-center justify-between border-b border-zinc-500 py-2 text-sm">
                      <div className="flex items-center w-full">
                        <p className="ml-2 w-1/2 text-sm">
                          {item.productVariant.sku}
                        </p>

                        <p className="ml-2 w-1/2">{item.quantity}</p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              action={createShipmentWithId}
              className="mt-6 flex flex-col justify-center items-center"
            >
              <label className="w-full mb-4">
                <span className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                  Weight (grams)
                </span>
                <input
                  type="number"
                  name="weight"
                  min={0}
                  placeholder="Enter weight in grams"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 outline-none dark:bg-black bg-white"
                  required
                />
              </label>

              <div className="w-full my-4">
                <h4 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Dimensions
                </h4>
                <div className="flex flex-col gap-4">
                  <label>
                    <span className="block mb-1 font-semibold">
                      Length (mm)
                    </span>
                    <input
                      type="number"
                      min={0}
                      name="dimensionsLength"
                      placeholder="Length"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 outline-none dark:bg-black bg-white"
                      required
                    />
                  </label>
                  <label>
                    <span className="block mb-1 font-semibold">Width (mm)</span>
                    <input
                      type="number"
                      min={0}
                      name="dimensionsWidth"
                      placeholder="Width"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 outline-none dark:bg-black bg-white"
                      required
                    />
                  </label>
                  <label>
                    <span className="block mb-1 font-semibold">
                      Height (mm)
                    </span>
                    <input
                      type="number"
                      min={0}
                      name="dimensionsHeight"
                      placeholder="Height"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 outline-none dark:bg-black bg-white"
                      required
                    />
                  </label>
                </div>
              </div>

              <SubmitButton />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
      disabled={pending}
    >
      Confirm Shipment
    </button>
  );
}
