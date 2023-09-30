import * as React from "react";
import { useState, ReactNode, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import configData from "../config.json";

function createData(name: string) {
  return { name };
}

const rows = [
  createData("Anti-biotique"),
  createData("Doliprane"),
  createData("génériques"),
  createData("stupéfiants"),
  createData("dérivés du sang"),
];

export default function Categorie() {
  type CategorieType = {
    nom: string;
  };

  const [categories, setCategories] = useState([] as CategorieType[]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = configData.SERVER_URL;

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/products/category`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching categories data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  });

  // Conditional rendering: Show loading indicator while loading
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              Catégorie
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((categorie) => (
            <TableRow
              key={categorie.nom}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {categorie.nom}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
