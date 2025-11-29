import { useEffect, useState } from "react";
import Requests from "../requests";
import { ProductImg } from "./productImg";
import styles from "./productList.module.css";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await Requests.getAllProduct();
      console.log("RAW DATA:", allProducts);
      setProducts(allProducts);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>WEBSHOP</h1>
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
