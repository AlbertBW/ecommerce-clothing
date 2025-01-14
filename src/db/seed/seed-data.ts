import {
  NewCategory,
  NewColour,
  NewProduct,
  NewSize,
  NewProductVariant,
  NewProductRating,
} from "../schema";

export const categorySeedData: NewCategory[] = [
  // Clothing
  { id: 100, name: "Clothing" },
  { id: 101, name: "T-shirts", parentId: 100 },
  { id: 102, name: "Dresses", parentId: 100 },
  { id: 103, name: "Trousers", parentId: 100 },
  { id: 104, name: "Jackets", parentId: 100 },
  { id: 105, name: "Skirts", parentId: 100 },

  // Sportswear
  { id: 200, name: "Sportswear" },
  { id: 201, name: "Tops", parentId: 200 },
  { id: 202, name: "Sports Bra", parentId: 200 },
  { id: 203, name: "Leggins", parentId: 200 },
  { id: 204, name: "Shorts", parentId: 200 },
  { id: 205, name: "Joggers", parentId: 200 },

  // Footwear
  { id: 300, name: "Footwear" },
  { id: 301, name: "Running Shoes", parentId: 300 },
  { id: 302, name: "Training Shoes", parentId: 300 },
  { id: 303, name: "Hiking Boots", parentId: 300 },
  { id: 304, name: "Cleats", parentId: 300 },

  // Accessories
  { id: 400, name: "Accessories" },
  { id: 401, name: "Hats", parentId: 400 },
  { id: 402, name: "Bags", parentId: 400 },
  { id: 403, name: "Jewellery", parentId: 400 },
  { id: 404, name: "Gloves", parentId: 400 },
  { id: 405, name: "Belts", parentId: 400 },
];

export const productSeedData: NewProduct[] = [
  // T-shirts
  {
    title: "Classic T-shirt",
    description: "A classic short sleeve t-shirt",
    categoryId: 101,
    brand: "Solace",
    brandSlug: "solace",
    image: "",
    gender: "men",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Graphic T-shirt",
    description: "A t-shirt with a cool graphic design",
    categoryId: 101,
    brand: "Urban Threads",
    brandSlug: "urban-threads",
    image: "",
    gender: "women",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "V-neck T-shirt",
    description: "A comfortable V-neck t-shirt",
    categoryId: 101,
    brand: "ComfortWear",
    brandSlug: "comfortwear",
    image: "",
    gender: "unisex",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Long Sleeve T-shirt",
    description: "A long sleeve t-shirt for cooler weather",
    categoryId: 101,
    brand: "WinterFit",
    brandSlug: "winterfit",
    image: "",
    gender: "men",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Dresses
  {
    title: "Summer Dress",
    description: "A light and airy summer dress",
    categoryId: 102,
    brand: "Breeze",
    brandSlug: "breeze",
    image: "",
    gender: "women",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Evening Gown",
    description: "An elegant evening gown for special occasions",
    categoryId: 102,
    brand: "Elegance",
    brandSlug: "elegance",
    image: "",
    gender: "women",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Casual Dress",
    description: "A comfortable dress for everyday wear",
    categoryId: 102,
    brand: "ComfortWear",
    brandSlug: "comfortwear",
    image: "",
    gender: "women",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Party Dress",
    description: "A fun and stylish dress for parties",
    categoryId: 102,
    brand: "PartyTime",
    brandSlug: "partytime",
    image: "",
    gender: "women",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const colourSeedData: NewColour[] = [
  { name: "white" },
  { name: "black" },
  { name: "red" },
  { name: "blue" },
  { name: "green" },
  { name: "yellow" },
  { name: "purple" },
  { name: "pink" },
  { name: "orange" },
  { name: "grey" },
  { name: "brown" },
  { name: "navy" },
  { name: "beige" },
  { name: "maroon" },
  { name: "teal" },
];

export const sizeSeedData: NewSize[] = [
  { name: "xs", displayOrder: 0 },
  { name: "small", displayOrder: 1 },
  { name: "medium", displayOrder: 2 },
  { name: "large", displayOrder: 3 },
  { name: "extra large", displayOrder: 4 },
  { name: "XXL", displayOrder: 5 },
];

export const productVariantSeedData: NewProductVariant[] = [
  {
    stock: 0,
    price: 0,
    sku: "",
  },
];

export const productRatingSeedData: NewProductRating[] = [
  {
    productId: 0,
    rate: "",
    count: 0,
  },
];
