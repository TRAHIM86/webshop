import react, { useEffect, useState } from "react";
import { ProductList } from "../components/productList";
import Requests from "../requests";
import { ProductMenu } from "../components/productMenu";

import { useQuery } from "@tanstack/react-query";
import { InputSearch } from "../components/inputSearch";

async function fetchProducts(method, order, str) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return await Requests.getAllProduct(method, order, str);
}

export const Shop = () => {
  // состояния: сортировка (имя, цена), порядок (возр, убыв), поиск (строка для фильтра)
  const [sortMethod, setSortMethod] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchStr, setSearchStr] = useState("");

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", sortMethod, sortOrder, searchStr],

    queryFn: () => fetchProducts(sortMethod, sortOrder, searchStr),
  });

  if (isError) return <div>Error</div>;

  return (
    <div>
      <InputSearch searchStr={searchStr} setSearchStr={setSearchStr} />

      <ProductMenu
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
        setSortOrder={setSortOrder}
      />

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
