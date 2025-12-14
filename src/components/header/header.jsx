import React from "react";
import styles from "./header.module.css";
import { Navbar } from "../../ui/navbar/navbar";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
    </header>
  );
};
