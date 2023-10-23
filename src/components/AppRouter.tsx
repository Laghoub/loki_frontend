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
import FailComponent from "./FailComponent/FailComponent";
import RecapComponent from "./recapComponent/RecapComponent";

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
        <Route path="/Confirm" element={<PopupCheckout onConfirm={function (): void {
          throw new Error("Function not implemented.");
        } } onCancel={function (): void {
          throw new Error("Function not implemented.");
        } } dataForm={undefined} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/failedOrder" element={<FailComponent />} />
        <Route path="/succesOrder" element={<RecapComponent />} />



      
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
