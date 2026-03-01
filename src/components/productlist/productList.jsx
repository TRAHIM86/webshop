import styles from "./productList.module.css";
import { ProductItem } from "../productItem/productItem";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Requests from "../../requests";
import { PopupReadReview } from "../popupReadReview/popupReadReview";

export const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: reviewList, isLoading: isLoadingReviewList } = useQuery({
    queryKey: ["review", selectedProduct?.id],
    queryFn: () => fetchAllReviews(selectedProduct.id),
    enabled: !!selectedProduct,
  });

  // получить все отзывы продукта
  async function fetchAllReviews(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await Requests.getAllReviewsProduct(productId);
    return res;
  }

  function closePopupReadReview() {
    setSelectedProduct(null);
  }

  return (
    <div>
      <div className={styles.productList}>
        {products &&
          products.map((product) => {
            return (
              <ProductItem
                product={product}
                setSelectedProduct={setSelectedProduct}
                key={product.id}
              ></ProductItem>
            );
          })}
      </div>

      {selectedProduct && (
        <PopupReadReview
          reviewList={reviewList}
          closePopupReadReview={closePopupReadReview}
          isLoadingReviewList={isLoadingReviewList}
        />
      )}
    </div>
  );
};
