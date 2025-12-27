import React from "react";
import styles from "./header.module.css";
import { Navbar } from "../../ui/navbar/navbar";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/main">
        <div className={styles.logoWrapper}>
          <img src={`/logo.png`} alt="logo"></img>
          <h1>Sport shop</h1>
        </div>
      </Link>
      <Navbar />
    </header>
  );
};
