import "dotenv/config";
import { db } from "..";
import {
  brands,
  carts,
  categories,
  colours,
  NewProductRating,
  NewProductVariant,
  productRatings,
  products,
  productVariants,
  sizes,
  users,
  wishlists,
} from "../schema";
import {
  brandSeedData,
  categorySeedData,
  colourSeedData,
  productSeedData,
  sizeSeedData,
  usersSeedData,
} from "./seed-data";
import { createProductSlug } from "@/utils/create-product-slug";
import { generateCode } from "@/utils/generate-code";
import { generateSKU } from "@/utils/generate-sku";
import { getRandomInt } from "./utils/get-random-int";
import { getRandomPrice } from "./utils/get-random-price";
import { getRandomFloatAsString } from "./utils/get-random-float";
import bcrypt from "bcrypt";

async function seed() {
  usersSeedData.map(async (user) => {
    if (!user.password) throw new Error("No password");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const newUser = await db
      .insert(users)
      .values({ ...user, password: hashedPassword })
      .returning();

    await db.insert(wishlists).values({ userId: newUser[0].id }).returning();
    await db.insert(carts).values({ userId: newUser[0].id }).returning();
  });

  await db.insert(categories).values(categorySeedData).returning();

  const allColours = await db
    .insert(colours)
    .values(colourSeedData)
    .returning();

  const allSizes = await db.insert(sizes).values(sizeSeedData).returning();

  const allBrands = await db.insert(brands).values(brandSeedData).returning();

  const productsData = productSeedData.map((product) => {
    const brand = allBrands.find((brand) => brand.id === product.brandId);
    const category = categorySeedData.find(
      (category) => category.id === product.categoryId
    );

    if (!brand?.name) throw new Error("No Brand name");
    if (!category?.collection) throw new Error("No collection");

    const brandCode = generateCode(brand?.name);
    const productTitleCode = generateCode(product.name);

    if (!product.categoryId) throw new Error("No category ID on product");

    const slug = createProductSlug({
      brandCode: brandCode,
      categoryId: product.categoryId,
      collection: category.collection,
      productTitleCode: productTitleCode,
    });

    return { ...product, slug };
  });

  const allProducts = await db
    .insert(products)
    .values(productsData)
    .returning();

  const productVariantsData = allProducts.flatMap((p) => {
    const variants = [];
    const randomPrice = getRandomPrice();
    const randomColours = allColours
      .sort(() => Math.random() - 0.5)
      .slice(0, getRandomInt(3, 4));
    const randomSizes = allSizes
      .sort(() => Math.random() - 0.5)
      .slice(0, getRandomInt(3, 4));

    for (const colour of randomColours) {
      for (const size of randomSizes) {
        const sku = generateSKU(p.slug, colour.name, size.name);
        variants.push({
          stock: getRandomInt(25),
          price: randomPrice,
          returns: getRandomInt(10),
          sold: getRandomInt(100),
          productId: p.id,
          colourId: colour.id,
          sizeId: size.id,
          sku: sku,
        } as NewProductVariant);
      }
    }
    return variants;
  });

  await db.insert(productVariants).values(productVariantsData).returning();

  const productRatingsData = allProducts.flatMap((p) => {
    const rating: NewProductRating = {
      productId: p.id,
      count: getRandomInt(5),
      rate: getRandomFloatAsString(1, 5, 1),
    };
    return rating;
  });

  await db.insert(productRatings).values(productRatingsData).returning();
}

seed();
