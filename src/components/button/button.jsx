import react from "react";
import styles from "./button.module.css";

export const Button = ({ children, func, disabled, className }) => {
  return (
    <button
      className={`${styles.button} ${className || ""}`}
      onClick={func}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
