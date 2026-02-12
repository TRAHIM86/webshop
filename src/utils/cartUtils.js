// вспомогательные функции для cart

// объединить localCart и userCart. После
// логина объединяются две корзины анониная и юзерская

export function mergeCarts(userCart, localCart) {
  const merged = new Map(userCart);

  localCart.forEach((quantity, productId) => {
    const existingQuantity = merged.get(productId) || 0;
    merged.set(productId, existingQuantity + quantity);
  });

  return merged;
}
