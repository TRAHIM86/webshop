import react from "react";
import { InputSearch } from "../components/inputSearch";

export const ProductMenu = ({
  searchStr,
  setSearchStr,
  setCurrentPage,
  sortMethod,
  setSortMethod,
  setSortOrder,
  quantityProducts,
  setQuantityProducts,
}) => {
  return (
    <div>
      <h1>WEBSHOP</h1>
      <InputSearch
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        setCurrentPage={setCurrentPage}
      />
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
      Show by :
      <select
        value={quantityProducts}
        onChange={(e) => {
          setQuantityProducts(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="6">6</option>
        <option value="12">12</option>
      </select>
    </div>
  );
};
