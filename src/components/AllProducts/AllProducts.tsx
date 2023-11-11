import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Pagination from '@mui/material/Pagination';
import configData from "../../config.json";

type ProductType = {
  id: number;
  reference: string;
  name: string;
  description: string;
  weightedAveragePrice: string;
};

const ITEMS_PER_PAGE = 10;

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState([] as ProductType[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const SERVER_URL = configData.SERVER_URL;

  useEffect(() => {
    // Fetch products for the current page
    fetchProducts(currentPage);
    fetchTotalProducts();

  }, [currentPage]);

  const fetchProducts = (page: number) => {
    axios
      .get(`${SERVER_URL}/products?page=${page}&size=${ITEMS_PER_PAGE}`)
      .then((response) => {
        console.log(response)
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };
  const fetchTotalProducts = () => {
    axios
      .get(`${SERVER_URL}/products`)
      .then((response) => {
        // Calculate total pages based on the total number of products and items per page
        setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
      })
      .catch((error) => {
        console.error('Error fetching total number of products:', error);
      });
  };
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: '#d3d3d340' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Reference</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ margin: '3em' }}>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, boxShadow: 0 }}
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
                  <Link style={{ color: '#98d648' }} to={`/details/${product.id}`}>
                    Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
};

export default AllProducts;
