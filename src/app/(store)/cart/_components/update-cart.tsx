"use client";
import { removeOutOfStockCartItemsAction } from "@/actions/cart.action";
import { SubmitButton } from "@/app/_components/_buttons/submit-button";
import { ProductVariantId } from "@/lib/types";
import { toast } from "react-toastify";

export default function UpdateCart({
  productVariantIds,
}: {
  productVariantIds: ProductVariantId[];
}) {
  async function handleUpdateCart() {
    const { success, message } = await removeOutOfStockCartItemsAction(
      productVariantIds
    );

    if (!success) {
      toast.error(message);
    } else {
      toast.success("Cart updated");
    }
  }
  return (
    <form action={handleUpdateCart} className="text-blue-500">
      <SubmitButton text={"Update cart"} pendingText="Updating" />
    </form>
  );
}
