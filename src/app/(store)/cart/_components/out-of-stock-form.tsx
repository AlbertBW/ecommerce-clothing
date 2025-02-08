"use client";

import { addProductsToWishlistAction } from "@/actions/wishlist.action";
import { SubmitButton } from "@/app/_components/_buttons/submit-button";
import { ProductVariantId } from "@/lib/types";
import { toast } from "react-toastify";

export default function AddOutOfStockToWishlistForm({
  outOfStockIds,
}: {
  outOfStockIds: ProductVariantId[];
}) {
  async function handleAddAllToWishlist() {
    const { success, message } = await addProductsToWishlistAction(
      outOfStockIds
    );

    if (!success) {
      toast.error(message);
    } else {
      toast.success("Moved to wishlist");
    }
  }
  return (
    <form action={handleAddAllToWishlist} className="text-blue-500">
      <SubmitButton text="Add all to wishlist" pendingText="moving" />
    </form>
  );
}
