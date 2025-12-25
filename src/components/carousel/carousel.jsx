import react from "react";
import { ProductImg } from "../productImg/productImg";
import styles from "./carousel.module.css";

export const Carousel = ({
  product,
  arrNumsPhoto,
  currentNum,
  setCurrentNum,
}) => {
  console.log(currentNum);

  function changeMainPhoto(numPhohto) {
    setCurrentNum(numPhohto);
  }

  return (
    <div className={styles.carousel}>
      {arrNumsPhoto.map((num) => {
        return (
          <div
            className={`${styles.litlePhoto} ${
              currentNum === num ? styles.active : ""
            }`}
            key={num}
            onClick={() => changeMainPhoto(num)}
          >
            <ProductImg productName={product.name} num={num} />
          </div>
        );
      })}
    </div>
  );
};
