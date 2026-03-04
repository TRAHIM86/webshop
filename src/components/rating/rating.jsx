import styles from "./rating.module.css";
import { Star } from "lucide-react";

export const Rating = ({ averageRating }) => {
  return (
    <div className={styles.ratingBlock}>
      <div className={styles.starBlock}>
        <Star size={16} fill="orange" />
      </div>
      {averageRating ? averageRating.toFixed(2) : "No rating"}
    </div>
  );
};
