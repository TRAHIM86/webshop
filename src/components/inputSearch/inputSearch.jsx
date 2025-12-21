import React, { useState } from "react";
import styles from "./inputSearch.module.css";

export const InputSearch = ({ searchStr, setSearchStr, setCurrentPage }) => {
  return (
    <div className={styles.inputBlock}>
      <input
        className={styles.searchField}
        type="text"
        value={searchStr}
        placeholder="Search..."
        onChange={(e) => {
          setSearchStr(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className={styles.divClear} onClick={() => setSearchStr("")}>
        {searchStr && "X"}
      </div>
    </div>
  );
};
