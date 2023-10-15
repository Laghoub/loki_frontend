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

const AppRouter = () => {
  const panierCookie = Cookies.get("panier");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/panier"
          element={panierCookie ? <Panier /> : <EmptyPanier />}
        />

        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/Checkout" element={<PaiementPage />} />
        <Route path="/Confirm" element={<PopupCheckout />} />


      
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
