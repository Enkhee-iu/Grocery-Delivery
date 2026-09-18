
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./views/app";
import "./styles/index.css";
import Hero from "./components/Home/Hero";
import { CartProvider } from "./context/CartContext";
import { CatalogProvider } from "./context/CatalogContext";

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
  <CatalogProvider><CartProvider>
    <App />
  </CartProvider></CatalogProvider>
  </BrowserRouter>
);
