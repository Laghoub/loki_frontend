import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ProductsByCategory = () => {
  type ProductType = {
    id: number;
    reference: string;
    name: string;
    description: string;
    quantityInStock: number;
    nbrOfSells: number;
    consumptionDeadline: string;
    productCode: string;
  };
  const { categoryId } = useParams();
  const [products, setProducts] = useState([] as ProductType[]);
  const SERVER_URL = "http://localhost:8081/api/products";

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/category/${categoryId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  }, [categoryId]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              Reference
            </TableCell>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              Name
            </TableCell>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              Description
            </TableCell>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              Quantity
            </TableCell>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              Number of sellers
            </TableCell>
            <TableCell sx={{ backgroundColor: "#98d648", fontSize: "20px" }}>
              consumption Deadline
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.reference}
              </TableCell>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {product.description}
              </TableCell>
              <TableCell component="th" scope="row">
                {product.quantityInStock}
              </TableCell>
              <TableCell component="th" scope="row">
                {product.nbrOfSells}
              </TableCell>
              <TableCell component="th" scope="row">
                {product.consumptionDeadline}
              </TableCell>

              {/* Add other product details as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsByCategory;
