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
        ) : (
          reviewList?.map((review) => (
            <Review review={review} key={review.id} />
          ))
        )}
        <Button func={() => closePopupReadReview()}>Close</Button>
      </div>
    </div>
  );
};
