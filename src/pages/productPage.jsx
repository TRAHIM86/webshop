import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Requests from "../requests";
import styles from "./productPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { ProductImg } from "../components/productImg/productImg";
import { Arrow } from "../components/arrow/arrow";
import { Carousel } from "../components/carousel/carousel";

export const ProductPage = () => {
  let { productId } = useParams();
  const maxNum = 5;

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

  // массив номера фотографий
  const [photos, setPhotos] = useState([]);

  // заполнить номера фотографий (максимум 5)
  function fillPhotos() {
    if (!productById) return;

    const arrNums = [];

    function checkImg(num) {
      const img = new Image();
      img.src = `/imgs/${productById.name}/${num}.jpg`;

      img.onload = () => {
        arrNums.push(num);

        if (num < maxNum) {
          checkImg(num + 1);
        } else {
          setPhotos(arrNums);
        }
      };

      img.onerror = () => {
        setPhotos(arrNums);
      };
    }

    checkImg(1);
  }

  useEffect(() => {
    fillPhotos();
  }, [productById]);

  const [currentNum, setCurrentNum] = useState(1);

  function nextPhoto() {
    if (!productById) return;

    const nextNum = currentNum + 1;

    const isImg = new Image();
    isImg.src = `/imgs/${productById.name}/${nextNum}.jpg`;

    isImg.onload = () => {
      setCurrentNum(nextNum);
    };

    isImg.onerror = () => {
      setCurrentNum(1);
    };
  }

  function prevPhoto() {
    if (!productById) return;

    console.log("PREV", maxNum);
    function checkNum(num) {
      if (num < 1) {
        num = maxNum;
      }

      const isImg = new Image();
      isImg.onload = () => setCurrentNum(num);
      isImg.onerror = () => checkNum(num - 1);
      isImg.src = `/imgs/${productById.name}/${num}.jpg`;
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
          <Arrow funcOnClick={prevPhoto}>←</Arrow>
          <Arrow funcOnClick={nextPhoto}>→</Arrow>
        </div>
        <div>{productById.name}</div>
        <div className={styles.containerImg}>
          <ProductImg productName={productById.name} num={currentNum} />
        </div>
        <div>{productById.price}</div>
        <div>{productById.category}</div>
      </div>

      <Carousel
        product={productById}
        arrNumsPhoto={photos}
        currentNum={currentNum}
        setCurrentNum={setCurrentNum}
      />
    </div>
  );
};
