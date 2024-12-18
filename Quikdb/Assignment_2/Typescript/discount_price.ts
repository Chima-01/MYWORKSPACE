function calculateDiscountPrice(price: number, discount: number = 10): number {
  const discountPrice = price - ((price * discount) / 100);
  return discountPrice;
}