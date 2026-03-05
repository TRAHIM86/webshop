import styles from "./main.module.css";
import { ActionProduct } from "../components/actionProduct/actionProduct";

export const Main = ({ idActionProduct }) => {
  return (
    <div className={styles.mainPage}>
      <ActionProduct idActionProduct={idActionProduct} />
    </div>
  );
};
