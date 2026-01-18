import axios from "axios";
import { data } from "react-router-dom";

export default class Requests {
  // получить все продукты (только по фильтру)
  // для отражения количества страниц
  static async getAllProducts(
    filterStr = "",
    quantity,
    arrCategories,
    minPrice,
    maxPrice
  ) {
    try {
      const products = await axios.get(
        "https://695a65a3950475ada466a028.mockapi.io/webshop-tr/products"
      );

      let filteredProducts = products.data
        .filter((product) =>
          product.name.toLowerCase().includes(filterStr.toLowerCase())
        )
        .filter((product) => arrCategories.includes(product.category))
        .filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );

      const total = filteredProducts.length;
      const pages = Math.ceil(total / quantity);

      // создать массив номеров в страниц
      const pageNumbers = [];

      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }

      return {
        total: filteredProducts.length,
        pageNumbers: pageNumbers,
      };
    } catch (err) {
      console.log(err);
    }
  }

  // запрос на сортировку по убыв/возр кривой
  // т.к. почему-то не работает метод сортировки
  // params._order = sortOrder при передаче запроса
  // поэтому здесь заколхозил
  static async getSelectedProducts(
    sortBy,
    sortOrder,
    quantityProducts,
    currentPage,
    filterStr = "",
    arrCategories,
    minPrice,
    maxPrice
  ) {
    try {
      const response = await axios.get(
        "https://695a65a3950475ada466a028.mockapi.io/webshop-tr/products"
      );

      let filteredProducts = response.data
        .filter((product) =>
          product.name.toLowerCase().includes(filterStr.toLowerCase())
        )
        .filter((product) => arrCategories.includes(product.category))
        .filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );

      if (sortBy && sortOrder) {
        filteredProducts = filteredProducts.sort((a, b) => {
          if (sortOrder === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });
      }

      const start = (currentPage - 1) * quantityProducts;

      return filteredProducts.slice(start, start + quantityProducts);
    } catch (err) {
      console.log(err);
    }
  }

  // получить конкретный продукт по id.
  // Здесь КОСТЫЛЬ, т.к. mocapi при запросе id === 5,
  // возвращает массив где в id есть '5' (5,15,25...)
  static async getProductById(id) {
    // Получаем ВСЕ товары один раз
    const response = await axios.get(
      "https://695a65a3950475ada466a028.mockapi.io/webshop-tr/products"
    );

    // Ищем точное совпадение
    const product = response.data.find((p) => p.id == id);

    if (!product) {
      throw new Error(`Product ${id} not found`);
    }

    return product;
  }

  // получить продук для корзины по ids
  static async getCartProduct(ids) {
    const response = await axios.get(
      "https://695a65a3950475ada466a028.mockapi.io/webshop-tr/products"
    );
    let allProducts = response.data;

    const cartProducts = allProducts.filter((product) =>
      ids.includes(product.id)
    );

    return cartProducts;
  }

  // ЗАПРОСЫ ПО ЛОГИНАМ/РЕГИСТРАЦИЯМ
  static async checkLoginedUser(login, password) {
    console.log("login: ", login, "password", password);
    try {
      const response = await axios.get(
        "https://695a65a3950475ada466a028.mockapi.io/webshop-tr/users"
      );

      const isUserExists = response.data.find(
        (user) => user.login === login && user.password === password
      );

      return isUserExists;
    } catch (err) {
      console.log("err");
    }
  }
}
