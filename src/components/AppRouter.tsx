import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import ProductDetails from "./ProductDetails/ProductDetails";
import Panier from "./Panier";
import EmptyPanier from "./EmptyPanier";
import Cookies from "js-cookie";
import PaiementPage from "./PaiementPage/PaiementPage";
import PopupCheckout from "./PopupCheckout/PopupCheckout";
import Sign_log_In from "./Sign_log_In";
import Register from "./Register";

const AppRouter = () => {
  const panierCookie = Cookies.get("panier");
  const isLoggedIn = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/panier"
          element={isLoggedIn ? <Panier /> : <EmptyPanier />}
        />

        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/Checkout" element={<PaiementPage />} />
        <Route
          path="/Confirm"
          element={
            <PopupCheckout
              onConfirm={function (): void {
                throw new Error("Function not implemented.");
              }}
              onCancel={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
