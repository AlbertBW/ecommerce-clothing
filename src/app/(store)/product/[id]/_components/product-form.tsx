"use client";

import { ProductDetails } from "@/lib/types";

export default function ProductForm({ product }: { product: ProductDetails }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:w-2/5 text-xl md:mx-auto">
      <h1 className="font-bold">{product.brand.name}</h1>
      <div>{product.title}</div>

      <div className="w-full mx-auto">
        <div className="flex flex-col justify-between mx-auto gap-2 my-4">
          <h2>Colours</h2>
          <div className="flex justify-center md:w-full gap-2">
            {product.productVariants.map((prodVar) => (
              <button
                type="button"
                key={prodVar.id}
                className={`min-w-20 md:h-12 h-10 border rounded-md transition-colors delay-0`}
              >
                {prodVar.colour?.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between mx-auto gap-2">
          <h2>Size</h2>
          <div className="flex justify-center w-3/5 mx-auto gap-2">
            {Array.from({ length: 6 }, (_, i) => {
              return (
                <button
                  type="button"
                  key={i}
                  className={`md:w-32 md:h-12 w-24 h-10 border rounded-md transition-colors delay-0 `}
                >
                  variant size
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
