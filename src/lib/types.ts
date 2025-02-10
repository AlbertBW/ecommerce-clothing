import {
  Address,
  AddressFormFieldErrors,
  Brand,
  Cart,
  Category,
  Colour,
  NewAddress,
  Order,
  Product,
  ProductRating,
  ProductVariant,
  Size,
  User,
  Wishlist,
} from "@/db/schema";
import Stripe from "stripe";

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

export type WishlistId = Wishlist["id"];

export type AddressId = Address["id"];

export type OrderNumber = Order["orderNumber"];

export type OrderId = Order["id"];

export type ProductDetails = Product & {
  productVariants: (ProductVariant & {
    colour: Colour | null;
    size: Size | null;
  })[];
  productRating: ProductRating | null;
  brand: Brand;
  category:
    | (Category & {
        parentCategory: Category | null;
      })
    | null;
};

export type CollectionGroup = {
  collection: string;
  categories: RecursiveCategory[];
};

export type RecursiveCategory = {
  id: number;
  name: string;
  displayOrder: number | null;
  slug: string;
  collection: "men" | "women" | "unisex";
  parentId: number | null;
  subcategories: RecursiveCategory[];
};

export type CartCookies = Array<{
  id: Product["id"];
  quantity: number;
}>;

export type UseCaseReturnType =
  | {
      success: true;
      message: null;
    }
  | {
      success: false;
      message: string;
    };

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

export type SessionCreate = Stripe.Checkout.SessionCreateParams;

export type AddressForm = {
  success: boolean;
  address: NewAddress;
  errors: AddressFormFieldErrors | null;
};
