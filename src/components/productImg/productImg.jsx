import React from "react";
import styles from "./productImg.module.css";

export const ProductImg = ({ productName, num }) => {
  const imgPath = `/imgs/${productName.toLowerCase()}/`;

  return (
    <img
      className={styles.image}
      src={`${imgPath}/${num}.jpeg`}
      alt={productName}
    />
  );
};
