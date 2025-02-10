"use client";

import { addToCartAction } from "@/actions/cart.action";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlist.action";
import LoadingSpinner from "@/app/_components/loading-spinner";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { ProductDetails, ProductVariantId } from "@/lib/types";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProductForm({
  product,
  colours,
  session,
  wishlistItemIds,
  cartItemIds,
}: {
  product: ProductDetails;
  colours: string[];
  session: Session | null;
  wishlistItemIds: ProductVariantId[];
  cartItemIds: ProductVariantId[];
}) {
  const [selectedColour, setSelectedColour] = useState<string | null>(null);
  const [selectedProductVariants, setSelectedProductVariants] = useState<
    typeof product.productVariants
  >([]);
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<(typeof product.productVariants)[0]>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [itemInWishlist, setItemInWishlist] = useState(false);
  const [itemInCart, setItemInCart] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetSelectedColour = (colour: string) => {
    setSelectedSize(null);
    setItemInCart(false);
    setItemInWishlist(false);

    setSelectedColour((prev) => {
      if (prev === colour) {
        setSelectedProductVariants([]);
        setSelectedProductVariant(undefined);
        return null;
      }
      return colour;
    });

    const productVariants = product.productVariants.filter(
      (prodVar) => prodVar.colour?.name === colour
    );
    setSelectedProductVariants(productVariants);
  };

  const handleSetSelectedSize = (size: string) => {
    setSelectedSize((prev) => {
      if (prev === size) {
        setSelectedProductVariant(undefined);
        return null;
      }
      return size;
    });

    const productVariant = selectedProductVariants.find(
      (prodVar) => prodVar.size?.name === size
    );

    setSelectedProductVariant(productVariant);
  };

  const handleAddToCart = async () => {
    if (!selectedProductVariant) {
      return;
    }

    setIsLoading(true);
    await addToCartAction(selectedProductVariant.id, 1);
    toast.success("Added to cart");
    setIsLoading(false);
  };

  const handleWishlistToggle = async () => {
    if (!selectedProductVariant) {
      return;
    }

    if (!session) {
      toast.error("Please sign in to add to wishlist");
      return;
    }

    setIsLoading(true);

    const { success, message } = itemInWishlist
      ? await removeFromWishlistAction(selectedProductVariant.id)
      : await addToWishlistAction(selectedProductVariant.id);

    if (!success) {
      toast.error(message);
      setIsLoading(false);
    } else {
      if (itemInWishlist) {
        toast.success("Removed from wishlist");
      } else {
        toast.success("Added to wishlist");
      }
    }
    setIsLoading(false);
  };

  const productSizes: string[] = Array.from(
    new Set(
      product.productVariants
        .filter((prodVar) => prodVar.size?.name)
        .map((prodVar) => prodVar.size!.name)
    )
  );

  useEffect(() => {
    setItemInWishlist(
      selectedProductVariant
        ? wishlistItemIds.includes(selectedProductVariant.id)
        : false
    );

    setItemInCart(
      selectedProductVariant
        ? cartItemIds.includes(selectedProductVariant.id)
        : false
    );

    setOutOfStock(
      selectedProductVariant ? selectedProductVariant.stock <= 0 : false
    );
  }, [cartItemIds, selectedProductVariant, wishlistItemIds]);

  const lowStock = selectedProductVariant
    ? selectedProductVariant.stock <= LOW_STOCK_THRESHOLD
    : false;

  console.log(selectedProductVariant);

  return (
    <div className="flex flex-col justify-between gap-4 md:w-2/5 text-xl md:mx-auto">
      <h1 className="font-bold">{product.brand.name}</h1>
      <div>{product.name}</div>

      <div className="w-full mx-auto">
        <div className="flex flex-col justify-between mx-auto gap-2 my-4 max-w-96">
          <h2>Colours</h2>
          <div className="flex justify-center flex-wrap gap-2">
            {colours.map((colour) => (
              <button
                type="button"
                key={colour}
                onClick={() => handleSetSelectedColour(colour)}
                className={`min-w-20 md:h-12 h-10 border rounded-md transition-colors delay-0 ${
                  selectedColour === colour ? "bg-gray-200 text-black" : ""
                }`}
              >
                {colour}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between mx-auto gap-2">
          <h2>Size</h2>
          <div className="flex justify-center flex-wrap mx-auto gap-2">
            {productSizes.map((size) => (
              <button
                disabled={selectedColour === null}
                type="button"
                onClick={() => handleSetSelectedSize(size)}
                key={size}
                className={`md:w-20 md:h-10 w-24 h-10 border rounded-md transition-colors delay-0 text-sm sm:text-base ${
                  selectedProductVariants.some(
                    (variant) => variant.size?.name === size
                  )
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                } ${selectedSize === size ? "bg-gray-200 text-black" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-8 my-3 flex justify-center items-center">
          <span
            className={`${
              outOfStock
                ? "text-red-500"
                : lowStock
                ? "text-orange-500"
                : "text-green-500"
            }`}
          >
            {selectedProductVariant &&
              (outOfStock
                ? "Out of Stock"
                : lowStock
                ? "Low stock"
                : "In Stock")}
          </span>
        </div>

        <div className="grid grid-cols-3 my-3">
          <div className="flex justify-end mr-4">
            <button
              aria-label="Add to wishlist"
              disabled={isLoading || selectedSize === null || itemInCart}
              onClick={handleWishlistToggle}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-10 transition ${
                  selectedSize !== null && !itemInCart
                    ? "text-red-500  ease-in-out hover:scale-125"
                    : itemInCart && "text-green-500"
                } ${itemInWishlist && "fill-red-500"} ${
                  isLoading && "animate-pulse"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
          <button
            aria-label="Add to cart"
            disabled={!selectedSize || outOfStock || itemInCart}
            onClick={handleAddToCart}
            type="button"
            className={`${
              !selectedSize || outOfStock || itemInCart
                ? "bg-zinc-400/40"
                : false
                ? "bg-zinc-800 opacity-40"
                : "bg-blue-500 hover:bg-blue-700"
            } self-center  text-white font-semibold w-40 h-12 rounded`}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : !selectedSize ? (
              "Select Size"
            ) : outOfStock ? (
              "Out of Stock"
            ) : itemInCart ? (
              "In Basket"
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
