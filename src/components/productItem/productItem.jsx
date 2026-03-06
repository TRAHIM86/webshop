import { useContext, useState } from "react";
import styles from "./productItem.module.css";
import { CartContext, IdDiscountContext, UserContext } from "../../App";

import { Link } from "react-router-dom";
import { ProductImg } from "../productImg/productImg";
import { Arrow } from "../arrow/arrow";
import { Button } from "../button/button";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Requests from "../../requests";
import { DISCOUNTPERSENT } from "../../constants/discountPercent";
import { Rating } from "../rating/rating";
import { useQuery } from "@tanstack/react-query";

export const ProductItem = ({ product, setSelectedProduct }) => {
  // актиный юзер (глобальный контекст)
  const { activeUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { idActionProduct } = useContext(IdDiscountContext);
  const discountPercent = DISCOUNTPERSENT;

  async function fetchAverageRatingProductById(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return await Requests.getAverageRatingProductById(productId);
  }

  const {
    data: averageRating,
    isLoading: isLoadingAverageRating,
    isFetching: isFetchingAverageRating,
  } = useQuery({
    queryKey: ["averageRating", product.id],
    queryFn: () => fetchAverageRatingProductById(product.id),
  });

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
    setCart((prev) => {
      const newCart = new Map(prev);

      if (newCart.has(productId)) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, 1);
      }

      if (!activeUser) {
        localStorage.setItem(
          "cartWebshop",
          JSON.stringify(Object.fromEntries(newCart)),
        );
      } else {
        Requests.putCartByUserId(activeUser.id, newCart);
      }

      return newCart;
    });
  }

  return (
    <div key={product.id} className={styles.productItem}>
      <div>
        <Link to={`/products/${product.id}`}>
          <div className={styles.productName}>{product.name}</div>
        </Link>

        <div className={styles.arrows}>
          <Arrow funcOnClick={prevPhoto}>
            <ChevronLeft size={24} />
          </Arrow>
          <Link className={styles.linkPhoto} to={`/products/${product.id}`}>
            <div className={styles.containerImg}>
              <ProductImg productName={product.name} num={currentNum} />
            </div>
          </Link>
          <Arrow funcOnClick={nextPhoto}>
            <ChevronRight size={24} />
          </Arrow>
        </div>
        {product.id === idActionProduct ? (
          <div className={styles.priceBlock}>
            {" "}
            <div className={styles.redText}>
              {`${(product.price * (1 - discountPercent / 100)).toFixed(2)} $`}
            </div>
            <div
              className={styles.crossText}
            >{`${product.price.toFixed(2)} $`}</div>
          </div>
        ) : (
          <div className={styles.priceBlock}>
            {" "}
            <div>{`${product.price.toFixed(2)} $`}</div>
          </div>
        )}

        <Rating
          averageRating={averageRating}
          isLoadingAverageRating={isLoadingAverageRating}
        />
        <Button func={() => setSelectedProduct(product)}>Reviews</Button>

        <Button func={() => toggleProductInCart(product.id)}>
          {cart.has(product.id) ? "Remove" : "Add"}
        </Button>
      </div>
    </div>
  );
};
