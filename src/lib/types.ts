import {
  Brand,
  Cart,
  Category,
  Colour,
  Product,
  ProductRating,
  ProductVariant,
  Size,
  User,
  Wishlist,
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

export type WishlistId = Wishlist["id"];

export type ProductDetails = Product & {
  productVariants: (ProductVariant & {
    colour: Colour | null;
    size: Size | null;
  })[];
  productRating: ProductRating | null;
  brand: Brand | null;
  category: Category | null;
};

export type RecursiveCategory = {
  categories: {
    gender: "men" | "women" | "unisex";
    id: number;
    name: string;
    parentId: number | null;
    subcategories: {
      gender: "men" | "women" | "unisex";
      id: number;
      name: string;
      parentId: number | null;
      subcategories: {
        gender: "men" | "women" | "unisex";
        id: number;
        name: string;
        parentId: number | null;
        subcategories: {
          gender: "men" | "women" | "unisex";
          id: number;
          name: string;
          parentId: number | null;
        }[];
      }[];
    }[];
  }[];
};

export type HeaderCatergory = {
  gender: string;
  categories: HeaderCatergories;
};

export type HeaderCatergories = {
  id: number;
  name: string;
  gender: "men" | "women" | "unisex";
  parentId: number | null;
  subcategories: {
    id: number;
    name: string;
    gender: "men" | "women" | "unisex";
    parentId: number | null;
    subcategories: {
      id: number;
      name: string;
      gender: "men" | "women" | "unisex";
      parentId: number | null;
      subcategories: {
        id: number;
        name: string;
        gender: "men" | "women" | "unisex";
        parentId: number | null;
      }[];
    }[];
  }[];
}[];
