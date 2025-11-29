import React from "react";
import styles from "./productImg.module.css";

export const ProductImg = ({ productName }) => {
  const imgPath = `/imgs/${productName.toLowerCase()}/1.jpg`;

  return (
    <img className={styles.mainProductImg} src={imgPath} alt={productName} />
  );
};
