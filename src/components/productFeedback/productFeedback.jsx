import { useState } from "react";
import Requests from "../../requests";
import { Button } from "../button/button";
import { Rating } from "../rating/rating";
import styles from "./productFeedback.module.css";
import { useQuery } from "@tanstack/react-query";
import { LoadingDots } from "../loadingDots/loadingDots";

export const ProductFeedback = ({ product }) => {
  const [showReviews, setShowReviews] = useState(false);

  const { data: reviewList, isLoading } = useQuery({
    queryKey: ["reviewList", product.id],
    queryFn: () => fetchAllReviews(product.id),
    enabled: showReviews,
  });

  async function fetchAllReviews(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await Requests.getAllReviewsProduct(productId);
  }

  return (
    <div className={styles.productFeedback}>
      <div>
        <Rating product={product} />

        <Button func={() => setShowReviews(true)}>Reviews</Button>
      </div>

      <div>
        {showReviews && (
          <div>
            {isLoading ? (
              <LoadingDots>...</LoadingDots>
            ) : (
              reviewList?.map((review) => (
                <div key={review.id}>
                  <div>{review.user_name}</div>
                  <div>Rating: {review.rating}</div>
                  <div>{review.review_text}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
