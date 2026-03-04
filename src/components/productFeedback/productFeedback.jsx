import { useContext, useState } from "react";
import { Button } from "../button/button";
import { Rating } from "../rating/rating";
import styles from "./productFeedback.module.css";
import { Review } from "../review/review";
import { UserContext } from "../../App";
import { PopupCorrectReview } from "../popupCorrectReview/popupCorrectReview";

export const ProductFeedback = ({
  product,
  addNewReview,
  reviewList,
  hasUserReview,
}) => {
  const [showReviews, setShowReviews] = useState(false);

  // состояние попапаoldReview открыть/закрыть
  const [popupOldReviewOpen, setPopupOldReviewOpen] = useState(false);

  return (
    <div className={styles.productFeedback}>
      <div>
        <div className={styles.ratingBlock}>
          <Rating product={product} />
        </div>

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

      <PopupCorrectReview
        product={product}
        reviewList={reviewList}
        popupOldReviewOpen={popupOldReviewOpen}
        setPopupOldReviewOpen={setPopupOldReviewOpen}
      />
    </div>
  );
};
