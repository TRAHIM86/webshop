import react from "react";

export const Select = ({ value, optionList, funcOnChange }) => {
  return (
    <select value={value} onChange={(e) => funcOnChange(e.target.value)}>
      {optionList.map((opt) => (
        <option value={opt.value} key={opt.value}>
          {opt.value}
        </option>
      ))}
    </select>
  );
};
