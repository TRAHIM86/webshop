import { useState } from "react";
import { Button } from "../button/button";
import { Rating } from "../rating/rating";
import styles from "./productFeedback.module.css";
import { Review } from "../review/review";
import { PopupCorrectReview } from "../popupCorrectReview/popupCorrectReview";
import Requests from "../../requests";
import { useQuery } from "@tanstack/react-query";
import { LoadingDots } from "../loadingDots/loadingDots";

export const ProductFeedback = ({
  product,
  addNewReview,
  reviewList,
  hasUserReview,
  updateOldReview,
  showReviews,
  setShowReviews,
}) => {
  // состояние попапаoldReview открыть/закрыть
  const [popupOldReviewOpen, setPopupOldReviewOpen] = useState(false);

  async function fetchAverageRatingProductById(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return await Requests.getAverageRatingProductById(productId);
  }

  const {
    data: averageRating,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["averageRating", product.id],
    queryFn: () => fetchAverageRatingProductById(product.id),
  });

  if (isLoading || isFetching)
    return (
      <div className={styles.loadingBlock}>
        <LoadingDots>...</LoadingDots>
      </div>
    );

  return (
    <div className={styles.productFeedback}>
      <div className={styles.btnsBlock}>
        <div className={styles.ratingBlock}>
          <Rating averageRating={averageRating} />
        </div>

        <div className={styles.btnsBlock}>
          {hasUserReview ? (
            <span>
              You have already made a{" "}
              <span
                onClick={() => setPopupOldReviewOpen(true)}
                className={styles.linkCurrentReview}
              >
                review
              </span>
            </span>
          ) : (
            <Button func={() => addNewReview()}>"Add review"</Button>
          )}

          {reviewList?.length > 0 ? (
            <Button func={() => setShowReviews(!showReviews)}>Reviews</Button>
          ) : (
            <div>
              <div>This product doesn't have any reviews yet.</div>
            </div>
          )}
        </div>
      </div>

      {showReviews && (
        <div className={styles.reviewsBlock}>
          {reviewList?.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      )}

      <PopupCorrectReview
        reviewList={reviewList}
        popupOldReviewOpen={popupOldReviewOpen}
        setPopupOldReviewOpen={setPopupOldReviewOpen}
        updateOldReview={updateOldReview}
      />
    </div>
  );
};
