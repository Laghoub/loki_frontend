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
import ProductsByCategory from "./ProductsByCategory";

import { useParams } from 'react-router-dom';

const ProductsCatPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const SERVER_URL = "http://localhost:8081/api";

  // Now, you can use the categoryId to fetch the category name from your data source
  // and display it in your component.

  // Example: Assuming you have a function to fetch category details by ID
  //const categoryName = getCategoryNameById(categoryId);
  const [category, setCategory] = useState<any>(null); // Replace 'any' with your actual category type

  useEffect(() => {
    // Define an async function to fetch category details
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/product-categories/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
        } else {
          console.error('Failed to fetch category details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };

    // Call the async function immediately
    fetchCategory();
  }, [categoryId]);
  return (
    <div>
      <CssBaseline />
      <Header />
      <Menu />
      <br />
      <div style={{ margin: "0 auto", padding: "1rem" }}>
        <Grid container spacing={2}>
          {/* Première colonne */}
          <Grid item xs={3}>
            <Paper>
              <Categorie />
            </Paper>
          </Grid>
          {/* Deuxième colonne */}
          <Grid item xs={9}>
          {category && <h2>{category.name}</h2>}
            <ProductsByCategory />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsCatPage;
