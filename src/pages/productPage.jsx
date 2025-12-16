import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Requests from "../requests";
import { ProductImg } from "../components/productImg/productImg";
import { ProductItem } from "../components/productItem/productItem";

import { useQuery } from "@tanstack/react-query";

export const ProductPage = () => {
  let { productId } = useParams();

  // приводим к числу (в запросе надо число)
  productId = Number(productId);

  async function fetchProductById(id) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return await Requests.getProductById(id);
  }

  const {
    data: productById,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentProduct", productId],
    queryFn: () => fetchProductById(productId),
  });

  return isLoading ? (
    <div>Loading product...</div>
  ) : isError ? (
    <div>Error...</div>
  ) : (
    <ProductItem product={productById} key={productById.id}></ProductItem>
  );
};
