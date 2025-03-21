import BackButton from "@/app/_components/back-button";
import Image from "next/image";
import shirt from "../../../../../public/t-shirt-white.jpeg";
import { getProductDetailsById } from "@/use-cases/products";
import ProductForm from "./_components/product-form";
import { auth } from "@/auth";
import { getWishlistItems } from "@/use-cases/wishlists";
import { getCartItemsCookies, getCartItemsDb } from "@/use-cases/carts";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const product = await getProductDetailsById((await params).id);
  const wishlistItems = session?.user.id
    ? await getWishlistItems(session.user.id)
    : [];
  const cartItems = session?.user.id
    ? await getCartItemsDb({ userId: session.user.id })
    : await getCartItemsCookies();

  const wishlistItemIds = wishlistItems.map((item) => item.productVariantId);
  const cartItemIds = cartItems.products.map((item) => item.id);

  const colours = [
    ...new Set(
      product.productVariants
        .filter((prodVar) => prodVar.colour?.name)
        .map((prodVar) => prodVar.colour!.name)
    ),
  ];

  return (
    <>
      <div className="hidden sm:block max-w-screen-xl mt-0 ml-8 mb-12">
        <BackButton />
      </div>
      <div className="max-w-screen-xl flex text-center mx-auto">
        <div className="flex lg:flex-row flex-col items-center w-full justify-between">
          <div className="my-8 md:my-0 md:ml-4">
            <Image
              src={shirt}
              alt={`Image of ${product.name}`}
              width={650}
              height={650}
              priority
            />
          </div>
          <ProductForm
            product={product}
            colours={colours}
            session={session}
            wishlistItemIds={wishlistItemIds}
            cartItemIds={cartItemIds}
          />
        </div>
      </div>
    </>
  );
}
