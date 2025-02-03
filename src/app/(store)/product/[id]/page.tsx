import BackButton from "@/app/_components/back-button";
import Image from "next/image";
import shirt from "../../../../../public/t-shirt-white.jpeg";
import { getProductDetailsById } from "@/use-cases/products";
import ProductForm from "./_components/product-form";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getProductDetailsById((await params).id);

  const colours = [
    ...new Set(
      product.productVariants
        .filter((prodVar) => prodVar.colour?.name)
        .map((prodVar) => prodVar.colour!.name)
    ),
  ];

  return (
    <>
      <div className="max-w-screen-xl mt-8 ml-4 md:mx-auto">
        <BackButton />
      </div>
      <div className="min-h-[calc(100vh-197px)] max-w-screen-xl flex text-center mx-auto">
        <div className="flex md:flex-row flex-col mb-24 items-center w-full justify-between">
          <div className="my-8 md:my-0">
            <Image
              src={shirt}
              alt={`Image of ${product.title}`}
              width={650}
              height={650}
            />
          </div>
          <ProductForm product={product} colours={colours} />
        </div>
      </div>
    </>
  );
}
