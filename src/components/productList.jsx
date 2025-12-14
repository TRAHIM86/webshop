import { Link } from "react-router-dom";
import { ProductImg } from "./productImg";
import styles from "./productList.module.css";
import { ProductItem } from "./productItem/productItem";

export const ProductList = ({ products }) => {
  return (
    <div>
      <div className={styles.productList}>
        {products &&
          products.map((product) => {
            return (
              <ProductItem product={product} key={product.id}></ProductItem>
            );
          })}
      </div>
    </div>
  );
};
