import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import ProductDetails from "./ProductDetails/ProductDetails";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/details/:id" element={<ProductDetails />}  />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
