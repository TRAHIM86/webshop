import react, { useContext } from "react";
import { CartContext } from "../App";
import Requests from "../requests";
import { useQuery } from "@tanstack/react-query";
import { ProductItem } from "../components/productItem/productItem";
import { Button } from "../components/button/button";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const cartKeys = [...cart.keys()];

  async function fetchCartProduct(ids) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return await Requests.getCartProduct(ids);
  }

  //корзина продуктов
  const {
    data: cartProducts,
    isLoading: isLoadingCartProducts,
    isError: isErrorCartProducts,
  } = useQuery({
    queryKey: ["cartProducts", cart],

    queryFn: () => fetchCartProduct(cartKeys),
  });

  function addQuantity(productId) {
    setCart((prev) => {
      const newCart = new Map(prev);
      newCart.set(productId, newCart.get(productId) + 1);

      return newCart;
    });
  }

  function removeQuantity(productid) {
    setCart((prev) => {
      const newCart = new Map(prev);

      if (newCart.get(productid) > 1) {
        newCart.set(productid, newCart.get(productid) - 1);
      } else {
        newCart.delete(productid);
      }

      return newCart;
    });
  }

  console.log(cartProducts);

  // cartProducts - продукты после запроса при
  // переходе на страницу. Показать только те, что
  // есть в cart Map(). Нужно для того, что если при
  // кликах -1 доходим до нуля, то он удаляется с Map
  // и соотв не проходит фильтр (не отображ в корзине)
  return (
    <div>
      {cart.size === 0
        ? "Your shopping cart is empty"
        : cartProducts
            ?.filter((product) => cart.has(product.id))
            .map((product) => (
              <div key={product.id}>
                <ProductItem product={product} />
                <div>{cart.get(product.id)}</div>
                <Button func={() => addQuantity(product.id)}>+1</Button>
                <Button func={() => removeQuantity(product.id)}>-1</Button>
              </div>
            ))}
    </div>
  );
};
