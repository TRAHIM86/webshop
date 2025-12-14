import axios from "axios";
import { data } from "react-router-dom";

export default class Requests {
  // получить все продукты (только по фильтру)
  // для отражения количества страниц
  static async getAllProducts(filterStr = "") {
    try {
      const products = await axios.get("http://localhost:3002/products");

      let filteredProducts = products.data.filter((product) =>
        product.name.toLowerCase().includes(filterStr.toLowerCase())
      );
      console.log("All: ", products.data.length);
      return filteredProducts;
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

  // получить конкретный продук по id
  static async getProductById(id) {
    const response = await axios.get("http://localhost:3002/products");
    let products = response.data;

    let currentProduct = products.find((product) => product.id === id);

    console.log("currentProduct ", currentProduct);

    return currentProduct;
  }
}
