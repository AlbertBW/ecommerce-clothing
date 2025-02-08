"use client";

import { updateQuantityAction } from "@/actions/cart.action";
import { ProductVariantId } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";

export default function QuantitySelect({
  quantity,
  productVariantId,
}: {
  quantity: number;
  productVariantId: ProductVariantId;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setIsLoading(true);

    const { message } = await updateQuantityAction({
      quantity: newQuantity,
      productVariantId,
    });

    if (message) {
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-1 md:mr-4">
      <div>Qty: </div>
      <select
        className="p-1 rounded-md bg-transparent outline-none"
        disabled={isLoading}
        value={quantity}
        onChange={handleChange}
      >
        {Array.from({ length: 99 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
