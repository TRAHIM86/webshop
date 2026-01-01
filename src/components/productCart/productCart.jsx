import react, { useContext, useState } from "react";
import styles from "./productCart.module.css";

import { Link } from "react-router-dom";
import { ProductImg } from "../productImg/productImg";
import { Arrow } from "../arrow/arrow";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ProductCart = ({ product }) => {
  const maxNum = 5;
  const [currentNum, setCurrentNum] = useState(1);

  function prevPhoto() {
    function checkNum(num) {
      if (num < 1) {
        num = maxNum;
      }

      const isImg = new Image();

      // Пробуем оба формата
      isImg.src = `/imgs/${product.name}/${num}.jpg`;

      isImg.onload = () => setCurrentNum(num);

      isImg.onerror = () => checkNum(num - 1);
    }

    checkNum(currentNum - 1);
  }

  function nextPhoto() {
    const nextNum = currentNum + 1;

    const isImg = new Image();
    isImg.src = `/imgs/${product.name}/${nextNum}.jpg`;

    isImg.onload = () => {
      setCurrentNum(nextNum);
    };

    isImg.onerror = () => {
      setCurrentNum(1);
    };
  }

  return (
    <div key={product.id} className={styles.productCart}>
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
    </div>
  );
};
