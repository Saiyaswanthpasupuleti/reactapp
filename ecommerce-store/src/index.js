import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./CartContext";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
        <App />

  </React.StrictMode>
);

// If you want to start measuring performance in your app
reportWebVitals();
