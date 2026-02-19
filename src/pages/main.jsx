import styles from "./main.module.css";
import { ActionProduct } from "../components/actionProduct/actionProduct";
import { Link } from "react-router-dom";
import { Button } from "../components/button/button";

export const Main = ({ idActionProduct }) => {
  return (
    <div>
      <ActionProduct idActionProduct={idActionProduct} />
      <Link className={styles.Link} to="/">
        <Button>Go to the shop</Button>
      </Link>
    </div>
  );
};
