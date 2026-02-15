import styles from "./sumProduct.module.css";

export const SumProduct = ({ sum, appliedPromoCode }) => {
  const discountedSum = (sum * (1 - appliedPromoCode?.discount / 100)).toFixed(
    2,
  );

  return (
    <div className={styles.sum}>
      {appliedPromoCode ? (
        <div>
          <div className={styles.oldpPrice}>{sum + " $"}</div>
          <div>{discountedSum + " $"}</div>
        </div>
      ) : (
        sum + " $"
      )}
    </div>
  );
};
