import { useContext, useState } from "react";
import styles from "./productItem.module.css";
import { CartContext, UserContext } from "../../App";

import { Link } from "react-router-dom";
import { ProductImg } from "../productImg/productImg";
import { Arrow } from "../arrow/arrow";
import { Button } from "../button/button";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Requests from "../../requests";

export const ProductItem = ({ product }) => {
  // актиный юзер (глобальный контекст)
  const { activeUser, setActiveUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  const maxNum = 5;
  const [currentNum, setCurrentNum] = useState(1);

  function prevPhoto() {
    function checkNum(num) {
      if (num < 1) {
        num = maxNum;
      }

      const isImg = new Image();

      // Пробуем оба формата
      isImg.src = `${
        process.env.PUBLIC_URL
      }/imgs/${product.name.toLowerCase()}/${num}.jpg`;

      isImg.onload = () => setCurrentNum(num);

      isImg.onerror = () => checkNum(num - 1);
    }

    checkNum(currentNum - 1);
  }

  function nextPhoto() {
    const nextNum = currentNum + 1;

    const isImg = new Image();
    isImg.src = `${
      process.env.PUBLIC_URL
    }/imgs/${product.name.toLowerCase()}/${nextNum}.jpg`;

    isImg.onload = () => {
      setCurrentNum(nextNum);
    };

    isImg.onerror = () => {
      setCurrentNum(1);
    };
  }

  // добавить/удалить товар в корзину. Используем Map
  // чтобы были только уникальные id товара. Количество
  // будет регулироваться на странице корзины
  function toggleProductInCart(productId) {
    if (!activeUser) {
      setCart((prev) => {
        const newCart = new Map(prev);

        if (newCart.has(productId)) {
          newCart.delete(productId);
        } else {
          newCart.set(productId, 1);
        }

        console.log("newCart :", newCart);

        const cartData = Object.fromEntries(newCart);
        localStorage.setItem("cartWebshop", JSON.stringify(cartData));

        return newCart;
      });

      return;
    }

    setCart((prev) => {
      const newCart = new Map(prev);

      if (newCart.has(productId)) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, 1);
      }

      Requests.putCartByUserId(activeUser.id, newCart);
      return newCart;
    });
  }

  return (
    <div key={product.id} className={styles.productItem}>
      <div>
        <Link to={`/products/${product.id}`}>
          <div>{product.name}</div>
        </Link>

        <div className={styles.arrows}>
          <Arrow funcOnClick={prevPhoto}>
            <ChevronLeft size={16} />
          </Arrow>
          <Link className={styles.linkPhoto} to={`/products/${product.id}`}>
            <div className={styles.containerImg}>
              <ProductImg productName={product.name} num={currentNum} />
            </div>
          </Link>
          <Arrow funcOnClick={nextPhoto}>
            <ChevronRight size={16} />
          </Arrow>
        </div>

        <div>{`${product.price.toFixed(2)} $`}</div>
        <Button func={() => toggleProductInCart(product.id)}>
          {cart.has(product.id) ? "Remove" : "Add"}
        </Button>
      </div>
    </div>
  );
};
