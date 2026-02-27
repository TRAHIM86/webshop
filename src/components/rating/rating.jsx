import Requests from "../../requests";
import styles from "./rating.module.css";
import { useQuery } from "@tanstack/react-query";
import { LoadingDots } from "../loadingDots/loadingDots";
import { Star } from "lucide-react";

export const Rating = ({ product, averageRating }) => {
  return (
    <div className={styles.ratingBlock}>
      <div className={styles.starBlock}>
        <Star size={16} fill="orange" />
      </div>
      {averageRating ? averageRating.toFixed(2) : "No rating"}
    </div>
  );
};
