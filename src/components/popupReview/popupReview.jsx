import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "../button/button";
import styles from "./popupReview.module.css";
import { UserContext } from "../../App";
import { Star } from "lucide-react";
import Requests from "../../requests";

export const PopupReview = ({ popupOpen, setPopupOpen, product }) => {
  const { activeUser } = useContext(UserContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // для инвалидации данных. После длобавления отзыва
  // в ДРУГОМ компоненте - получить данные по ключу
  // и запросить новые отзывы
  const queryClient = useQueryClient();

  // текущий отзыв для отправки (если нет на сервере)
  const reviewData = {
    product_id: product.id,
    user_name: activeUser?.login,
    rating: rating,
    review_text: reviewText,
    created_at: new Date().toISOString(),
  };

  function checkLeReviewLength(str) {
    if (str.length <= 100) {
      setReviewText(str);
    }
  }

  function closePopup() {
    setPopupOpen(false);
  }

  // функция для выставления звезд (оценок)
  function rateProduct(index) {
    setRating(index + 1);
  }

  // мутация для отзыва + оценка
  const reviewMutation = useMutation({
    mutationFn: () => Requests.addNewReview(reviewData),
    onSuccess: (ratingData) => {
      if (ratingData) {
        queryClient.invalidateQueries({
          queryKey: ["reviewList", product.id],
        });

        closePopup();
      }
    },
  });

  function addReview() {
    reviewMutation.mutate();
  }

  return (
    <div className={`${styles.popup} ${!popupOpen ? styles.popupHidden : ""}`}>
      <div className={styles.popupWrapper}>
        <textarea
          type="text"
          value={reviewText}
          placeholder="No more than 100 characters..."
          rows={4}
          cols={30}
          onChange={(e) => {
            checkLeReviewLength(e.target.value);
          }}
          maxLength={100}
          style={{ resize: "none" }}
        />
        <div>
          {[...Array(5)].map((_, index) => (
            <Star
              className={styles.starRating}
              key={index}
              fill={index < rating ? "orange" : "none"}
              onClick={() => rateProduct(index)}
            />
          ))}
        </div>
        <div className={styles.buttonBlock}>
          <Button func={() => addReview()}>Add</Button>
          <Button func={() => closePopup()}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
