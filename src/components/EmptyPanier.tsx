import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const EmptyPanier = () => {
  return (
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
    </Container>
  );
};

export default EmptyPanier;
