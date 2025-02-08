"use client";

import { removeFromWishlistAction } from "@/actions/wishlist.action";
import { SubmitButton } from "@/app/_components/_buttons/submit-button";
import { ProductVariantId } from "@/lib/types";

export default function RemoveFromWishlist({
  productVariantId,
}: {
  productVariantId: ProductVariantId;
}) {
  async function handleRemoveFromWishlist() {
    await removeFromWishlistAction(productVariantId);
  }
  return (
    <form
      action={handleRemoveFromWishlist}
      className="flex sm:flex-row flex-col justify-end gap-2 mr-2 md:mr-0 items-center transition-colors w-full"
    >
      <SubmitButton text={"Remove"} pendingText="removing..." />
    </form>
  );
}
