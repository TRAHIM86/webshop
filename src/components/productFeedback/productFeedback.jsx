import { useContext, useState } from "react";
import Requests from "../../requests";
import { Button } from "../button/button";
import { Rating } from "../rating/rating";
import styles from "./productFeedback.module.css";
import { useQuery } from "@tanstack/react-query";
import { LoadingDots } from "../loadingDots/loadingDots";
import { Review } from "../review/review";
import { UserContext } from "../../App";
import { PopupReview } from "../popupReview/popupReview";

export const ProductFeedback = ({ product }) => {
  const { activeUser } = useContext(UserContext);
  const [showReviews, setShowReviews] = useState(false);

  // состояние попапа
  const [popupOpen, setPopupOpen] = useState(false);

  const { data: reviewList, isLoading } = useQuery({
    queryKey: ["reviewList", product.id],
    queryFn: () => fetchAllReviews(product.id),
    enabled: showReviews,
  });

  async function fetchAllReviews(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await Requests.getAllReviewsProduct(productId);
  }

  function addNewReview() {
    activeUser ? console.log("Added") : setPopupOpen(true);
  }

  return (
    <div className={styles.productFeedback}>
      <div>
        <div className={styles.ratingBlock}>
          <Rating product={product} />
        </div>

        <Button func={() => addNewReview()}>Add review</Button>

        {!reviewList ? (
          <Button func={() => setShowReviews(true)}>Reviews</Button>
        ) : (
          ""
        )}
      </div>

      <div>
        {showReviews && (
          <div>
            {isLoading ? (
              <LoadingDots>...</LoadingDots>
            ) : (
              reviewList?.map((review) => (
                <Review key={review.id} review={review} />
              ))
            )}
          </div>
        )}
      </div>
      <PopupReview
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        product={product}
      />
    </div>
  );
};
