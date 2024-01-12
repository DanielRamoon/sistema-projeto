import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { PaymentProvider } from "./context/PaymentContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PaymentProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PaymentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
