import { useContext } from "react";
import { Button } from "../button/button";
import { LoadingDots } from "../loadingDots/loadingDots";
import { Review } from "../review/review";
import styles from "./popupReadReview.module.css";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

export const PopupReadReview = ({
  reviewList,
  closePopupReadReview,
  isLoadingReviewList,
  selectedProduct,
}) => {
  const { activeUser } = useContext(UserContext);

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
          <div>
            <div>This product doesn't have any reviews yet.</div>
          </div>
        )}
        Would you like to leave a review?
        <div>
          {activeUser ? (
            <Button func={() => console.log("Soon will be a function")}>
              Leave a review
            </Button>
          ) : (
            <div>
              <Link
                className={styles.registerLink}
                to="/login"
                state={{
                  from: `/products/${selectedProduct.id}`,
                  openReview: true,
                }}
              >
                Login
              </Link>{" "}
              or{" "}
              <Link
                className={styles.registerLink}
                to="/register"
                state={{
                  from: `/products/${selectedProduct.id}`,
                  openReview: true,
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
        <Button func={() => closePopupReadReview()}>Close</Button>
      </div>
    </div>
  );
};
