import CssBaseline from "@mui/material/CssBaseline";
import "../App.css";
import Header from "./Header";
import Menu from "./Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
import anti from "../assets/anti.jpg";
import para from "../assets/para.png";
import teva from "../assets/teva.jpg";
import { makeStyles } from "@mui/material/styles";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Slide,
  Typography,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Icône de suppression
import AddIcon from "@mui/icons-material/Add"; // Icône d'ajout
import RemoveIcon from "@mui/icons-material/Remove";

const Panier = () => {
  const [livraisonExpress, setLivraisonExpress] = useState(false);
  const [panier, setPanier] = useState([
    {
      id: 1,
      nom: "Paracétamol",
      description: "Douleur, fievre, faiblesse",
      prix: 5.02,
      quantite: 1,
      image: para,
    },
    {
      id: 2,
      nom: "amoxiciline",
      description: "Douleur, fievre, faiblesse",
      prix: 8.32,
      quantite: 1,
      image: anti,
    },
    {
      id: 3,
      nom: "Teva 100mg",
      description: "Douleur, fievre, faiblesse",
      prix: 6.22,
      quantite: 1,
      image: teva,
    },
    // Ajoutez d'autres produits au panier si nécessaire
  ]);

  const montantTotal = panier.reduce(
    (total, produit) => total + produit.prix * produit.quantite,
    0
  );

  const montantAvecLivraison = livraisonExpress
    ? montantTotal + 4
    : montantTotal;

  return (
    <div>
      <CssBaseline />
      <Header />
      <Menu />
      <Typography component="h1" variant="h5">
        Récapitulatif de mon panier
      </Typography>

      <div style={{ margin: "0 auto", padding: "4rem" }}>
        <Grid container spacing={2}>
          {/* Première colonne */}
          <Grid item xs={8}>
            <Paper>
              <List>
                {panier.map((produit) => (
                  <ListItem key={produit.id}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <img
                          src={produit.image}
                          alt={produit.nom}
                          style={{ maxWidth: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ListItemText
                          primary={produit.nom}
                          secondary={produit.description}
                        />
                        <ListItemText
                          secondary={"Prix unitaire: " + produit.prix + "€"}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle1">
                          {(produit.prix * produit.quantite).toFixed(2)} €
                        </Typography>
                        <div>
                          {/* Bouton de diminution (rouge) */}
                          <IconButton
                            color="error" // Couleur rouge
                            onClick={() => {
                              if (produit.quantite > 1) {
                                setPanier((prevState) =>
                                  prevState.map((item) =>
                                    item.id === produit.id
                                      ? { ...item, quantite: item.quantite - 1 }
                                      : item
                                  )
                                );
                              }
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <span>{produit.quantite}</span>
                          {/* Bouton d'augmentation (vert) */}
                          <IconButton
                            color="success" // Couleur verte
                            onClick={() => {
                              setPanier((prevState) =>
                                prevState.map((item) =>
                                  item.id === produit.id
                                    ? { ...item, quantite: item.quantite + 1 }
                                    : item
                                )
                              );
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                          {/* Icône de suppression */}
                          <IconButton
                            color="error" // Couleur rouge
                            onClick={() => {
                              setPanier((prevState) =>
                                prevState.filter(
                                  (item) => item.id !== produit.id
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
              {/* Demande de livraison express */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={livraisonExpress}
                    onChange={() => setLivraisonExpress(!livraisonExpress)}
                  />
                }
                label="Livraison express (+4 €)"
              />

              {/* Montant total */}
              <Box>
                <Typography variant="h6">Montant total</Typography>
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
                  onClick={() => {
                    // Ajoutez ici la logique de validation de la commande
                    alert("Commande validée !");
                  }}
                >
                  Valider la commande
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
