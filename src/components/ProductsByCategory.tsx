import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import configData from "../config.json";

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
    weightedAveragePrice:string;
  };
  const { categoryId } = useParams();
  const [products, setProducts] = useState([] as ProductType[]);
  const SERVER_URL = configData.SERVER_URL;

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/products/category/${categoryId}`)
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
      <TableHead style={{backgroundColor:"#d3d3d340",}}>
          <TableRow>
            <TableCell sx={{fontWeight: "bold" }}>
              Reference
            </TableCell>
            <TableCell sx={{fontWeight: "bold" }}>
              Name
            </TableCell>
            <TableCell sx={{fontWeight: "bold" }}>
              Description
            </TableCell>
            <TableCell sx={{fontWeight: "bold" }}>
              Price
            </TableCell>
            <TableCell sx={{fontWeight: "bold" }}>
              
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody style={{margin:"3em"}}>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 },boxShadow: 0 }}
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
                {product.weightedAveragePrice} €
              </TableCell>
              <TableCell component="th" scope="row">
                <Link style={{color:'#98d648'}} to={`/details/${product.id}`}>Details</Link>
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
