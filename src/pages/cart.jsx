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

  console.log(cart);

  return (
    <div>
      {cartProducts?.map((product) => (
        <div key={product.id}>
          <ProductItem product={product} />
          <div>{cart.get(product.id)}</div>
          <Button func={() => addQuantity(product.id)}>+1</Button>
          <button>-1</button>
        </div>
      ))}
    </div>
  );
};
