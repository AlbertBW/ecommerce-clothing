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

// export default function product-card() {
//   return (
// <div className="h-48 bg-red-500 flex flex-col">
//       <div className="flex-grow flex items-center justify-center bg-blue-400">
//         <Image
//           src={shirt}
//           alt={product.title}
//           width={0}
//           height={0}
//           className="w-full h-full object-cover"
//         />

//         <div className="pt-3 px-4">
//           <div>
//             <h1 className="font-semibold">{product.brand?.name}</h1>
//             <h1 className="font-medium">{product.title}</h1>

//             <p className="text-zinc-600 dark:text-zinc-400">
//               {product.productVariants[0].price}
//             </p>
//             {!isLowStock && totalStock > 0 ? (
//               <p className="text-green-600">In stock</p>
//             ) : isLowStock ? (
//               <p className="text-yellow-500">Low stock</p>
//             ) : (
//               totalStock === 0 && <p className="text-red-600">Out of stock</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
