import styles from "./sumProduct.module.css";

export const SumProduct = ({ product, sum, appliedPromoCode }) => {
  const discountedSum = (sum * (1 - appliedPromoCode?.discount / 100)).toFixed(
    2,
  );

  console.log("apCode :", appliedPromoCode);
  console.log("product :", product);

  const isPromoCategory =
    appliedPromoCode?.categoryes === product.category ||
    appliedPromoCode?.categoryes === "all";

  console.log(isPromoCategory);

  return (
    <div className={styles.sum}>
      {isPromoCategory ? (
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
