import react from "react";

export const ProductMenu = ({
  sortMethod,
  setSortMethod,
  setSortOrder,
  quantityProducts,
  setQuantityProducts,
}) => {
  return (
    <div>
      <h1>WEBSHOP</h1>
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
        onChange={(e) => setQuantityProducts(e.target.value)}
      >
        <option value="8">8</option>
        <option value="12">12</option>
      </select>
    </div>
  );
};
