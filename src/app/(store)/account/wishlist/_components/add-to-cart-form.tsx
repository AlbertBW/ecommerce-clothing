"use client";

import { addToCartAction } from "@/actions/cart.action";
import { SubmitButton } from "@/app/_components/_buttons/submit-button";
import { ProductVariantId } from "@/lib/types";

export default function AddToCartForm({
  productVariantId,
}: {
  productVariantId: ProductVariantId;
}) {
  async function handleAddToCartAction() {
    await addToCartAction(productVariantId, 1);
  }
  return (
    <form
      action={handleAddToCartAction}
      className="flex sm:flex-row flex-col justify-end gap-2 mr-2 md:mr-0 items-center transition-colors w-full"
    >
      <SubmitButton text={"Add to basket"} pendingText="Adding..." />
    </form>
  );
}
