import react from "react";
import { InputSearch } from "../inputSearch/inputSearch";
import { Select } from "../select/select";

export const ProductMenu = ({
  searchStr,
  setSearchStr,
  setCurrentPage,
  sortMethod,
  setSortMethod,
  setSortOrder,
  quantityProducts,
  showQuantityProducts,
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
      <Select
        value={sortMethod}
        optionList={[{ value: "name" }, { value: "price" }]}
        funcOnChange={setSortMethod}
      />
      <button onClick={() => setSortOrder("asc")}>Asc</button>
      <button onClick={() => setSortOrder("desc")}>Des</button>
      Show by :
      <Select
        value={quantityProducts}
        optionList={[{ value: 6 }, { value: 12 }]}
        funcOnChange={showQuantityProducts}
      ></Select>
    </div>
  );
};
