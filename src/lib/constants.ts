import { Collection } from "@/db/schema";

export const LOW_STOCK_THRESHOLD = 50;

export const COLLECTION_PARAMS = ["men", "women"];

export const COLLECTION_COMBINATIONS = {
  all: ["men", "women", "unisex"] as Collection[],
  men: ["men", "unisex"] as Collection[],
  women: ["women", "unisex"] as Collection[],
} as const;

export const ORDER_BY = [
  "new",
  "priceAsc",
  "priceDesc",
  "popular",
  undefined,
] as const;

export type OrderBy = (typeof ORDER_BY)[number];

export const ORDER_BY_DEFAULT = "new" as const;

export const PRODUCTS_PER_PAGE = 12;
