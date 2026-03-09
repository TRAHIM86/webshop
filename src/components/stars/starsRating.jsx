import { Star } from "lucide-react";
import styles from "./starsRating.module.css";

export const StarsRating = ({ num, rating, funcOnClick }) => {
  return (
    <div>
      {[...Array(num)].map((_, index) => (
        <Star
          className={styles.starRating}
          key={index}
          fill={index < rating ? "orange" : "none"}
          onClick={() => funcOnClick(index)}
        />
      ))}
    </div>
  );
};
