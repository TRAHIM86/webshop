import React from "react";
import styles from "./productImg.module.css";

export const ProductImg = ({ productName, num }) => {
  const imgPath = `/imgs/${productName.toLowerCase()}/`;

  return (
    <div className={styles.containerImg}>
      <img
        className={styles.mainProductImg}
        src={`${imgPath}/${num}.jpeg`}
        alt={productName}
      />
    </div>
  );
};
