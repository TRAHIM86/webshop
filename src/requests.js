import axios from "axios";

// запрос на сортировку по убыванию/возрастанию кривой
// т.к. почему не работает метод сортировки
//  params._order = sortOrder при передаче запроса
// поэтому здесь заколхозил
export default class Requests {
  static async getAllProduct(sortBy, sortOrder, filterStr = "") {
    console.log("filterStr ", filterStr);

    try {
      const response = await axios.get("http://localhost:3002/products");
      let products = response.data;

      if (sortBy && sortOrder) {
        products = products.sort((a, b) => {
          if (sortOrder === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });
      }

      return products.filter((product) =>
        product.name.toLowerCase().includes(filterStr.toLowerCase())
      );
    } catch (err) {
      console.log(err);
    }
  }
}
