import { createBrandSlug } from "@/utils/create-brand-slug";
import {
  NewCategory,
  NewColour,
  NewProduct,
  NewSize,
  NewProductRating,
  NewBrand,
  NewUser,
} from "../schema";

export const categorySeedData: NewCategory[] = [
  // Clothing
  {
    id: 100,
    name: "Clothing",
    collection: "unisex",
    displayOrder: 0,
    slug: "clothing",
  },
  {
    id: 101,
    name: "T-shirts",
    parentId: 100,
    collection: "unisex",
    slug: "t-shirts",
  },
  {
    id: 102,
    name: "Dresses",
    parentId: 100,
    collection: "women",
    slug: "dresses",
  },
  {
    id: 103,
    name: "Trousers",
    parentId: 100,
    collection: "unisex",
    slug: "trousers",
  },
  {
    id: 104,
    name: "Jackets",
    parentId: 100,
    collection: "unisex",
    slug: "jackets",
  },
  {
    id: 105,
    name: "Skirts",
    parentId: 100,
    collection: "women",
    slug: "skirts",
  },

  // Sportswear
  {
    id: 200,
    name: "Sportswear",
    collection: "unisex",
    displayOrder: 1,
    slug: "sportswear",
  },
  {
    id: 201,
    name: "Tops",
    parentId: 200,
    collection: "unisex",
    slug: "tops",
  },
  {
    id: 202,
    name: "Sports Bra",
    parentId: 200,
    collection: "women",
    slug: "sports-bra",
  },
  {
    id: 203,
    name: "Leggins",
    parentId: 200,
    collection: "women",
    slug: "leggins",
  },
  {
    id: 204,
    name: "Shorts",
    parentId: 200,
    collection: "unisex",
    slug: "shorts",
  },
  {
    id: 205,
    name: "Joggers",
    parentId: 200,
    collection: "men",
    slug: "joggers",
  },

  // Footwear
  {
    id: 300,
    name: "Footwear",
    collection: "unisex",
    displayOrder: 2,
    slug: "footwear",
  },
  {
    id: 301,
    name: "Running Shoes",
    parentId: 300,
    collection: "unisex",
    slug: "running-shoes",
  },
  {
    id: 302,
    name: "Training Shoes",
    parentId: 300,
    collection: "unisex",
    slug: "training-shoes",
  },
  {
    id: 303,
    name: "Hiking Boots",
    parentId: 300,
    collection: "unisex",
    slug: "hiking-boots",
  },
  {
    id: 304,
    name: "Cleats",
    parentId: 300,
    collection: "unisex",
    slug: "cleats",
  },

  // Accessories
  {
    id: 400,
    name: "Accessories",
    collection: "unisex",
    displayOrder: 3,
    slug: "accessories",
  },
  {
    id: 401,
    name: "Hats",
    parentId: 400,
    collection: "unisex",
    slug: "hats",
  },
  {
    id: 402,
    name: "Bags",
    parentId: 400,
    collection: "unisex",
    slug: "bags",
  },
  {
    id: 403,
    name: "Jewellery",
    parentId: 400,
    collection: "unisex",
    slug: "jewellery",
  },
  {
    id: 404,
    name: "Gloves",
    parentId: 400,
    collection: "unisex",
    slug: "gloves",
  },
  {
    id: 405,
    name: "Belts",
    parentId: 400,
    collection: "unisex",
    slug: "belts",
  },
];

export const brandSeedData: NewBrand[] = [
  {
    name: "Solace",
    slug: createBrandSlug("Solace"),
  },
  {
    name: "Urban Threads",
    slug: createBrandSlug("Urban Threads"),
  },
  {
    name: "ComfortWear",
    slug: createBrandSlug("ComfortWear"),
  },
  {
    name: "WinterFit",
    slug: createBrandSlug("WinterFit"),
  },
  {
    name: "Breeze",
    slug: createBrandSlug("Breeze"),
  },
  {
    name: "Elegance",
    slug: createBrandSlug("Elegance"),
  },
  {
    name: "PartyTime",
    slug: createBrandSlug("PartyTime"),
  },
];

export const productSeedData: NewProduct[] = [
  // T-shirts
  {
    name: "Classic T-shirt",
    description: "A classic short sleeve t-shirt",
    categoryId: 101,
    brandId: 1,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    name: "Graphic T-shirt",
    description: "A t-shirt with a cool graphic design",
    categoryId: 101,
    brandId: 2,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    name: "V-neck T-shirt",
    description: "A comfortable V-neck t-shirt",
    categoryId: 101,
    brandId: 3,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    name: "Long Sleeve T-shirt",
    description: "A long sleeve t-shirt for cooler weather",
    categoryId: 101,
    brandId: 4,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },

  // Dresses
  {
    name: "Summer Dress",
    description: "A light and airy summer dress",
    categoryId: 102,
    brandId: 5,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    name: "Evening Gown",
    description: "An elegant evening gown for special occasions",
    categoryId: 102,
    brandId: 6,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    name: "Casual Dress",
    description: "A comfortable dress for everyday wear",
    categoryId: 102,
    brandId: 3,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    name: "Party Dress",
    description: "A fun and stylish dress for parties",
    categoryId: 102,
    brandId: 7,
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
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
  { name: "XL", displayOrder: 4 },
  { name: "XXL", displayOrder: 5 },
];

export const productRatingSeedData: NewProductRating[] = [
  {
    productId: 0,
    rate: "",
    count: 0,
  },
];

export const usersSeedData: NewUser[] = [
  {
    email: "admin@dapperwear.com",
    role: "admin",
    name: "Admin",
    password: "Admin123",
  },
  {
    email: "owner@dapperwear.com",
    role: "owner",
    name: "Owner",
    password: "Owner123",
  },
];
