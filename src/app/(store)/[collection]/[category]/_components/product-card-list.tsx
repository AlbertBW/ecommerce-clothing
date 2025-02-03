"use client";

import ProductCard from "@/app/_components/product-card";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { ProductDetails } from "@/lib/types";
import { useState } from "react";

export default function ProductCardList({
  initialProducts,
  loadMoreProducts,
}: {
  initialProducts: ProductDetails[];
  loadMoreProducts: (pageNum: number) => Promise<ProductDetails[]>;
}) {
  const [productList, setProductList] =
    useState<ProductDetails[]>(initialProducts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMoreProducts = async () => {
    setLoading(true);
    const products = await loadMoreProducts(page);

    setPage((prevPage) => prevPage + 1);

    setProductList((prevProducts) => [...prevProducts, ...products]);
    setLoading(false);
    if (products.length === 0 || products.length < PRODUCTS_PER_PAGE) {
      setHasMore(false);
    }
  };

  return (
    <>
      <div className="pt-0 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 px-1 md:px-0 md:ml-4 mx-1 sm:mx-4">
        {productList.map((product) => (
          <div key={product.id} className="max-w-80">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        {hasMore ? (
          <button
            disabled={loading}
            className="p-2 border border-zinc-500 text-sm"
            onClick={handleLoadMoreProducts}
          >
            {loading ? "Loading" : "Load More"}
          </button>
        ) : (
          <div className="text-center text-sm text-zinc-400 font-light flex justify-center items-center w-full h-full">
            All products loaded
          </div>
        )}
      </div>
    </>
  );
}
