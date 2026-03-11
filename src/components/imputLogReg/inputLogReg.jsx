import styles from "./inputLogReg.module.css";

export const InputLogReg = ({
  children,
  value,
  notValidObj,
  type,
  placeholder,
  field,
  funcOnchange,
  funcsOnFocus,
  funcsOnBlur,
}) => {
  return (
    <div className={styles.inputBlock}>
      <input
        className={`${styles.input} ${
          notValidObj.isNotValidInput ? styles.inputNotValid : ""
        }`}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={field}
        onChange={(e) => funcOnchange(`${field}`, e.target.value)}
        onFocus={() => funcsOnFocus.forEach((fn) => fn())}
        onBlur={() => funcsOnBlur.forEach((fn) => fn())}
      />
      {children}
    </div>
  );
};
