// модуль для работы с localStorage

// получить корзину и ЛС, и преобразовать в Map
export function getLocalCart() {
  const localCartData = localStorage.getItem("cartWebshop");

  if (!localCartData) return new Map();

  try {
    const parsedData = JSON.parse(localCartData);
    return new Map(
      Object.entries(parsedData).map(([key, value]) => [Number(key), value]),
    );
  } catch {
    return new Map();
  }
}

// удалить корзину в ЛС
export function removeLocalCart() {
  localStorage.removeItem("cartWebshop");
}
