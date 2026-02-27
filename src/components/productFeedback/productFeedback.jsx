import { useContext, useState } from "react";
import Requests from "../../requests";
import { Button } from "../button/button";
import { Rating } from "../rating/rating";
import styles from "./productFeedback.module.css";
import { useQuery } from "@tanstack/react-query";
import { LoadingDots } from "../loadingDots/loadingDots";
import { Review } from "../review/review";
import { UserContext } from "../../App";

export const ProductFeedback = ({ product, addNewReview }) => {
  const { activeUser } = useContext(UserContext);
  const [showReviews, setShowReviews] = useState(false);

  const { data: reviewList, isLoading } = useQuery({
    queryKey: ["reviewList", product.id],
    queryFn: () => fetchAllReviews(product.id),
    enabled: !!activeUser,
  });

  const hasUserReview = reviewList?.some(
    (review) => review.user_name === activeUser?.login,
  );

  console.log("hasUserReview :", hasUserReview);

  async function fetchAllReviews(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await Requests.getAllReviewsProduct(productId);
  }

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
