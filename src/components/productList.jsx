import { useEffect, useState } from "react";
import Requests from "../requests";
import { ProductImg } from "./productImg";
import styles from "./productList.module.css";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(true);

  const [sortMethod, setSortMethod] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  console.log("sort: ", sortMethod, sortOrder);

  useEffect(() => {
    async function fetchProducts(sortBy, sortOrder) {
      const allProducts = await Requests.getAllProduct(sortBy, sortOrder);
      setProducts(allProducts);
    }

    fetchProducts(sortMethod, sortOrder);
  }, [sortMethod, sortOrder]);

  return (
    <div>
      <h1>WEBSHOP</h1>
      Sort by :
      <select
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}
      >
        <option value="name">name</option>
        <option value="price">price</option>
      </select>
      <button onClick={() => setSortOrder("asc")}>Asc</button>
      <button onClick={() => setSortOrder("desc")}>Des</button>
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
