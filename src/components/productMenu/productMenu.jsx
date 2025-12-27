import react from "react";
import { InputSearch } from "../inputSearch/inputSearch";
import { Select } from "../select/select";
import styles from "./productMenu.module.css";

export const ProductMenu = ({
  searchStr,
  setSearchStr,
  setCurrentPage,
  sortMethod,
  setSortMethod,
  setSortOrder,
  quantityProducts,
  showQuantityProducts,
  allProducts,
}) => {
  return (
    <div className={styles.productMenu}>
      <InputSearch
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        setCurrentPage={setCurrentPage}
      />
      <div className={styles.selectsBlock}>
        <div>All: {allProducts?.total || 0}</div>
        <div style={{ border: "2px solid red" }}>
          Sort by{" "}
          <Select
            value={sortMethod}
            optionList={[{ value: "name" }, { value: "price" }]}
            funcOnChange={setSortMethod}
          />
        </div>

        <div style={{ border: "2px solid red" }}>
          <button
            className={styles.buttonSort}
            onClick={() => setSortOrder("asc")}
          >
            ▲
          </button>
          <button
            className={styles.buttonSort}
            onClick={() => setSortOrder("desc")}
          >
            ▼
          </button>
        </div>

        <div style={{ border: "2px solid red" }}>
          Show by{" "}
          <Select
            value={quantityProducts}
            optionList={[{ value: 6 }, { value: 12 }]}
            funcOnChange={showQuantityProducts}
          ></Select>
        </div>
      </div>
    </div>
  );
};
