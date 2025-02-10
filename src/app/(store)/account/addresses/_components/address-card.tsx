"use client";

import { Address } from "@/db/schema";
import { useState } from "react";
import AddressForm from "./address-form";
import Modal from "@/app/_components/modal";
import { deleteAddressAction } from "@/actions/address.action";

export default function AddressCard({ address }: { address: Address }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  async function handleDeleteAddress() {
    await deleteAddressAction(address.id);
  }
  return (
    <>
      {!isEditing && (
        <address className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 not-italic max-w-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl mb-3 ">{address.name}</h3>
            <div className="flex gap-3">
              <button
                className="text-red-500"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
          <div className="space-y-2 ">
            <div className="space-y-1">
              <p className="font-medium">Delivery Address:</p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
            </div>
            <div>
              <p>
                {address.city}, {address.county}
              </p>
              <p className="font-medium">{address.postcode}</p>
              <p>{address.country}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="flex items-center">
                <span className="font-medium mr-2">Contact:</span>
                <span>{address.phoneNumber}</span>
              </p>
            </div>
          </div>
        </address>
      )}

      {isDeleting && (
        <Modal close={handleCancelDelete}>
          <div className="p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-semibold pb-2">Delete address?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this address?
            </p>
            <form
              action={handleDeleteAddress}
              className="flex justify-end gap-4 mt-6"
            >
              <button type="button" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button type="submit" className="text-red-500">
                Delete
              </button>
            </form>
          </div>
        </Modal>
      )}
      {isEditing && <AddressForm address={address} cancel={handleCancel} />}
    </>
  );
}
