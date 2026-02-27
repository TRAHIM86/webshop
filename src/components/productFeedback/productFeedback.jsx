import { useState } from "react";
import { Button } from "../button/button";
import { Rating } from "../rating/rating";
import styles from "./productFeedback.module.css";
import { Review } from "../review/review";

export const ProductFeedback = ({
  product,
  addNewReview,
  reviewList,
  hasUserReview,
  averageRating,
}) => {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className={styles.productFeedback}>
      <div>
        <div className={styles.ratingBlock}>
          <Rating product={product} averageRating={averageRating} />
        </div>

        {hasUserReview ? (
          "You have already made a review"
        ) : (
          <Button func={() => addNewReview()}>"Add review"</Button>
        )}

        <Button func={() => setShowReviews(true)}>Reviews</Button>
      </div>

      <div>
        {showReviews && (
          <div>
            {reviewList?.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
