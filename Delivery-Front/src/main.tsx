
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./views/app";
import "./styles/index.css";
import Hero from "./components/Home/Hero";

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
