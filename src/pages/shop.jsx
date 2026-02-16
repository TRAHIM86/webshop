import { useState } from "react";
import styles from "./shop.module.css";
import { useQuery } from "@tanstack/react-query";

import { ProductList } from "../components/productlist/productList";
import Requests from "../requests";
import { ProductMenu } from "../components/productMenu/productMenu";
import { Pagination } from "../components/pagination/pagination";
import { SideBar } from "../components/sidebar/sidebar";
import { Spinner } from "../components/spinner/spinner";

// получить "конкретные продукты"
async function fetchSelectedProducts(
  method,
  order,
  quantity,
  numPage,
  str,
  categories,
  minPrice,
  maxPrice,
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return await Requests.getSelectedProducts(
    method,
    order,
    quantity,
    numPage,
    str,
    categories,
    minPrice,
    maxPrice,
  );
}

// все продукты - возвращает количество продуктов
// по фильтру и количество страниц (для пагинации)
async function fetchAllProducts(str, quantity, arrCategories, minP, maxP) {
  const allProducts = await Requests.getAllProducts(
    str,
    quantity,
    arrCategories,
    minP,
    maxP,
  );

  return allProducts;
}

export const Shop = ({ idActionProduct }) => {
  // метод сорт, порядок сорт
  const [sortMethod, setSortMethod] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // товаров на странице, текущая страница
  const [quantityProducts, setQuantityProducts] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // поисковая строка
  const [searchStr, setSearchStr] = useState("");

  // массив категорий для фильтра
  const [categories, setCategories] = useState([
    "football",
    "basketball",
    "running",
    "swimming",
    "tennis",
    "yoga",
  ]);

  // мин и макс цены для фильтра
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

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
    queryKey: [
      "allProducts",
      searchStr,
      quantityProducts,
      categories,
      minPrice,
      maxPrice,
    ],

    queryFn: () =>
      fetchAllProducts(
        searchStr,
        quantityProducts,
        categories,
        minPrice,
        maxPrice,
      ),
  });

  // целевые продукты для страницы
  const {
    data: products,
    isLoading: isLoadingPageProducts,
    isError: isErrorPageProducts,
  } = useQuery({
    queryKey: [
      "products",
      sortMethod,
      sortOrder,
      quantityProducts,
      currentPage,
      searchStr,
      categories,
      minPrice,
      maxPrice,
    ],

    queryFn: () =>
      fetchSelectedProducts(
        sortMethod,
        sortOrder,
        quantityProducts,
        currentPage,
        searchStr,
        categories,
        minPrice,
        maxPrice,
      ),
  });

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
        <SideBar
          categories={categories}
          setCategories={setCategories}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        {isLoadingPageProducts ? (
          <div>
            <Spinner />
            <p>Loading...</p>
          </div>
        ) : isErrorPageProducts ? (
          <div className={styles.error}>Error...</div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
};
