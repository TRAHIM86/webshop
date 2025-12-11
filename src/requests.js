import axios from "axios";
import { data } from "react-router-dom";

// запрос на сортировку по убыванию/возрастанию кривой
// т.к. почему не работает метод сортировки
//  params._order = sortOrder при передаче запроса
// поэтому здесь заколхозил
export default class Requests {
  static async getAllProduct(
    sortBy,
    sortOrder,
    quantityProducts,
    numPage,
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

      const start = (numPage - 1) * quantityProducts;

      console.log(
        "filteredProducts ",
        filteredProducts.slice(start, start + quantityProducts)
      );

      return filteredProducts.slice(start, start + quantityProducts);
    } catch (err) {
      console.log(err);
    }
  }

  static async getProductById(id) {
    const response = await axios.get("http://localhost:3002/products");
    let products = response.data;

    let currentProduct = products.find((product) => product.id === id);

    console.log("currentProduct ", currentProduct);

    return currentProduct;
  }
}
