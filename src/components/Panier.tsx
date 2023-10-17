import CssBaseline from "@mui/material/CssBaseline";
import "../App.css";
import Header from "./Header";
import Menu from "./Menu";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material/styles";
import Cookies from "js-cookie";
import pharma1 from "../assets/No_image_available.png";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Icône de suppression
import AddIcon from "@mui/icons-material/Add"; // Icône d'ajout
import RemoveIcon from "@mui/icons-material/Remove";
import configData from "../config.json";

const Panier = () => {
  const livraisonExpressValue = configData.SHIPPINGEXPRESS;
  const [livraisonExpress, setLivraisonExpress] = useState(false);
  const [panier, setPanier] = useState([]); // Utilisez un état pour stocker les produits du panier
  const navigate = useNavigate();

  const updateQuantite = (nom: String, nouvelleQuantite: Float32Array) => {
    // Mise à jour de l'état du panier
    setPanier((prevState: any) =>
      prevState.map((produit: any) =>
        produit.nom === nom
          ? { ...produit, quantite: nouvelleQuantite }
          : produit
      )
    );

    // Mise à jour des cookies avec les nouvelles quantités
    const panierDansCookies = Cookies.get("panier");
    if (panierDansCookies) {
      const panierJSON = JSON.parse(panierDansCookies);
      const nouveauPanierJSON = panierJSON.map((produit: any) => {
        if (produit.nom === nom) {
          produit.quantite = nouvelleQuantite;
        }
        return produit;
      });
      Cookies.set("panier", JSON.stringify(nouveauPanierJSON), { expires: 7 });
    }
  };

  const supprimerProduit = (nom: string) => {
    // Supprimer le produit du panier
    setPanier((prevState) =>
      prevState.filter((produit: any) => produit.nom !== nom)
    );

    // Mettre à jour les cookies
    const panierDansCookies = Cookies.get("panier");
    if (panierDansCookies) {
      const panierJSON = JSON.parse(panierDansCookies);
      const nouveauPanierJSON = panierJSON.filter(
        (produit: any) => produit.nom !== nom
      );
      Cookies.set("panier", JSON.stringify(nouveauPanierJSON), { expires: 7 });
    }
  };

  useEffect(() => {
    const panierFromCookies = JSON.parse(Cookies.get("panier") || "[]");

    if (panierFromCookies.length === 0) {
      // Les cookies sont vides, redirigez vers la page "EmptyPanier"
      Cookies.remove("panier");
    } else {
      setPanier(panierFromCookies);
    }
  }, [navigate]);
  // Récupérez le panier depuis les cookies

  const removeCok = (id: any) => {
    console.log(Cookies.get("panier") + " " + montantTotal);
    navigate("/Checkout", {
      state: { montantTotal: montantAvecLivraison.toFixed(2) },
    });
  };

  const montantTotal = panier.reduce(
    (total, produit: any) => total + produit.prix * produit.quantite,
    0
  );

  const montantAvecLivraison = livraisonExpress
    ? montantTotal + livraisonExpressValue
    : montantTotal;

  return (
    <div>
      <CssBaseline />
      <Header />
      <Menu />
      <Typography component="h1" variant="h5">
        MY CART
      </Typography>

      <div style={{ margin: "0 auto", padding: "4rem" }}>
        <Grid container spacing={2}>
          {/* Première colonne */}
          <Grid item xs={8}>
            <Paper>
              <List>
                {panier.map((produit: any) => (
                  <ListItem key={produit.name}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <img
                          src={pharma1}
                          alt={produit.nom}
                          style={{ maxWidth: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ListItemText primary={produit.nom} />
                        <ListItemText
                          secondary={"Unit price: " + produit.prix + "€"}
                        />
                        <ListItemText
                          secondary={"Quantity: " + produit.quantite}
                        />

                        <input
                          type="number"
                          value={produit.quantite}
                          onChange={(e: any) =>
                            updateQuantite(produit.nom, e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle1" >
                          {"Total price " +
                            (produit.prix * produit.quantite).toFixed(2)}{" "}
                          €
                        </Typography>
                        <div>
                          {/* Bouton de diminution (rouge) */}

                          {/* Icône de suppression */}
                          <IconButton
                            color="error" // Couleur rouge
                            onClick={() => {
                              supprimerProduit(produit.nom);

                              setPanier((prevState: any) =>
                                prevState.filter(
                                  (item: any) => item.nom !== produit.nom
                                )
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Deuxième colonne */}
          <Grid item xs={4}>
            <Paper
              style={{
                padding: "16px",
                textAlign: "center", // Centre le contenu horizontalement
              }}
            >
              {/* Demande de livraison express 
              <FormControlLabel
                control={
                  
                  <Checkbox
                    checked={livraisonExpress}
                    onChange={() => setLivraisonExpress(!livraisonExpress)}
                  />
                }
                label="Express 
                delivery (4€)"
              />
              */}
              {/* Montant total */}
              <Box>
                <Typography variant="h6">Total amount </Typography>
                <Typography variant="h4" style={{ padding: "8px 0" }}>
                  {montantAvecLivraison.toFixed(2)} €
                </Typography>
              </Box>
              <div style={{ marginTop: "16px" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#4CAF50", // Couleur verte
                    color: "#fff",
                  }}
                  onClick={removeCok}
                >
                  confirm the command
                </Button>
              </div>
            </Paper>
            <br />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Panier;
