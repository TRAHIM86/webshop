import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Requests from "../requests";
import styles from "./productPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { ProductImg } from "../components/productImg/productImg";

export const ProductPage = () => {
  let { productId } = useParams();

  async function fetchProductById(id) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return await Requests.getProductById(id);
  }

  const {
    data: productById,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentProduct", productId],
    queryFn: () => fetchProductById(productId),
  });

  const maxNum = 5;
  const [currentNum, setCurrentNum] = useState(1);

  function nextPhoto() {
    if (!productById) return;

    const nextNum = currentNum + 1;

    const isImg = new Image();
    isImg.src = `/imgs/${productById.name}/${nextNum}.jpeg`;

    isImg.onload = () => {
      setCurrentNum(nextNum);
    };

    isImg.onerror = () => {
      setCurrentNum(1);
    };
  }

  function prevPhoto() {
    if (!productById) return;
    function checkNum(num) {
      if (num < 1) {
        num = maxNum;
      }

      const isImg = new Image();
      isImg.onload = () => setCurrentNum(num);
      isImg.onerror = () => checkNum(num - 1);
      isImg.src = `/imgs/${productById.name}/${num}.jpeg`;
    }

    checkNum(currentNum - 1);
  }

  return isLoading ? (
    <div>Loading product...</div>
  ) : isError ? (
    <div>Error...</div>
  ) : (
    <div className={styles.productPage}>
      <div className={styles.productItem}>
        <div className={styles.arrows}>
          <div className={styles.arrow} onClick={prevPhoto}>
            ←
          </div>
          <div className={styles.arrow} onClick={nextPhoto}>
            →
          </div>
        </div>
        <div>{productById.name}</div>
        <div className={styles.containerImg}>
          <ProductImg productName={productById.name} num={currentNum} />
        </div>
        <div>{productById.price}</div>
        <div>{productById.category}</div>
      </div>
    </div>
  );
};
