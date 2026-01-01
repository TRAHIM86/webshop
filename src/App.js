import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();

// корзина покупок
export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState(new Map());

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={{ cart, setCart }}>
        <BrowserRouter>
          <div className={styles.appContainer}>
            <Header />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/products/:productId" element={<ProductPage />} />
              <Route path="/main" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate to="/" replace />}></Route>
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </CartContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
