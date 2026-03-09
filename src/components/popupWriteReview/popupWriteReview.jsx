import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "../button/button";
import styles from "./popupWriteReview.module.css";
import { UserContext } from "../../App";
import { Star } from "lucide-react";
import Requests from "../../requests";
import { StarsRating } from "../stars/starsRating";
import { TextAreaRating } from "../textAreaRating/textAreaRating";

export const PopupWriteReview = ({ setPopupOpen, product }) => {
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

  const minDataReiew = reviewText.length >= 3 && rating > 0;

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

        queryClient.invalidateQueries({
          queryKey: ["averageRating", product.id],
        });

        closePopup();
      }
    },
  });

  function addReview() {
    reviewMutation.mutate();
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popupWrapper}>
        <TextAreaRating
          reviewText={reviewText}
          funcOnChange={checkLeReviewLength}
        />

        <StarsRating
          num={5}
          rating={rating}
          funcOnClick={rateProduct}
        ></StarsRating>

        <div className={styles.buttonBlock}>
          <Button
            className={styles.btnAdd}
            disabled={!minDataReiew}
            func={() => addReview()}
          >
            Add
          </Button>
          <Button className={styles.btnAdd} func={() => closePopup()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
