import react, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductImg } from "../productImg/productImg";
import styles from "./productItem.module.css";
import { Arrow } from "../arrow/arrow";

export const ProductItem = ({ product }) => {
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
    <div key={product.id} className={styles.productItem}>
      <div>
        <div className={styles.arrows}>
          <Arrow funcOnClick={prevPhoto}>←</Arrow>
          <Arrow funcOnClick={nextPhoto}>→</Arrow>
        </div>

        <Link to={`/products/${product.id}`}>
          <div>{product.name}</div>
          <div className={styles.containerImg}>
            <ProductImg productName={product.name} num={currentNum} />
          </div>
          <div>{`${product.price} $`}</div>
          <button>Add</button>
        </Link>
      </div>
    </div>
  );
};
