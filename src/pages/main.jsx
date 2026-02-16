import react, { useEffect, useState } from "react";
import Requests from "../requests";

export const Main = ({ idActionProduct }) => {
  const [actionProduct, setActionProduct] = useState(null);

  useEffect(() => {
    async function getActionProduct(id) {
      if (id) {
        const product = await Requests.getProductById(id);
        setActionProduct(product);
      }
    }

    getActionProduct(idActionProduct);
  }, [idActionProduct]);

  return (
    <div>
      <h2>Main</h2>
      <div>{actionProduct?.name}</div>
      <div>{actionProduct?.price}</div>
      <div>{actionProduct?.category}</div>
    </div>
  );
};
