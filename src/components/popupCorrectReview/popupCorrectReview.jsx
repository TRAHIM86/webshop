import { useContext, useEffect, useState } from "react";
import styles from "./popupCorrectReview.module.css";
import { UserContext } from "../../App";
import { Button } from "../button/button";
import { Star } from "lucide-react";
import { TextAreaRating } from "../textAreaRating/textAreaRating";
import { StarsRating } from "../stars/starsRating";

export const PopupCorrectReview = ({
  reviewList,
  popupOldReviewOpen,
  setPopupOldReviewOpen,
  updateOldReview,
}) => {
  const { activeUser } = useContext(UserContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const currentUserReview = reviewList?.find(
    (review) => review.user_name === activeUser?.login,
  );

  useEffect(() => {
    setReviewText(currentUserReview?.review_text);
    setRating(currentUserReview?.rating);
  }, [currentUserReview]);

  const reviewData = {
    id: currentUserReview?.id,
    product_id: currentUserReview?.product_id,
    user_name: activeUser?.login,
    rating: rating,
    review_text: reviewText,
    created_at: new Date().toISOString(),
  };

  const minDataReiew = reviewText.length >= 3 && rating > 0;
  console.log(minDataReiew);

  function checkLeReviewLength(str) {
    if (str.length <= 100) {
      setReviewText(str);
    }
  }

  // функция для выставления звезд (оценок)
  function rateProduct(index) {
    setRating(index + 1);
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

        <TextAreaRating
          reviewText={reviewText}
          funcOnChange={checkLeReviewLength}
        />

        <StarsRating
          num={5}
          rating={rating}
          funcOnClick={rateProduct}
        ></StarsRating>

        <div className={styles.buttonBlock}>
          <Button
            className={styles.btnSave}
            func={() => updateOldReview(reviewData)}
            disabled={!minDataReiew}
          >
            Save
          </Button>
          <Button func={() => closePopup()}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
