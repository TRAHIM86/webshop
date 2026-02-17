import styles from "./main.module.css";
import { ActionProduct } from "../components/actionProduct/actionProduct";

export const Main = ({ idActionProduct }) => {
  return <ActionProduct idActionProduct={idActionProduct} />;
};
