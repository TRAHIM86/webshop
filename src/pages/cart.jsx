import { useContext, useState } from "react";
import { CartContext, IdDiscountContext, UserContext } from "../App";
import Requests from "../requests";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/button/button";
import styles from "./cart.module.css";
import { ProductCart } from "../components/productCart/productCart";
import { SumProduct } from "../components/sumProduct/sumProduct";
import { Plus, Minus } from "lucide-react";
import { PROMOCODES } from "../constants/promoCode";
import toast, { Toaster } from "react-hot-toast";
import { DISCOUNTPERSENT } from "../constants/discountPercent";

export const Cart = () => {
  // актиный юзер (глобальный контекст)
  const { activeUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const { idActionProduct } = useContext(IdDiscountContext);
  const discountPercent = DISCOUNTPERSENT;

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
    queryKey: ["cartProducts"],

    queryFn: () => {
      const keys = [...cart.keys().map((id) => Number(id))];
      return fetchCartProduct(keys);
    },
    enabled: cart.size > 0,
    keepPreviousData: true,
  });

  // добавить количество товара по productId
  async function addQuantity(productId) {
    setCart((prev) => {
      const newCart = new Map(prev);
      newCart.set(productId, newCart.get(productId) + 1);

      if (activeUser) {
        Requests.putCartByUserId(activeUser.id, newCart);
      }

      return newCart;
    });
  }

  // удалить количество товара по productId
  function removeQuantity(productId) {
    setCart((prev) => {
      const newCart = new Map(prev);

      if (newCart.get(productId) > 1) {
        newCart.set(productId, newCart.get(productId) - 1);
      } else {
        newCart.delete(productId);
      }

      if (activeUser) {
        Requests.putCartByUserId(activeUser.id, newCart);
      }

      return newCart;
    });
  }

  // добавить/удалить товар в корзину. Используем Map
  // чтобы были только уникальные id товара. Количество
  // будет регулироваться на странице корзины
  function removeProductToCart(productId) {
    setCart((prev) => {
      const newCart = new Map(prev);
      newCart.delete(productId);

      if (activeUser) {
        Requests.putCartByUserId(activeUser.id, newCart);
      }
      return newCart;
    });
  }

  function removeAllCart() {
    setCart((prev) => {
      const newCart = new Map();

      if (activeUser) {
        Requests.putCartByUserId(activeUser.id, newCart);
      }
      return newCart;
    });
  }

  // функция проверки промокода
  function applyPromoCode(code) {
    // получить объект промокода по коду
    const promoCodeObj = PROMOCODES.find((item) => item.code === code);

    if (!promoCodeObj) {
      toast.error("Promocode not found!", {
        className: styles.errorPromoCode,
        duration: 2000,
      });
    } else {
      toast.success("Promocode applied!", {
        className: styles.successPromoCode,
        duration: 2000,
      });
    }

    setAppliedPromoCode(promoCodeObj);

    setPromoCode("");
  }

  function removePromoCode() {
    setPromoCode("");
    setAppliedPromoCode(null);
    toast.success("Promocode removed!", {
      className: styles.successPromoCode,
      duration: 2000,
    });
  }

  // cartProducts - продукты после запроса при
  // переходе на страницу. Показать только те, что
  // есть в cart Map(). Нужно для того, что если при
  // кликах -1 доходим до нуля, то он удаляется с Map
  // и соотв не проходит фильтр (не отображ в корзине)

  const sumTotal = [...cart.entries()].reduce((total, [id, qty]) => {
    const product = cartProducts?.find((p) => p.id === id);

    const oldSum = (product?.price || 0).toFixed(2) * qty;

    const isDiscountProduct = product?.id === idActionProduct;

    const isPromoCategory =
      appliedPromoCode &&
      (appliedPromoCode?.categoryes === product?.category ||
        appliedPromoCode?.categoryes === "all");

    const disSum = isDiscountProduct
      ? isPromoCategory && appliedPromoCode
        ? oldSum * (1 - DISCOUNTPERSENT / 100 - appliedPromoCode.discount / 100)
        : oldSum * (1 - DISCOUNTPERSENT / 100)
      : isPromoCategory
        ? oldSum * (1 - appliedPromoCode.discount / 100)
        : oldSum;

    return total + disSum;
  }, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.cartItems}>
        {cartProducts
          ?.filter((product) => cart.has(product.id))
          .map((product) => {
            const quantity = cart.get(product.id);

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

                  <SumProduct
                    product={product}
                    quantity={quantity}
                    appliedPromoCode={appliedPromoCode}
                  />
                  <Button func={() => removeProductToCart(product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}

        {cart.size === 0 && (
          <div className={styles.emptyCart}>Your shopping cart is empty</div>
        )}
      </div>
      <div className={styles.orderBlock}>
        <Button className={styles.buttonClean} func={removeAllCart}>
          Clean cart
        </Button>
        <div className={styles.promoCodeBlock}>
          <input
            className={styles.promoCodeInput}
            type="text"
            value={promoCode}
            placeholder="Promocode"
            onChange={(e) => {
              setPromoCode(e.target.value);
            }}
          />
          <div className={styles.buttonsPromoCode}>
            <Button
              className={styles.buttonClean}
              func={() => applyPromoCode(promoCode)}
            >
              Apply
            </Button>
            <Button className={styles.buttonClean} func={removePromoCode}>
              Remove
            </Button>
          </div>
        </div>

        <div className={styles.sumTotal}>
          <div className={styles.sumTotalBlock}>
            Total: <strong>{sumTotal.toFixed(2)} $</strong>
          </div>
        </div>
        <Button className={styles.buttonOrder}>ORDER</Button>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};
