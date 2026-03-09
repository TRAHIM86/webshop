import styles from "./textAreaRating.module.css";

export const TextAreaRating = ({ reviewText, funcOnChange }) => {
  return (
    <textarea
      className={styles.textarea}
      type="text"
      value={reviewText}
      placeholder="From 3 to 100 characters..."
      rows={4}
      cols={30}
      onChange={(e) => {
        funcOnChange(e.target.value);
      }}
      maxLength={100}
      style={{ resize: "none" }}
    />
  );
};
