import { useContext, useState } from "react";
import { Button } from "../button/button";
import { Rating } from "../rating/rating";
import styles from "./productFeedback.module.css";
import { Review } from "../review/review";
import { UserContext } from "../../App";

export const ProductFeedback = ({
  product,
  addNewReview,
  reviewList,
  isLoading,
}) => {
  const { activeUser } = useContext(UserContext);
  const [showReviews, setShowReviews] = useState(false);

  const hasUserReview = reviewList?.some(
    (review) => review.user_name === activeUser?.login,
  );

  if (isLoading) {
    return (
      <div className={styles.ratingBlock}>
        <Rating product={product} />
      </div>
    );
  }

  return (
    <div className={styles.productFeedback}>
      <div>
        <div className={styles.ratingBlock}>
          <Rating product={product} />
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
