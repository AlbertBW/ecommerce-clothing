import { selectLatestProductDetails } from "@/data-access/products.access";
import { allCollections } from "@/db/schema";

export async function getLatestProductDetails() {
  return await selectLatestProductDetails(6);
}

export function getGenderParams() {
  return allCollections;
}

export async function genderHomePage(gender: string) {
  return "data " + gender;
}
