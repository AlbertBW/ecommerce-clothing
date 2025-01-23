import { Collection } from "@/db/schema";

export const LOW_STOCK_THRESHOLD = 50;

export const COLLECTION_PARAMS = ["men", "women"];

export const COLLECTION_COMBINATIONS = {
  mens: ["men", "unisex"] as Collection[],
  womens: ["women", "unisex"] as Collection[],
} as const;
