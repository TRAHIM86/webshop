import styles from "./select.module.css";

export const Select = ({ value, optionList, funcOnChange }) => {
  return (
    <select className={styles.select}
      value={value}
      onChange={(e) => funcOnChange(e.target.value)}
      color="black"
    >
      {optionList.map((opt) => (
        <option value={opt.value} key={opt.value}>
          {opt.value}
        </option>
      ))}
    </select>
  );
};
