import { getProductListDetails } from "@/use-cases/products";
import Image from "next/image";
import tshirt from "../../../../../../public/t-shirt-white.jpeg";
import Link from "next/link";

type ProductListProps = {
  collection: string;
  category: string;
  subcategory: string | string[] | undefined;
  sortBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brand: string | string[] | undefined;
  colour: string | string[] | undefined;
  size: string | string[] | undefined;
  price: string | string[] | undefined;
};

export default async function AdminProductList({
  collection,
  category,
  subcategory,
  sortBy,
  page,
  brand,
  colour,
  size,
  price,
}: ProductListProps) {
  const products = await getProductListDetails({
    collection,
    categorySlug: category,
    subcategorySlug: subcategory,
    sortBy,
    page,
    brandSlug: brand,
    colourSlug: colour,
    sizeSlug: size,
    price,
  });

  if (products.length === 0) {
    return (
      <div className="pt-0 min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] mt-2 px-1 md:px-0 md:ml-4 mx-1 sm:mx-4 ">
        <div className="text-center text-lg font-light flex justify-center items-center w-full h-full">
          No products found
        </div>
      </div>
    );
  }

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between border-b border-zinc-500 py-2 text-sm"
        >
          <div className="flex items-center">
            <Image
              src={tshirt}
              alt={product.title}
              className="w-12 h-12 object-cover"
              quality={10}
            />
            <p className="ml-2 min-w-32 border-r">{product.brand.name}</p>
            <p className="ml-2 min-w-40 border-r">{product.title}</p>
            <p className="ml-2 min-w-32 border-r">
              Variants: {product.productVariants.length}
            </p>
            <p className="ml-2 min-w-40 border-r">
              Total stock:{" "}
              {product.productVariants.reduce(
                (total, variant) => total + variant.stock,
                0
              )}
            </p>
            <p className="ml-2 min-w-40">
              Sold:{" "}
              {product.productVariants.reduce(
                (total, variant) => total + variant.sold,
                0
              )}
            </p>
          </div>
          <div>
            <Link
              href={"/admin/products/" + product.id}
              className="text-blue-500"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
