"use client";

import { useFormStatus } from "react-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ProductVariantId } from "@/lib/types";
import { moveToWishlistAction } from "@/actions/wishlist.action";
import { toast } from "react-toastify";

export default function MoveToWishlist({
  productVariantId,
}: {
  productVariantId: ProductVariantId;
}) {
  async function moveToWishlist() {
    const { success, message } = await moveToWishlistAction(productVariantId);

    if (!success) {
      toast.error(message);
    } else {
      toast.success("Moved to wishlist");
    }
  }

  return (
    <form action={moveToWishlist}>
      <MoveToWishlistButton />
    </form>
  );
}

function MoveToWishlistButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending ? "opacity-50" : ""
      } hover:text-red-500 transition-colors w-10 h-10`}
    >
      <HeartIcon />
    </button>
  );
}
