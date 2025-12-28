import axios from "axios";
import { data } from "react-router-dom";

export default class Requests {
  // получить все продукты (только по фильтру)
  // для отражения количества страниц
  static async getAllProducts(filterStr = "", quantity) {
    try {
      const products = await axios.get("http://localhost:3002/products");

      let filteredProducts = products.data.filter((product) =>
        product.name.toLowerCase().includes(filterStr.toLowerCase())
      );

      const total = filteredProducts.length;
      const pages = Math.ceil(total / quantity);

      // создать массив номеро в страниц
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
    filterStr = ""
  ) {
    try {
      const response = await axios.get("http://localhost:3002/products");

      let filteredProducts = response.data.filter((product) =>
        product.name.toLowerCase().includes(filterStr.toLowerCase())
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

  // получить конкретный продукт по id
  static async getProductById(id) {
    const response = await axios.get("http://localhost:3002/products");
    let products = response.data;

    let currentProduct = products.find((product) => product.id === id);
    return currentProduct;
  }

  // получить продук для корзины по ids
  static async getCartProduct(ids) {
    const response = await axios.get("http://localhost:3002/products");
    let allProducts = response.data;

    const cartProducts = allProducts.filter((product) =>
      ids.includes(product.id)
    );

    return cartProducts;
  }
}
