import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from "./hooks/CartContextProvider";
import AuthContextProvider from "./hooks/AuthContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartContextProvider>
  </AuthContextProvider>
);
