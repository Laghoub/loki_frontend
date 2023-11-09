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
import AdminDash from "./adminDash/AdminDash";
import Error404 from "./Error404";
import Orders from "./Orders/Orders";
import BestSellersAdm from "./BestSellersAdm/BestSellersAdm";
import AddProduct from "./AddProduct/AddProduct";
import AddCategorie from "./AddCategorie/AddCategorie";
import ProductsByCategory from "./ProductsByCategory";
import ProductsCatPage from "./ProductsCatPage";

const AppRouter = () => {
  const panierCookie = Cookies.get("panier");
  var isLoggedIn = false;
  if (localStorage.getItem("connected") === "true") {
    isLoggedIn = true;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/panier" element={<Panier />} />

        <Route path="/emptyCart" element={<EmptyPanier />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route
          path="/products/category/:categoryId"
          element={<ProductsCatPage />}
        />

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
        <Route path="/succesOrder" element={<RecapComponent />} />

        <Route path="/failedOrder" element={<FailComponent />} />

        <Route path="/Checkout" element={<PaiementPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/dash" element={<AdminDash />} />

        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/admin/addCategory" element={<AddCategorie />} />

        <Route path="*" element={<Error404 />} />

        <Route path="/Checkout" element={<PaiementPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
