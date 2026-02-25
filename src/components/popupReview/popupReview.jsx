import { useState } from "react";
import { Button } from "../button/button";
import styles from "./popupReview.module.css";

export const PopupReview = ({ popupOpen, setPopupOpen }) => {
  const [review, setReview] = useState("");

  function checkLeReviewLength(str) {
    if (str.length <= 100) {
      setReview(str);
    }
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function addReview() {
    console.log(review);
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
        <div className={styles.buttonBlock}>
          <Button func={() => addReview()}>Add</Button>
          <Button func={() => closePopup()}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
