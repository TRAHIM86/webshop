import react, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductImg } from "../productImg";
import styles from "./productItem.module.css";

export const ProductItem = ({ product }) => {
  const maxNum = 5;
  const [currentNum, setCurrentNum] = useState(1);

  function nextPhoto() {
    const nextNum = currentNum + 1;

    const isImg = new Image();
    isImg.src = `/imgs/${product.name}/${nextNum}.jpeg`;

    isImg.onload = () => {
      setCurrentNum(nextNum);
    };

    isImg.onerror = () => {
      setCurrentNum(1);
    };
  }

  function prevPhoto() {
    function checkNum(num) {
      if (num < 1) {
        num = maxNum;
      }

      const isImg = new Image();
      isImg.onload = () => setCurrentNum(num);
      isImg.onerror = () => checkNum(num - 1);
      isImg.src = `/imgs/${product.name}/${num}.jpeg`;
    }

    checkNum(currentNum - 1);
  }

  return (
    <div key={product.id} className={styles.productItem}>
      <div>
        <div className={styles.arrows}>
          <div onClick={prevPhoto}>←</div>
          <div onClick={nextPhoto}>→</div>
        </div>

        <Link to={`/${product.id}`}>
          <div>{product.name}</div>
          <ProductImg productName={product.name} num={currentNum} />
          <div>{`${product.price} $`}</div>
        </Link>
      </div>
    </div>
  );
};
