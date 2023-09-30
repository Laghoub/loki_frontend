import CssBaseline from "@mui/material/CssBaseline";
import "../App.css";
import Header from "./Header";
import Menu from "./Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import ImageTransition from "./ImageTransition";
import Categorie from "./Categories";
import ProductByCat from "./ProductByCat";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Menu />
      <br />
      <div style={{  margin: '0 auto',
  padding: '1rem'}}>
        <Grid container spacing={2}>
          {/* Première colonne */}
          <Grid item xs={3} >
            <Paper>
              <Categorie />
            </Paper>
          </Grid>
          {/* Deuxième colonne */}
          <Grid item xs={9} >
            <ImageTransition />
            <br />
            <div style={{margin: '1em'}}>
            <h3>Products</h3>
            <ProductByCat />
            </div>
            
          </Grid>
        </Grid>

        
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
