import {
  Cart,
  Category,
  Colour,
  Product,
  ProductRating,
  ProductVariant,
  Size,
  User,
} from "@/db/schema";

export type ProviderInfo = {
  id: string;
  name: string;
};

export type ProviderForm = {
  provider: ProviderInfo;
  searchParams: { callbackUrl: string | undefined };
};

export type UserId = User["id"];

export type CategoryId = Category["id"];

export type ProductId = Product["id"];

export type SizeId = Size["id"];

export type ProductVariantId = ProductVariant["id"];

export type CartId = Cart["id"];

export type ProductDetails = Product & {
  productVariants: (ProductVariant & {
    colour: Colour | null;
    size: Size | null;
  })[];
  rating: ProductRating;
};
