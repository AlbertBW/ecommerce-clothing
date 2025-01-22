import { selectRecursiveCategoriesByGender } from "@/data-access/categories.access";
import { Gender } from "@/db/schema";
import { GENDER_COMBINATIONS } from "@/lib/constants";

export async function getCategoriesRecursiveByGender(genders: Gender[]) {
  return await selectRecursiveCategoriesByGender(genders);
}

export async function getHeaderMenuCategories() {
  const men = GENDER_COMBINATIONS["mens"];
  const women = GENDER_COMBINATIONS["womens"];

  const womenCategories = await getCategoriesRecursiveByGender(men);
  const menCategories = await getCategoriesRecursiveByGender(women);

  const categories = [
    { gender: "women", categories: womenCategories },
    { gender: "men", categories: menCategories },
  ];

  return categories;
}
