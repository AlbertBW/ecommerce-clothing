import Image from "next/image";
import { ProductDetails } from "@/lib/types";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";
import shirt from "../../../public/t-shirt-white.jpeg";

export default function ProductCard({ product }: { product: ProductDetails }) {
  const totalStock = product.productVariants.reduce(
    (acc, p) => acc + p.stock,
    0
  );

  const isLowStock = totalStock < LOW_STOCK_THRESHOLD && totalStock > 0;
  return (
    <>
      <Image
        src={shirt}
        alt={product.title}
        layout="responsive"
        width={0}
        height={0}
        className="w-full h-auto object-contain"
      />

      <div className="mt-1">
        <p className="font-semibold text-zinc-400">{product.brand?.name}</p>
        <p>{product.title}</p>

        <p className="text-zinc-500">{product.productVariants[0].price}</p>

        {!isLowStock && totalStock > 0 ? (
          <p className="text-green-600">In stock</p>
        ) : isLowStock ? (
          <p className="text-yellow-500">Low stock</p>
        ) : (
          totalStock === 0 && <p className="text-red-600">Out of stock</p>
        )}
      </div>
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <>
      <div className="bg-zinc-800 w-[350px] max-w-full aspect-[1/1]" />

      <div className="mt-1">
        <p className="font-semibold text-transparent bg-zinc-800 w-fit">
          Loading brand name
        </p>
        <p className="text-transparent bg-zinc-800 w-fit">
          Loading product name
        </p>

        <p className="text-transparent bg-zinc-800 w-fit">Loading price</p>

        <p className="text-transparent bg-zinc-800 w-fit">Loading stock</p>
      </div>
    </>
  );
}
