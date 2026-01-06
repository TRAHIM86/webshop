import { useState } from "react";
import styles from "./sidebar.module.css";
import { Button } from "../button/button";

export const SideBar = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  console.log(minPrice, maxPrice);

  function setValueMin(val) {
    setMinPrice(val);
  }

  function setValueMax(val) {
    setMaxPrice(val);
  }

  return (
    <div className={styles.sidebar}>
      <h3>Filtres</h3>
      <div className={styles.filterCategory}>
        <h4>Categories</h4>
        <label>
          <input type="checkbox" />
          Footbal
        </label>
        <label>
          <input type="checkbox" />
          Basketball
        </label>
      </div>
      <div className={styles.filterPrice}>
        <h4>Price</h4>
        <div className={styles.priceInputs}>
          <input
            className={styles.priceInput}
            type="number"
            value={minPrice}
            onChange={(e) => setValueMin(e.target.value)}
          />
          <input
            className={styles.priceInput}
            type="number"
            value={maxPrice}
            onChange={(e) => setValueMax(e.target.value)}
          />
        </div>
        <Button func={() => console.log("FILTER")}>Filter</Button>
      </div>
    </div>
  );
};
