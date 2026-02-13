import React from "react";
import { Loader2 } from "lucide-react";
import styles from "./spinner.module.css";

export const Spinner = () => {
  return <Loader2 className={styles.spinner} />;
};
