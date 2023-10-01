import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProduct from "./CardProduct";
import axios from "axios";
import configData from "../config.json";
import { useState, ReactNode, useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Slide,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductByCat() {
  type ProductType = {
    id: String;
    reference: String;
    name: String;
    description: String;
    imagePath:String;
  };
  const [value, setValue] = React.useState(0);
  const [bestproducts, setBestProducts] = useState([] as ProductType[]);
  const [allProducts, setProducts] = useState([] as ProductType[]);

  const [loading, setLoading] = useState(true);
  const SERVER_URL = configData.SERVER_URL;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/best-selling`)
      .then((response) => {
        setBestProducts(response.data);
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  });
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Best sellers" {...a11yProps(0)} />
          <Tab label="Recommanded products" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {bestproducts.slice(0, 8).map((product) => (
            <Grid item xs={3}>
              <CardProduct
              id={product.id}
              nom={product.name}
              imagePath={product.imagePath} 
              />
            </Grid>
          ))}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Grid container spacing={2}>
          {allProducts.slice(0, 8).map((product) => (
            <Grid item xs={3}>
              <CardProduct
                id={product.id}
                nom={product.name}
                imagePath={product.imagePath}
              />
            </Grid>
          ))}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Tous
      </CustomTabPanel>
    </Box>
  );
}
