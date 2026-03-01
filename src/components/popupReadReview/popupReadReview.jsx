import { Button } from "../button/button";
import { LoadingDots } from "../loadingDots/loadingDots";
import { Review } from "../review/review";
import styles from "./popupReadReview.module.css";

export const PopupReadReview = ({
  reviewList,
  closePopupReadReview,
  isLoadingReviewList,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupWrapper}>
        {isLoadingReviewList ? (
          <LoadingDots />
        ) : reviewList?.length > 0 ? (
          reviewList?.map((review) => (
            <Review key={review.id} review={review} />
          ))
        ) : (
          <p>This product doesn't have any reviews yet.</p>
        )}
        <Button func={() => closePopupReadReview()}>Close</Button>
      </div>
    </div>
  );
};
