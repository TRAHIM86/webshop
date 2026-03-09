import styles from "./productImg.module.css";

export const ProductImg = ({ productName, num, className }) => {
  const imgPath = `${
    process.env.PUBLIC_URL
  }/imgs/${productName.toLowerCase()}/`;

  return (
    <img
      className={`${styles.image} ${className}`}
      src={`${imgPath}/${num}.jpg`}
      alt={`${productName}${num}`}
    />
  );
};
