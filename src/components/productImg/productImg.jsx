import React from "react";
import styles from "./productImg.module.css";

export const ProductImg = ({ productName, num }) => {
  const imgPath = `${
    process.env.PUBLIC_URL
  }/imgs/${productName.toLowerCase()}/`;

  return (
    <img
      className={styles.image}
      src={`${imgPath}/${num}.jpg`}
      alt={`${productName}${num}`}
    />
  );
};
