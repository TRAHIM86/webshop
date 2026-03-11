import styles from "./inputLogReg.module.css";

export const InputLogReg = ({
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
  );
};
