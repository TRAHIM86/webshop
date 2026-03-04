import { useContext, useEffect, useState } from "react";
import styles from "./popupCorrectReview.module.css";
import { UserContext } from "../../App";
import { Button } from "../button/button";
import Requests from "../../requests";

export const PopupCorrectReview = ({
  reviewList,
  popupOldReviewOpen,
  setPopupOldReviewOpen,
}) => {
  const { activeUser } = useContext(UserContext);
  const [reviewText, setReviewText] = useState("");

  const currentUserReview = reviewList?.find(
    (review) => review.user_name === activeUser.login,
  );

  const reviewData = {
    id: currentUserReview.id,
    product_id: currentUserReview.product_id,
    user_name: activeUser?.login,
    rating: currentUserReview.rating,
    review_text: reviewText,
    created_at: new Date().toISOString(),
  };

  useEffect(() => {
    setReviewText(currentUserReview?.review_text);
  }, [currentUserReview]);

  async function updateReview(newReview) {
    await Requests.updateReview(newReview);
  }

  function checkLeReviewLength(str) {
    if (str.length <= 100) {
      setReviewText(str);
    }
  }

  function closePopup() {
    setPopupOldReviewOpen(false);
  }

  return (
    <div
      className={`${styles.popup} ${!popupOldReviewOpen ? styles.popupHidden : ""}`}
    >
      <div className={styles.popupWrapper}>
        <div>{currentUserReview?.user_name}</div>

        <textarea
          type="text"
          value={reviewText}
          placeholder="From 3 to 100 characters..."
          rows={4}
          cols={30}
          onChange={(e) => {
            checkLeReviewLength(e.target.value);
          }}
          maxLength={100}
          style={{ resize: "none" }}
        />

        <Button func={() => updateReview(reviewData)}>Save</Button>
        <Button func={() => closePopup()}>Cancel</Button>
      </div>
    </div>
  );
};
