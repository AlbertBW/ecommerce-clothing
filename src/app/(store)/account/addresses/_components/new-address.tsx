"use client";

import Modal from "@/app/_components/modal";
import { useState } from "react";
import AddressForm from "./address-form";

export default function NewAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const address = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: "",
    country: "",
    phoneNumber: "",
  };

  return (
    <>
      <button onClick={handleOpenModal}>Add new address</button>

      {isModalOpen && (
        <Modal close={handleCloseModal}>
          <h2 className="text-lg font-semibold mb-4">Add new address</h2>
          <AddressForm address={address} cancel={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}
