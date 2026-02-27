import { useContext, useState } from "react";
import { Button } from "../button/button";
import styles from "./popupReview.module.css";
import { UserContext } from "../../App";
import { Star } from "lucide-react";

export const PopupReview = ({ popupOpen, setPopupOpen, product }) => {
  const { activeUser } = useContext(UserContext);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  function checkLeReviewLength(str) {
    if (str.length <= 100) {
      setReview(str);
    }
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function addReview() {
    const now = new Date();
    const formattedDate = now.toISOString();

    console.log({
      product_id: product.id,
      user_name: activeUser.login,
      rating: rating,
      review_text: review,
      created_at: formattedDate,
    });
  }

  // функция для выставления звезд (оценок)
  function rateProduct(index) {
    setRating(index + 1);
  }

  return (
    <div className={`${styles.popup} ${!popupOpen ? styles.popupHidden : ""}`}>
      <div className={styles.popupWrapper}>
        <textarea
          type="text"
          value={review}
          placeholder="No more than 100 characters..."
          rows={4}
          cols={30}
          onChange={(e) => {
            checkLeReviewLength(e.target.value);
          }}
          maxLength={100}
          style={{ resize: "none" }}
        />
        <div>
          {[...Array(5)].map((_, index) => (
            <Star
              className={styles.starRating}
              key={index}
              fill={index < rating ? "orange" : "none"}
              onClick={() => rateProduct(index)}
            />
          ))}
        </div>
        <div className={styles.buttonBlock}>
          <Button func={() => addReview()}>Add</Button>
          <Button func={() => closePopup()}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
