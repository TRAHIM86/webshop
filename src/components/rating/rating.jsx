import { useEffect, useState } from "react";
import Requests from "../../requests";
import styles from "./rating.module.css";
import { useQuery } from "@tanstack/react-query";

export const Rating = ({ product }) => {
  const { data: averageRating, isLoading } = useQuery({
    queryKey: ["averageRating", product.id],
    queryFn: () => Requests.getAverageRatingProductById(product.id),
  });

  if (isLoading) return <div className={styles.blueText}>...</div>;

  return (
    <div className={styles.blueText}>
      {averageRating ? averageRating.toFixed(2) : "No rating"}
    </div>
  );
};
