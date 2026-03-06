import { LoadingDots } from "../loadingDots/loadingDots";
import styles from "./rating.module.css";
import { Star } from "lucide-react";

export const Rating = ({
  averageRating,
  isLoadingAverageRating,
  isFetchingAverageRating,
}) => {
  return (
    <div className={styles.ratingBlock}>
      {isLoadingAverageRating || isFetchingAverageRating ? (
        <LoadingDots />
      ) : (
        <>
          <div className={styles.starBlock}>
            <Star size={16} fill="orange" />
          </div>{" "}
          {averageRating ? averageRating.toFixed(2) : "No rating"}
        </>
      )}
    </div>
  );
};
