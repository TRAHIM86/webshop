import React, { useState } from "react";
import Requests from "./requests";

function App() {
  const [products, setProducts] = useState([]);

  async function showProducts() {
    const allProducts = await Requests.getAllProduct();
    setProducts(allProducts);
  }

  return (
    <div>
      <button onClick={showProducts}>WEBSHOP</button>
      {products &&
        products.map((product) => {
          return <div key={product.id}>{product.name}</div>;
        })}
    </div>
  );
}

export default App;
