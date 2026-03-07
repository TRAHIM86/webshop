import { useState } from "react";
import { Button } from "../button/button";
import styles from "./sidebar.module.css";

export const SideBar = ({
  categories,
  setCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  // времененые значения minPrice и maxPrice, т.к.
  // при нажатии на "Filter" устанавливаются постоянные
  // и они улетают автоматом в запрос через react query
  const [tempMin, setTempMin] = useState(minPrice);
  const [tempMax, setTempMax] = useState(maxPrice);

  // массив хар категории для map (инпуты фильтраы)
  const ALL_CATEGORIES = [
    "football",
    "basketball",
    "running",
    "swimming",
    "tennis",
    "yoga",
  ];

  function fillCategories(category, val) {
    setCategories((prev) => {
      if (val) {
        return [...prev, category];
      } else {
        return prev.filter((cat) => cat !== category);
      }
    });
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterCategory}>
        <h3>Categories</h3>

        {ALL_CATEGORIES.map((cat) => (
          <label key={cat} className={styles.categoryLabel}>
            <input
              type="checkbox"
              checked={categories.includes(cat)}
              onChange={(e) => fillCategories(cat, e.target.checked)}
            />{" "}
            {cat}
          </label>
        ))}
      </div>
      <div className={styles.filterPrice}>
        <h4>Price</h4>
        <div className={styles.priceInputs}>
          <input
            className={styles.priceInput}
            type="number"
            value={tempMin}
            onChange={(e) => setTempMin(e.target.value)}
          />
          <input
            className={styles.priceInput}
            type="number"
            value={tempMax}
            onChange={(e) => setTempMax(e.target.value)}
          />
        </div>
        <Button
          className={styles.btnFilter}
          func={() => {
            setMinPrice(tempMin);
            setMaxPrice(tempMax);
          }}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};
