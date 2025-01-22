import { Gender } from "@/db/schema";

export const LOW_STOCK_THRESHOLD = 50;

export const GENDER_HOME_PARAMS = ["men", "women"];

export const GENDER_COMBINATIONS = {
  mens: ["men", "unisex"] as Gender[],
  womens: ["women", "unisex"] as Gender[],
} as const;
