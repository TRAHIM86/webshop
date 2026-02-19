import { useEffect, useState } from "react";
import Requests from "../../requests";

export const Rating = ({ product }) => {
  const [averageRating, setAverageRating] = useState(null);

  async function getRatingProduct(productId) {
    const averageRating = await Requests.getAverageRatingProductById(productId);
    setAverageRating(averageRating);
  }

  useEffect(() => {
    getRatingProduct(product.id);
  }, [product.id]);

  return <div>{averageRating ? Number(averageRating).toFixed(1) : ""}</div>;
};
