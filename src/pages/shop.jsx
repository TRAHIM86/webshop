import react, { useState } from "react";
import styles from "./shop.module.css";
import { useQuery } from "@tanstack/react-query";

import { ProductList } from "../components/productlist/productList";
import Requests from "../requests";
import { ProductMenu } from "../components/productMenu/productMenu";
import { Pagination } from "../components/pagination/pagination";
import { SideBar } from "../components/sidebar/sidebar";

// получить "конкретные продукты"
async function fetchSelectedProducts(method, order, quantity, numPage, str) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return await Requests.getSelectedProducts(
    method,
    order,
    quantity,
    numPage,
    str
  );
}

// все продукты - возвращает количество продуктов
// по фильтру и количество страниц (для пагинации)
async function fetchAllProducts(str, quantity) {
  const allProducts = await Requests.getAllProducts(str, quantity);
  return allProducts;
}

export const Shop = () => {
  // метод сорт, порядок сорт
  const [sortMethod, setSortMethod] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // товаров на странице, текущая страница
  const [quantityProducts, setQuantityProducts] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // поисковая строка
  const [searchStr, setSearchStr] = useState("");

  // показать N товаров на странице
  function showQuantityProducts(value) {
    setQuantityProducts(value);
    setCurrentPage(1);
  }

  //всего продуктов
  const {
    data: allProducts,
    isLoading: isLoadingAllProducts,
    isError: isErrorAllProducts,
  } = useQuery({
    queryKey: ["allProducts", searchStr, quantityProducts],

    queryFn: () => fetchAllProducts(searchStr, quantityProducts),
  });

  // целевые продукты для страницы
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "products",
      sortMethod,
      sortOrder,
      quantityProducts,
      currentPage,
      searchStr,
    ],

    queryFn: () =>
      fetchSelectedProducts(
        sortMethod,
        sortOrder,
        quantityProducts,
        currentPage,
        searchStr
      ),
  });

  if (isError) return <div>Error</div>;

  return (
    <div className={styles.shop}>
      <ProductMenu
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        setCurrentPage={setCurrentPage}
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
        setSortOrder={setSortOrder}
        quantityProducts={quantityProducts}
        showQuantityProducts={showQuantityProducts}
        allProducts={allProducts}
      />

      <Pagination
        allProducts={allProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className={styles.mainShop}>
        <SideBar />
        {isLoading ? (
          <div>Loading products...</div>
        ) : isError ? (
          <div>Error...</div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
};
