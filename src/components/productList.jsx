import { ProductImg } from "./productImg";
import styles from "./productList.module.css";

export const ProductList = ({ products }) => {
  return (
    <div>
      <div className={styles.productList}>
        {products &&
          products.map((product) => {
            return (
              <div className={styles.productItem} key={product.id}>
                <div className={styles.productName}>{product.name}</div>
                <ProductImg productName={product.name} />
                <div
                  className={styles.productPrice}
                >{`${product.price} $`}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
