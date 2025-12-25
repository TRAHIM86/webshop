import react from "react";
import styles from "./arrow.module.css";

export const Arrow = ({ children, funcOnClick }) => {
  return (
    <div className={styles.arrow} onClick={funcOnClick}>
      {children}
    </div>
  );
};
