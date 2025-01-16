export function getRandomPrice() {
  const minPrice = 500; // 5.00
  const maxPrice = 10000; // 500.00

  let price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
  price = Math.floor(price / 100) * 100;

  if (Math.random() > 0.5) {
    price += 99;
  }

  return price;
}
