import axios from "axios";

export default class Requests {
  static async getAllProduct() {
    try {
      const response = await axios.get("http://localhost:3002/products");

      console.log("PRODUCTS: ", response.data);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
