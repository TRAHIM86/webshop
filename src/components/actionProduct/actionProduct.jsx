import { useEffect, useState } from "react";
import Requests from "../../requests";
import { ProductImg } from "../productImg/productImg";
import styles from "./actionProduct.module.css";

export const ActionProduct = ({ idActionProduct }) => {
  const [actionProduct, setActionProduct] = useState(null);

  // массив номера фотографий
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(1);
  const [fadeClass, setFadeClass] = useState("");

  useEffect(() => {
    async function getActionProduct(id) {
      if (id) {
        const product = await Requests.getProductById(id);
        setActionProduct(product);
      }
    }

    getActionProduct(idActionProduct);
  }, [idActionProduct]);

  // заполнить номера фотографий (максимум 5). В
  // зависимости от количества фото в папке продукта
  // (1-5) получить массив с номерами.

  // заполнить массив номерами фоток (от 1 до 5)
  function fillPhotos() {
    if (!actionProduct || !actionProduct.name) return;

    const arrNums = [];

    // максимальное количество фото для загрузки
    const MAXNUM = 5;

    function checkImg(num) {
      const img = new Image();
      img.src = `${
        process.env.PUBLIC_URL
      }/imgs/${actionProduct.name.toLowerCase()}/${num}.jpg`;

      img.onload = () => {
        arrNums.push(num);

        if (num < MAXNUM) {
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
  }, [actionProduct]);

  // эффект для автоматической карусели
  useEffect(() => {
    if (photos.length === 0) return;

    const intervalId = setInterval(() => {
      setFadeClass(styles.fadeOut);

      // Через 0.5 сек (когда исчезло) поменять фото
      setTimeout(() => {
        setCurrentPhotoIndex((prev) => (prev === photos.length ? 1 : prev + 1));

        setFadeClass(styles.fadeIn);
      }, 500);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [photos]);

  return (
    <div>
      <div>{actionProduct?.name}</div>
      <div>{actionProduct?.price}</div>
      <div>{actionProduct?.category}</div>
      <div className={styles.containerImg}>
        <div className={`${styles.imageWrapper} ${fadeClass}`}>
          <ProductImg
            productName={actionProduct?.name || ""}
            num={currentPhotoIndex}
          />
        </div>
      </div>
    </div>
  );
};
