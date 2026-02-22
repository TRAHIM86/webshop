import { useState } from "react";
import { Button } from "../button/button";
import styles from "./popupReview.module.css";

export const PopupReview = ({ popupOpen, setPopupOpen }) => {
  console.log("popupOpen :", popupOpen);

  function closePopup() {
    setPopupOpen(false);
  }

  return (
    <div className={`${styles.popup} ${!popupOpen ? styles.popupHidden : ""}`}>
      <div className={styles.popupWrapper}>
        Log in or register to leave a review.
        <Button func={() => closePopup()}>Cancel</Button>
      </div>
    </div>
  );
};
