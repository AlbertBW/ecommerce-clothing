import Image from "next/image";
import { ProductDetails } from "@/lib/types";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";
import shirt from "../../../public/t-shirt-white.jpeg";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductDetails }) {
  const totalStock = product.productVariants.reduce(
    (acc, p) => acc + p.stock,
    0
  );

  const isLowStock = totalStock < LOW_STOCK_THRESHOLD && totalStock > 0;
  return (
    <Link href={`/product/${product.id}`}>
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
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <>
      <div className="bg-zinc-800 w-[350px] max-w-full aspect-[1/1]" />

      <div className="mt-1">
        <p className="font-semibold text-transparent bg-zinc-800/70 w-fit rounded-md">
          Loading brand name
        </p>
        <p className="text-transparent bg-zinc-800/80 w-fit rounded-md">
          Loading product name
        </p>

        <p className="text-transparent bg-zinc-800/50 w-fit rounded-md">
          Loading price
        </p>

        <p className="text-transparent bg-zinc-800/40 w-fit rounded-md">
          Loading stock
        </p>
      </div>
    </>
  );
}
