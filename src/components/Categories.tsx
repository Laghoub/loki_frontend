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

export default function Categorie() {
  type CategorieType = {
    id: number;
    name: string;
    created: string;
  };

  const [categories, setCategories] = useState([] as CategorieType[]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = configData.SERVER_URL;

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/product-categories`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching categories data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              Categories
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((categorie) => (
            <TableRow
              key={categorie.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {categorie.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
