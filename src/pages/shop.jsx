import react, { useEffect, useState } from "react";
import { ProductList } from "../components/productList";
import Requests from "../requests";
import { ProductMenu } from "../components/productMenu";

import { useQuery } from "@tanstack/react-query";

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

async function fetchAllProducts(str) {
  const allProducts = await Requests.getAllProducts(str);
  console.log("allProducts ", allProducts);
  return allProducts;
}

export const Shop = () => {
  // состояния: сортировка (имя, цена), порядок (возр, убыв), поиск (строка для фильтра)
  const [sortMethod, setSortMethod] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [quantityProducts, setQuantityProducts] = useState(8);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStr, setSearchStr] = useState("");

  //всего продуктов
  const {
    data: allProducts,
    isLoading: isLoadingAllProducts,
    isError: isErrorAllProducts,
  } = useQuery({
    queryKey: ["allProducts", searchStr],

    queryFn: () => fetchAllProducts(searchStr),
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
    <div>
      <ProductMenu
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
        setSortOrder={setSortOrder}
        quantityProducts={quantityProducts}
        setQuantityProducts={setQuantityProducts}
      />

      <div>All products: {allProducts?.length || 0}</div>

      {isLoading ? (
        <div>Loading products...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};
