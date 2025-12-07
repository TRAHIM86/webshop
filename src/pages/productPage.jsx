import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Requests from "../requests";
import { ProductImg } from "../components/productImg";

export const ProductPage = () => {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    async function fetchProductById(id) {
      const findedProduct = await Requests.getProductById(id);
      setCurrentProduct(findedProduct);
    }

    fetchProductById(productId);
  }, [productId]);

  if (!currentProduct) {
    return (
      <div>
        <div>No product</div>
      </div>
    );
  }

  return (
    <div>
      <div>{currentProduct.name}</div>
      <ProductImg productName={currentProduct.name} />
      <div>{`${currentProduct.price} $`}</div>
    </div>
  );
};
