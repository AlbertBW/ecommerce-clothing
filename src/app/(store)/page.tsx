import { getLatestProductDetails } from "@/use-cases/products";
import ProductCarousel from "../_components/product-carousel";
import Link from "next/link";

export default async function Home() {
  const latestProducts = await getLatestProductDetails();

  return (
    <>
      <section>
        <div className="flex flex-row justify-around items-center h-24">
          <h3 className="font-semibold text-lg">Latest</h3>
          <Link className="text-zinc-400 hover:text-zinc-500" href={""}>
            View all
          </Link>
        </div>

        <ProductCarousel products={latestProducts} direction="left" />
      </section>

      <section>
        <div className="flex flex-row justify-around items-center h-24">
          <Link className="text-zinc-400 hover:text-zinc-500" href={""}>
            View all
          </Link>
          <h3 className="font-semibold text-lg">Back in stock</h3>
        </div>

        <ProductCarousel products={latestProducts} direction="right" />
      </section>
    </>
  );
}
