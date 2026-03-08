import { useContext } from "react";
import { NavLink } from "react-router-dom";
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

  //console.log("NAVBAR :", cart);
  // сумма всех товаров
  const total = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className={styles.navbar}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.Link} ${styles.activeLink}` : styles.Link
        }
        to="/"
      >
        Main
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.Link} ${styles.activeLink}` : styles.Link
        }
        to="/shop"
      >
        Shop
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.Link} ${styles.activeLink}` : styles.Link
        }
        to="/about"
      >
        About
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.Link} ${styles.activeLink}` : styles.Link
        }
        to="/cart"
      >
        <div className={`${styles.cartContainer} ${styles.Link}`}>
          <ShoppingCart />
          {total > 0 ? <div className={styles.cartCount}>{total}</div> : ""}
        </div>
      </NavLink>

      {activeUser && (
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.Link} ${styles.activeLink}` : styles.Link
          }
          to="/userData"
        >
          <CircleUser />
        </NavLink>
      )}

      {activeUser ? (
        <NavLink className={styles.Link} to="/login" onClick={logout}>
          Logout
        </NavLink>
      ) : (
        <NavLink className={styles.Link} to="/login">
          Login
        </NavLink>
      )}
    </div>
  );
};
