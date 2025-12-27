import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link className={styles.Link} to="/main">
        Main
      </Link>
      <Link className={styles.Link} to="/">
        Shop
      </Link>
      <Link className={styles.Link} to="/about">
        About
      </Link>
    </div>
  );
};
