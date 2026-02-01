import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { CartContext, UserContext } from "../../App";

import { ShoppingCart, CircleUser } from "lucide-react";

export const Navbar = () => {
  // актиный юзер (глобальный контекст)
  const { activeUser, setActiveUser } = useContext(UserContext);

  // товары в корзине (глобальный контест)
  const { cart, setCart } = useContext(CartContext);

  async function logout() {
    localStorage.removeItem("userWebshop");
    setActiveUser(null);
    setCart(new Map());
  }

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
      {activeUser ? (
        <Link className={styles.Link} to="/userData">
          <CircleUser></CircleUser>
        </Link>
      ) : (
        ""
      )}
      {activeUser ? (
        <Link className={styles.Link} to="/login" onClick={logout}>
          Logout
        </Link>
      ) : (
        <Link className={styles.Link} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};
