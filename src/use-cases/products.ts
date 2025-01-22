import { selectLatestProductDetails } from "@/data-access/products.access";
import { allGenders } from "@/db/schema";

export async function getLatestProductDetails() {
  return await selectLatestProductDetails(6);
}

export function getGenderParams() {
  return allGenders;
}

export async function genderHomePage(gender: string) {
  return "data " + gender;
}
