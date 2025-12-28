import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { CartContext } from "../../App";

import { ShoppingCart } from "lucide-react";

export const Navbar = () => {
  // товары в корзине
  const { cart, setCart } = useContext(CartContext);

  // сумма всех товаров
  const total = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);

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
      <Link className={styles.Link} to="/cart">
        <div className={styles.cartContainer}>
          <ShoppingCart className={styles.shoppingCart} />
          <div className={styles.cartCount}>{total}</div>
        </div>
      </Link>
    </div>
  );
};
