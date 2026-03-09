import styles from "./review.module.css";
import { Star } from "lucide-react";

export const Review = ({ review }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("ru-RU", {});
  };

  const countStars = Number(review.rating);

  const firstLetter = review.user_name.slice(0, 1).toUpperCase();
  console.log("fl: ", firstLetter);

  return (
    <div className={styles.review}>
      <div className={styles.nameDateReview}>
        <div className={styles.nameBlock}>
          <div className={styles.firstLetter}>{firstLetter}</div>
          <div>{review.user_name}</div>
        </div>

        <div>{formatDate(review.created_at)}</div>
      </div>
      <div>{review.review_text}</div>
      <div>
        {[...Array(countStars)].map((_, index) => (
          <Star size={16} stroke="orange" fill="orange" key={index} />
        ))}
      </div>
    </div>
  );
};
