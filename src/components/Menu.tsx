import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Slide,
  Typography,
} from "@mui/material";

export default function Menu() {
  const [value, setValue] = React.useState(0);
  const [color, setCalor] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Accueil" />
        <Tab label="Inscription" />
        <Tab label="Achat" />
        <Tab label="Paiement" />
      </Tabs>
    </Box>
  );
}
