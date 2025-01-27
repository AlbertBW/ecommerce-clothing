import ProductCard from "@/app/_components/product-card";
import { getProductListDetails } from "@/use-cases/products";

type ProductListProps = {
  collection: string;
  category: string;
  subcategory: string | string[] | undefined;
  orderBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brand: string | string[] | undefined;
  colour: string | string[] | undefined;
  size: string | string[] | undefined;
  price: string | string[] | undefined;
};

export default async function ProductList({
  collection,
  category,
  subcategory,
  orderBy,
  page,
  brand,
  colour,
  size,
  price,
}: ProductListProps) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await getProductListDetails({
    collection,
    category,
    orderBy,
    page,
    brand,
    colour,
    size,
    price,
  });

  console.log("produts", products);
  return (
    <section className="pt-0 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 px-1 md:px-0 md:ml-6 mx-1 sm:mx-4">
      {products.map((product) => (
        <div key={product.id} className="max-w-80">
          <ProductCard product={product} />
        </div>
      ))}
    </section>
  );
}
