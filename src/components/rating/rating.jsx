import Requests from "../../requests";
import styles from "./rating.module.css";
import { useQuery } from "@tanstack/react-query";
import { LoadingDots } from "../loadingDots/loadingDots";
import { Star } from "lucide-react";

export const Rating = ({ product }) => {
  async function fetchAverageRatingProductById(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return await Requests.getAverageRatingProductById(productId);
  }

  const { data: averageRating, isLoading } = useQuery({
    queryKey: ["averageRating", product.id],
    queryFn: () => fetchAverageRatingProductById(product.id),
  });

  if (isLoading) return <LoadingDots>...</LoadingDots>;

  return (
    <div className={styles.ratingBlock}>
      <div className={styles.starBlock}>
        <Star size={16} fill="orange" />
      </div>
      {averageRating ? averageRating.toFixed(2) : "No rating"}
    </div>
  );
};
