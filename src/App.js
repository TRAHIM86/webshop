import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import { Shop } from "./pages/shop";
import { Main } from "./pages/main";
import { About } from "./pages/about";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { ProductPage } from "./pages/productPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/:productId" element={<ProductPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
