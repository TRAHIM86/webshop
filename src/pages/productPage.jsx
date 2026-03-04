import styles from "./productPage.module.css";
import { CartContext, UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Requests from "../requests";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductImg } from "../components/productImg/productImg";
import { Arrow } from "../components/arrow/arrow";
import { Carousel } from "../components/carousel/carousel";
import { Button } from "../components/button/button";
import { ProductFeedback } from "../components/productFeedback/productFeedback";
import { PopupLogin } from "../components/popupLogin/popupLogin";
import { PopupWriteReview } from "../components/popupWriteReview/popupWriteReview";
import { LoadingDots } from "../components/loadingDots/loadingDots";

export const ProductPage = () => {
  // актиный юзер (глобальный контекст)
  const { activeUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // состояние попапаLogin открыть/закрыть
  const [popupLoginOpen, setPopupLoginOpen] = useState(false);

  // состояние попапаAddReview открыть/закрыть
  const [popupReviewOpen, setPopupReviewOpen] = useState(false);

  // для обратного редиректа и передачи true
  const openReview = location.state?.openReview || false;

  let { productId } = useParams();

  function addNewReview() {
    activeUser ? setPopupReviewOpen(true) : setPopupLoginOpen(true);
  }

  /********** получить все отзывы продукта *********/
  async function fetchAllReviews(productId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await Requests.getAllReviewsProduct(productId);
  }

  const {
    data: reviewList,
    isLoading: isLoadingReviewList,
    isFetching: isFetchingReviewList,
  } = useQuery({
    queryKey: ["reviewList", Number(productId)],
    queryFn: () => fetchAllReviews(productId),
  });

  async function updateOldReview(newReview) {
    await Requests.updateReview(newReview);
    queryClient.invalidateQueries({
      queryKey: ["reviewList", Number(productId)],
    });
  }

  // есть ли отзыв юзера. Попап ревью откроется только если
  // нету отзыва + состояние открыть!
  const hasUserReview = reviewList?.some(
    (review) => review.user_name === activeUser?.login,
  );

  useEffect(() => {
    if (openReview) {
      setPopupReviewOpen(openReview);

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [openReview, location.pathname, navigate]);

  /*************************************************/

  /********** получить продкут по id ***************/
  async function fetchProductById(id) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return await Requests.getProductById(id);
  }

  const {
    data: productById,
    isLoading: isLoadingProduct,
    isError,
  } = useQuery({
    queryKey: ["currentProduct", productId],
    queryFn: () => fetchProductById(productId),
  });

  /*************************************************/

  /********** функции для фотографий ***************/
  // массив номера фотографий
  const [photos, setPhotos] = useState([]);

  // заполнить номера фотографий (максимум 5). В
  // зависимости от количества фото в папке продукта
  // (1-5) получить массив с номерами.
  function fillPhotos() {
    if (!productById || !productById.name) return;

    const arrNums = [];

    // максимальное количество фото для загрузки
    const MAXNUM = 5;

    function checkImg(num) {
      const img = new Image();
      img.src = `${
        process.env.PUBLIC_URL
      }/imgs/${productById.name.toLowerCase()}/${num}.jpg`;

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
  }, [productById]);

  const [currentNumPhoto, setCurrentNumPhoto] = useState(1);

  function prevPhoto() {
    if (!productById || photos.length === 0) return;

    let prevIndex = photos.indexOf(currentNumPhoto) - 1;

    if (prevIndex < 0) {
      prevIndex = photos.length - 1;
    }

    setCurrentNumPhoto(photos[prevIndex]);
  }

  function nextPhoto() {
    if (!productById || photos.length === 0) return;

    let nextIndex = photos.indexOf(currentNumPhoto) + 1;

    if (nextIndex >= photos.length) {
      nextIndex = 0;
    }

    setCurrentNumPhoto(photos[nextIndex]);
  }

  /*************************************************/

  // добавить/удалить товар в корзину. Используем Map
  // чтобы были только уникальные id товара. Количество
  // будет регулироваться на странице корзины
  function toggleProductInCart(productId) {
    setCart((prev) => {
      const newCart = new Map(prev);

      if (newCart.has(productId)) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, 1);
      }

      if (!activeUser) {
        localStorage.setItem(
          "cartWebshop",
          JSON.stringify(Object.fromEntries(newCart)),
        );
      } else {
        Requests.putCartByUserId(activeUser.id, newCart);
      }

      return newCart;
    });
  }

  return isLoadingProduct ? (
    <LoadingDots />
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
          <ProductImg productName={productById.name} num={currentNumPhoto} />
        </div>
        <div>{`${productById.price} $`}</div>
        <div>{productById.category}</div>
      </div>
      <Carousel
        product={productById}
        arrNumsPhoto={photos}
        currentNum={currentNumPhoto}
        setCurrentNum={setCurrentNumPhoto}
      />
      <Button func={() => toggleProductInCart(productById.id)}>
        {cart.has(productById.id) ? "Remove" : "Add"}
      </Button>
      {isLoadingReviewList || isFetchingReviewList ? (
        <LoadingDots />
      ) : (
        <ProductFeedback
          product={productById}
          addNewReview={addNewReview}
          reviewList={reviewList}
          hasUserReview={hasUserReview}
          updateOldReview={updateOldReview}
        />
      )}

      <PopupLogin
        popupOpen={popupLoginOpen}
        setPopupOpen={setPopupLoginOpen}
        product={productById}
      />
      {hasUserReview === false && popupReviewOpen && (
        <PopupWriteReview
          setPopupOpen={setPopupReviewOpen}
          product={productById}
        />
      )}
    </div>
  );
};
