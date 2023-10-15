import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

const EmptyPanier = () => {
  return (
    <><Header />
    <Menu />
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ShoppingCartIcon style={{ fontSize: 200, color: "gray" }} />
      <br />
      <Typography variant="h5" align="center" color="textSecondary">
        Vous n'avez aucun produit dans votre panier
      </Typography>
    </Container><Footer /></>
  );
};

export default EmptyPanier;
