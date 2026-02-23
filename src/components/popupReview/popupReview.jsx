import { useState } from "react";
import { Button } from "../button/button";
import styles from "./popupReview.module.css";
import { Link } from "react-router-dom";

export const PopupReview = ({ popupOpen, setPopupOpen, product }) => {
  console.log("id :", product.id);

  function closePopup() {
    setPopupOpen(false);
  }

  return (
    <div className={`${styles.popup} ${!popupOpen ? styles.popupHidden : ""}`}>
      <div className={styles.popupWrapper}>
        <Link
          className={styles.registerLink}
          to="/login"
          state={{
            from: `/products/${product.id}`,
            openReview: true,
          }}
        >
          Login
        </Link>{" "}
        or{" "}
        <Link className={styles.registerLink} to="/register">
          register
        </Link>{" "}
        to leave a review.
        <Button func={() => closePopup()}>Cancel</Button>
      </div>
    </div>
  );
};
