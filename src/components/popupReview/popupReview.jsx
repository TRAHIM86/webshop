import { Button } from "../button/button";
import styles from "./popupReview.module.css";

export const PopupReview = ({ popupOpen, setPopupOpen }) => {
  function closePopup() {
    setPopupOpen(false);
  }

  return (
    <div className={`${styles.popup} ${!popupOpen ? styles.popupHidden : ""}`}>
      <div className={styles.popupWrapper}>
        INPUTS...
        <Button func={() => closePopup()}>Cancel</Button>
      </div>
    </div>
  );
};
