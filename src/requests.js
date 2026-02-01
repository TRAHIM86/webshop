import axios from "axios";
import { data } from "react-router-dom";

// SUPABASE КОНСТАНТЫ
const SUPABASE_URL = "https://ctzsuzkqrtysykhrzcgp.supabase.co";
const SUPABASE_KEY = "sb_publishable_cN-nMMkT8cYc0g7BuND6TA_QRzaRlzz";
const SUPABASE_HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

export default class Requests {
  // получить все продукты (только по фильтру)
  // для отражения количества страниц
  static async getAllProducts(
    filterStr = "",
    quantity,
    arrCategories,
    minPrice,
    maxPrice,
  ) {
    try {
      const products = await axios.get(`${SUPABASE_URL}/rest/v1/products`, {
        headers: SUPABASE_HEADERS,
      });

      let filteredProducts = products.data
        .filter((product) =>
          product.name.toLowerCase().includes(filterStr.toLowerCase()),
        )
        .filter((product) => arrCategories.includes(product.category))
        .filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
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
    maxPrice,
  ) {
    try {
      const response = await axios.get(`${SUPABASE_URL}/rest/v1/products`, {
        headers: SUPABASE_HEADERS,
      });

      let filteredProducts = response.data
        .filter((product) =>
          product.name.toLowerCase().includes(filterStr.toLowerCase()),
        )
        .filter((product) => arrCategories.includes(product.category))
        .filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
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
      `${SUPABASE_URL}/rest/v1/products?id=eq.${id}`,
      { headers: SUPABASE_HEADERS },
    );

    if (!response.data || response.data.length === 0) {
      throw new Error(`Product ${id} not found`);
    }

    return response.data[0];
  }

  // получить продукты для корзины по ids
  static async getCartProduct(ids) {
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/products`, {
      headers: SUPABASE_HEADERS,
    });
    let allProducts = response.data;

    const cartProducts = allProducts.filter((product) =>
      ids.includes(product.id),
    );

    return cartProducts;
  }

  // запрос к корзине юзера по id
  static async getCartByUserId(userId) {
    if (!userId) {
      console.log("No userId provided");
      return [];
    }

    try {
      const response = await axios.get(
        `${SUPABASE_URL}/rest/v1/carts?user_id=eq.${userId}`,
        { headers: SUPABASE_HEADERS },
      );
      return response.data.length > 0 ? response.data[0] : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // изменить корзину активного юзера
  static async putCartByUserId(userId, cartMap) {
    try {
      // преобразовать в массив для SUPABASE
      const cartArray = [];
      cartMap.forEach((quantity, productId) => {
        cartArray.push({ productId, quantity });
      });

      // получить корзину юзера
      const getResponse = await axios.get(
        `${SUPABASE_URL}/rest/v1/carts?user_id=eq.${userId}`,
        { headers: SUPABASE_HEADERS },
      );

      // если корзина есть изменить данные
      // если ее нету - создать и добавить данные
      if (getResponse.data.length > 0) {
        const response = await axios.patch(
          `${SUPABASE_URL}/rest/v1/carts?user_id=eq.${userId}`,
          {
            // ← PATCH: только то, что меняем
            items: cartArray,
          },
          {
            headers: {
              ...SUPABASE_HEADERS,
              "Content-Type": "application/json",
              Prefer: "return=representation",
            },
          },
        );

        return response.data[0];
      } else {
        const postResponse = await axios.post(
          `${SUPABASE_URL}/rest/v1/carts`,
          { user_id: userId, items: cartArray },
          {
            headers: {
              ...SUPABASE_HEADERS,
              "Content-Type": "application/json",
              Prefer: "return=representation",
            },
          },
        );

        console.log(`Added cart for user ${userId} :`, postResponse.data[0]);
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /*********ЗАПРОСЫ ПО ЛОГИНАМ/РЕГИСТРАЦИЯМ*******/

  // проверить есть ли юзер по логину и паролю
  static async checkLoginedUser(login, password) {
    console.log("login: ", login, "password", password);
    try {
      const response = await axios.get(`${SUPABASE_URL}/rest/v1/users`, {
        headers: SUPABASE_HEADERS,
      });

      const isUserExists = response.data.find(
        (user) => user.login === login && user.password === password,
      );

      return isUserExists;
    } catch (err) {
      console.log("err: ", err);
    }
  }

  // свободно ли имя/email на сервере
  static async checkRegistredUser(newLogin, newEmail) {
    try {
      const response = await axios.get(`${SUPABASE_URL}/rest/v1/users`, {
        headers: SUPABASE_HEADERS,
      });

      const isLoginUsed = response.data.some((user) => {
        return user.login.toLowerCase() === newLogin.toLowerCase();
      });

      const isEmailUsed = response.data.some((user) => {
        return user.email.toLowerCase() === newEmail.toLowerCase();
      });

      return {
        loginUser: isLoginUsed,
        emailUser: isEmailUsed,
      };
    } catch (err) {
      console.log("err: ", err);
    }
  }

  static async addNewUser(newUser) {
    try {
      const { confirmPassword, ...userToSend } = newUser;

      const response = await axios.post(
        `${SUPABASE_URL}/rest/v1/users`,
        userToSend,
        {
          headers: {
            ...SUPABASE_HEADERS,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        },
      );

      console.log("New user registered");
      return response.data[0];
    } catch (err) {
      console.log("err :", err);
    }
  }
}
