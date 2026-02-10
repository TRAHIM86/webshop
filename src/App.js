import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import { Shop } from "./pages/shop";
import { Main } from "./pages/main";
import { About } from "./pages/about";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { ProductPage } from "./pages/productPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { Cart } from "./pages/cart";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { UserData } from "./pages/userData";
import Requests from "./requests";

//https://trahim86.github.io/webshop
//https://mockapi.io/projects/695a65a3950475ada466a029
//https://supabase.com/dashboard/project/ctzsuzkqrtysykhrzcgp

const queryClient = new QueryClient();

// корзина покупок
export const CartContext = createContext({
  // дефолтное значение
  cart: new Map(),
  setCart: () => {},
});

// активный юзер
export const UserContext = createContext();

function App() {
  const [activeUser, setActiveUser] = useState(() => {
    const userData = localStorage.getItem("userWebshop");
    return userData ? JSON.parse(userData) : null;
  });

  const [cart, setCart] = useState(new Map());

  async function loadCart(userId) {
    if (userId) {
      const cartData = await Requests.getCartByUserId(userId);

      if (cartData && cartData.items) {
        const cartMap = new Map();
        cartData.items.forEach((item) => {
          cartMap.set(item.productId, item.quantity);
        });
        setCart(cartMap);
      } else {
        setCart(new Map());
      }
    } else {
      try {
        const savedCart = localStorage.getItem("cartWebshop");
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          const cartMap = new Map(Object.entries(cartData));
          setCart(cartMap);
          console.log("savedCart :", cartMap);
        } else {
          setCart(new Map());
          console.log("newCart :", cart);
        }
      } catch (err) {
        console.log("Err :", err);
        setCart(new Map());
      }
    }
  }

  useEffect(() => {
    if (activeUser) {
      loadCart(activeUser.id);
    } else {
      loadCart(null);
    }
  }, [activeUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ activeUser, setActiveUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <HashRouter>
            <div className={styles.appContainer}>
              <Header />
              <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/products/:productId" element={<ProductPage />} />
                <Route path="/main" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/userData" element={<UserData />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<Navigate to="/" replace />}></Route>
              </Routes>
              <Footer />
            </div>
          </HashRouter>
        </CartContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
