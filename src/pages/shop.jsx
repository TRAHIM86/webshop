import react, { useEffect, useState } from "react";
import { ProductList } from "../components/productList";
import Requests from "../requests";
import { ProductMenu } from "../components/productMenu";

export const Shop = () => {
  const [products, setProducts] = useState([]);

  const [sortMethod, setSortMethod] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchStr, setSearchStr] = useState("");
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts(method, order, str) {
      const allProducts = await Requests.getAllProduct(method, order, str);
      setProducts(allProducts);
    }

    fetchProducts(sortMethod, sortOrder, searchStr);
  }, [sortMethod, sortOrder, searchStr]);

  return (
    <div>
      <input
        type="text"
        value={searchStr}
        placeholder="Search..."
        onChange={(e) => setSearchStr(e.target.value)}
      />

      <ProductMenu
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
        setSortOrder={setSortOrder}
      />
      <ProductList products={products} />
    </div>
  );
};
