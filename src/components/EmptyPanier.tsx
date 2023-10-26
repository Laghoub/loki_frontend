import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import { Link } from "react-router-dom"; // Import de Link pour gérer les liens de routage

const EmptyPanier = () => {
  return (
    <>
      <Header />
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

        <Typography variant="h5" align="center" color="textSecondary">
          You have no products in your cart
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Create or log in to your account
        </Typography>
        <Box mt={2}>
          {" "}
          {/* Espace supplémentaire */}
          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#98d648" }}
              component={Link}
              to="/login" // Lien vers la page de connexion
            >
              Log In
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: "#98d648" }} // Couleur verte
              component={Link}
              to="/register" // Lien vers la page d'inscription
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EmptyPanier;
