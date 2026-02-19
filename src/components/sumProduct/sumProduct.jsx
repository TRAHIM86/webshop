import { useContext } from "react";
import styles from "./sumProduct.module.css";
import { IdDiscountContext } from "../../App";
import { DISCOUNTPERSENT } from "../../constants/discountPercent";

export const SumProduct = ({ product, quantity, appliedPromoCode }) => {
  const { idActionProduct } = useContext(IdDiscountContext);
  const discountPercent = DISCOUNTPERSENT;

  const oldSum = (product.price * quantity).toFixed(2);

  const isPromoCategory =
    appliedPromoCode?.categoryes === product.category ||
    appliedPromoCode?.categoryes === "all";

  const isDiscountProduct = product?.id === idActionProduct;

  const disSum = isDiscountProduct
    ? isPromoCategory && appliedPromoCode
      ? oldSum * (1 - DISCOUNTPERSENT / 100 - appliedPromoCode.discount / 100)
      : oldSum * (1 - DISCOUNTPERSENT / 100)
    : isPromoCategory
      ? oldSum * (1 - appliedPromoCode.discount / 100)
      : null;

  console.log("disSum :", disSum);

  return (
    <div className={styles.sum}>
      {disSum ? (
        <div>
          <div className={styles.oldpPrice}>{oldSum + " $"}</div>
          <div>{disSum + " $"}</div>
        </div>
      ) : (
        oldSum + " $"
      )}
    </div>
  );
};
