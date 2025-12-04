import react from "react";

export const ProductMenu = ({ sortMethod, setSortMethod, setSortOrder }) => {
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
    </div>
  );
};
