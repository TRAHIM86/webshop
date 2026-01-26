import { useContext } from "react";
import { CartContext } from "../App";
import Requests from "../requests";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/button/button";
import styles from "./cart.module.css";
import { ProductCart } from "../components/productCart/productCart";
import { Plus, Minus } from "lucide-react";

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

  // добавить/удалить товар в корзину. Используем Map
  // чтобы были только уникальные id товара. Количество
  // будет регулироваться на странице корзины
  function addRemoveProductToCart(id) {
    if (cart.has(id)) {
      const newCart = new Map(cart);
      newCart.delete(id);
      setCart(newCart);
      console.log("cart ", newCart);
      return;
    }

    const newCart = new Map(cart);
    newCart.set(id, 1);
    setCart(newCart);
  }

  function removeAllCart() {
    setCart(new Map());
  }

  // cartProducts - продукты после запроса при
  // переходе на страницу. Показать только те, что
  // есть в cart Map(). Нужно для того, что если при
  // кликах -1 доходим до нуля, то он удаляется с Map
  // и соотв не проходит фильтр (не отображ в корзине)

  const sumTotal = [...cart.entries()].reduce((sum, [id, qty]) => {
    const product = cartProducts?.find((p) => p.id === id);

    return sum + (product?.price || 0) * qty;
  }, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.cartItems}>
        {cart.size === 0
          ? "Your shopping cart is empty"
          : cartProducts
              ?.filter((product) => cart.has(product.id))
              .map((product) => {
                const quantity = cart.get(product.id);
                const sum = (quantity * product.price).toFixed(2);

                return (
                  <div key={product.id} className={styles.cartItem}>
                    <ProductCart product={product} />
                    <div className={styles.quantityBlock}>
                      <Button
                        className={styles.buttonQuantity}
                        func={() => removeQuantity(product.id)}
                      >
                        <Minus />
                      </Button>
                      <div className={styles.quantity}>{quantity}</div>
                      <Button
                        className={styles.buttonQuantity}
                        func={() => addQuantity(product.id)}
                      >
                        <Plus />
                      </Button>
                      <div className={styles.sum}>{sum} $</div>
                      <Button func={() => addRemoveProductToCart(product.id)}>
                        {cart.has(product.id) ? "Remove" : "Add"}
                      </Button>
                    </div>
                  </div>
                );
              })}
      </div>
      <div className={styles.orderBlock}>
        <Button className={styles.buttonClean} func={removeAllCart}>
          Clean cart
        </Button>
        <div className={styles.sumTotal}>
          <div className={styles.sumTotalBlock}>
            Total: <strong>{sumTotal.toFixed(2)} $</strong>
          </div>
        </div>
        <Button className={styles.buttonOrder}>ORDER</Button>
      </div>
    </div>
  );
};
