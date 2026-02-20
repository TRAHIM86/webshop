import { Ellipsis } from "lucide-react";
import styles from "./loadingDots.module.css";

export const LoadingDots = () => {
  return (
    <div className={styles.loadingDots}>
      <Ellipsis />
    </div>
  );
};
