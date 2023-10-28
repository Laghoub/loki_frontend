import React, { lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import ProductDetails from "./ProductDetails/ProductDetails";
import Cookies from "js-cookie";
import PaiementPage from "./PaiementPage/PaiementPage";
import PopupCheckout from "./PopupCheckout/PopupCheckout";
import Sign_log_In from "./Sign_log_In";
import Register from "./Register";
import FailComponent from "./FailComponent/FailComponent";
import RecapComponent from "./recapComponent/RecapComponent";
import Panier from "./Panier";
import EmptyPanier from "./EmptyPanier";

const AppRouter = () => {
  const panierCookie = true;
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/panier"
          element={isLoggedIn && panierCookie ? <Panier /> : <EmptyPanier />}
        />

        <Route path="/emptyCart" element={<EmptyPanier />} />
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
              dataForm={undefined}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        {/* Conditionally render the RecapComponent route based on the presence of the cookie */}
        <Route path="/succesOrder" element={<RecapComponent />} />

        <Route path="/failedOrder" element={<FailComponent />} />

        <Route path="/Checkout" element={<PaiementPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
