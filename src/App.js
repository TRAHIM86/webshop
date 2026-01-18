import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import { Shop } from "./pages/shop";
import { Main } from "./pages/main";
import { About } from "./pages/about";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { ProductPage } from "./pages/productPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { Cart } from "./pages/cart";
import { Login } from "./pages/login";

//https://trahim86.github.io/webshop
//https://mockapi.io/projects/695a65a3950475ada466a029

const queryClient = new QueryClient();

// корзина покупок
export const CartContext = createContext();

// активный юзер
export const UserContext = createContext();

function App() {
  const [cart, setCart] = useState(new Map());
  const [activeUser, setActiveUser] = useState(null);

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
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
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
