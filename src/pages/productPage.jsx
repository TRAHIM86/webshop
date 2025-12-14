import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Requests from "../requests";
import { ProductImg } from "../components/productImg/productImg";
import { ProductItem } from "../components/productItem/productItem";

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

  console.log("productId ", productId);
  console.log("currentProduct ", currentProduct);

  if (!currentProduct) {
    return (
      <div>
        <div>No product</div>
      </div>
    );
  }

  return (
    <ProductItem product={currentProduct} key={currentProduct.id}></ProductItem>
  );
};
