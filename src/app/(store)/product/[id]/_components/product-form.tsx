"use client";

import LoadingSpinner from "@/app/_components/loading-spinner";
import { ProductDetails } from "@/lib/types";
import { useState } from "react";

export default function ProductForm({
  product,
  colours,
}: {
  product: ProductDetails;
  colours: string[];
}) {
  const [selectedColour, setSelectedColour] = useState<string | null>(null);
  const [selectedProductVariants, setSelectedProductVariants] = useState<
    typeof product.productVariants
  >([]);
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<(typeof product.productVariants)[0]>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [inCart, setInCart] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetSelectedColour = (colour: string) => {
    setSelectedColour((prev) => {
      if (prev === colour) {
        setSelectedProductVariants([]);
        setSelectedSize(null);
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
        return null;
      }
      return size;
    });

    const productVariant = selectedProductVariants.find(
      (prodVar) => prodVar.size?.name === size
    );

    setSelectedProductVariant(productVariant);
    if (productVariant?.stock === 0) {
      setOutOfStock(true);
      return;
    }
    setOutOfStock(false);
  };

  const handleAddToCart = async () => {
    console.log("Add to cart");
    if (!selectedProductVariant) {
      return;
    }

    setIsLoading(true);
    // await addToCart(selectedProductVariant);
    setIsLoading(false);
    setInCart(true);
  };

  const productSizes: string[] = Array.from(
    new Set(
      product.productVariants
        .filter((prodVar) => prodVar.size?.name)
        .map((prodVar) => prodVar.size!.name)
    )
  );

  return (
    <div className="flex flex-col justify-between gap-4 md:w-2/5 text-xl md:mx-auto">
      <h1 className="font-bold">{product.brand.name}</h1>
      <div>{product.title}</div>

      <div className="w-full mx-auto">
        <div className="flex flex-col justify-between mx-auto gap-2 my-4 w-96">
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
                className={`md:w-32 md:h-12 w-24 h-10 border rounded-md transition-colors delay-0 text-sm sm:text-base ${
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

        <div className="grid grid-cols-3 mt-4">
          <div className="flex justify-end mr-4">
            {true && ( // User logged in
              <button
                aria-label="Add to wishlist"
                disabled={isLoading || selectedSize === null || inCart}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-10 transition ${
                    selectedSize !== null && !inCart
                      ? "text-red-500  ease-in-out hover:scale-125"
                      : inCart && "text-green-500"
                  } ${true && "fill-red-500"} ${isLoading && "animate-pulse"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            aria-label="Add to cart"
            disabled={!selectedSize || outOfStock || inCart}
            onClick={handleAddToCart}
            type="button"
            className={`${
              !selectedSize || outOfStock || inCart
                ? "bg-zinc-400/40"
                : false
                ? "bg-zinc-800 opacity-40"
                : "bg-blue-500 hover:bg-blue-700"
            } self-center  text-white font-bold w-40 h-12 rounded`}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : !selectedSize ? (
              "Select Size"
            ) : outOfStock ? (
              "Out of Stock"
            ) : inCart ? (
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
