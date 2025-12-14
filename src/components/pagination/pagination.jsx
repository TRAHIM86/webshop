import react from "react";
import styles from "./pagination.module.css";

export const Pagination = ({ allProducts, currentPage, setCurrentPage }) => {
  return (
    <div className={styles.pagination}>
      {allProducts
        ? allProducts.pageNumbers.map((num, index) => (
            <div
              className={`${styles.numPage} ${
                currentPage === index + 1 ? styles.active : ""
              }`}
              key={num}
              onClick={() => setCurrentPage(index + 1)}
            >
              {num}
            </div>
          ))
        : "0"}
    </div>
  );
};
