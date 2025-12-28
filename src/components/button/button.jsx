import react from "react";
import styles from "./button.module.css";

export const Button = ({ children, func }) => {
  return (
    <button className={styles.button} onClick={func}>
      {children}
    </button>
  );
};
