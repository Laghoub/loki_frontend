import React, { FC, useEffect, useState } from 'react';
import styles from './AddProduct.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import configData from "../../config.json";
import axios from 'axios';

interface AddProductProps { }
interface Category {
  id: number;
  name: string;
  created: string;
  createdBy: string;
  products: any[]; // You can specify the type for products as needed
}
const AddProduct: FC<AddProductProps> = () => {
  const [productData, setProductData] = useState({
    reference: '',
    name: '',
    productCategoryId: '', // Add a category state
    productCode: '',
    description: '',
    quantityInStock: "0",
    weightedAveragePrice: "0",
    nbrOfSells:" 0",
    productStatus: "VALIDATED",
    active: "true",
  });
  const [categories, setCategories] = useState<Category[]>([]); // Specify the type as Category
  const [selectedCategory, setSelectedCategory] = useState('');
  const SERVER_URL = configData.SERVER_URL;
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const findCategoryIdByName = (categoryName:any) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.id : null;
  };
  useEffect(() => {
    // Fetch category data from the API
    fetch(`${SERVER_URL}/product-categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log(selectedCategory)
    const { name, value } = e.target as HTMLInputElement;;

    // Validate input for quantityInStock and weightedAveragePrice
    if (name === 'quantityInStock' || name === 'weightedAveragePrice') {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue) || numericValue <= 0) {
        setErrorMessage('Please enter a valid number greater than 0.');
        return;
      }
    }
    e.preventDefault();
    // Create a new object with only the fields you want to send
    const postData = {
      reference: productData.reference,
      name: productData.name,
      productCategoryId: findCategoryIdByName(selectedCategory)?.toString(),
      productCode: productData.productCode,
      description: productData.description,
      quantityInStock: productData.quantityInStock, // Ensure it's a number
      weightedAveragePrice: productData.weightedAveragePrice, // Ensure it's a number
      nbrOfSells: "0",
      productStatus: "VALIDATED",
      active: "true"    };

    axios
      .post(`${SERVER_URL}/products`, postData)
      .then((response) => {
        // Handle the successful response, e.g., show a success message or redirect
        console.log(postData)
        console.log('Product added successfully:', response.data);
        setSuccessMessage('Product added successfully');
        setErrorMessage(''); // Clear any previous error message
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        console.error('Error adding product:', error);
        console.log(postData)
        setSuccessMessage(''); // Clear any previous success message
        setErrorMessage('Failed to add the product. Please try again.');
      });
  };
  return (
    <div className="app">
      <div className="app-header fixed-top">
        <div id="app-sidepanel" className="app-sidepanel">
          <div id="sidepanel-drop" className="sidepanel-drop"></div>
          <div className="sidepanel-inner d-flex flex-column">
            <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none">
              &times;
            </a>
            <div className="app-branding">
              <Link to="/">


                <a className="app-logo" >
                  <img className="logo-icon me-2" src={logo} width={20} alt="logo" />
                  <span className="logo-text">LOKI</span>
                </a>
              </Link>
            </div>
            <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
              <ul className="app-menu list-unstyled accordion" id="menu-accordion">
                <li className="nav-item">
                  <Link to='/admin/dash'>
                  <a className="nav-link ">
                    <span className="nav-icon">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        {/* SVG path here */}
                      </svg>
                    </span>
                    <span className="nav-link-text">Overview</span>
                  </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/admin/recentOrders'> <a className="nav-link" >
                    <span className="nav-icon">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        {/* SVG path here */}
                      </svg>
                    </span>
                    <span className="nav-link-text">Orders</span>
                  </a></Link>
                </li>
                <li className="nav-item has-submenu">
                <a className="nav-link submenu-toggle"  data-bs-target="#submenu-1" aria-expanded="true" aria-controls="submenu-1" style={{fontWeight: "500"}}>
                  <span className="nav-icon">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-files" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                  <span className="nav-link-text" >Manage Products</span>
                  <span className="submenu-arrow">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                </a>
                <div id="submenu-1" className=" submenu submenu-1 nav-item" data-bs-parent="#menu-accordion" style={{ fontWeight: "500",   paddingLeft:" 1.5em"}}>
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item"><Link to='/admin/addProduct' style={{width:"100%"}}><a className="submenu-link nav-link active">Add Product</a></Link></li>
                    <li className="submenu-item"><Link to='/admin/addCategory' ><a className="submenu-link  nav-link ">Add Category</a></Link></li>
                  </ul>
                </div>
              </li>
              </ul>
            </nav>
            <div className="app-sidepanel-footer">
              <nav className="app-nav app-nav-footer">
                <ul className="app-menu footer-menu list-unstyled">
                  <li className="nav-item">
                    <a className="nav-link">
                      <span className="nav-icon">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          {/* SVG path here */}
                        </svg>
                      </span>
                      <span className="nav-link-text">Log out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

        </div>

      </div>
      <div className="app-wrapper" style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2em"
      }}>
        <form onSubmit={handleFormSubmit} style={{ width: "70%" }}>
          <div className="row" >
            <div className="col-md-12 mb-4 float-right">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Add a Product*</h5>
                </div>
                <div className="card-body">
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  {/* Reference */}
                  <div className="form-group">
                    <label htmlFor="reference">Reference*</label>
                    <input
                      type="text"
                      id="reference"
                      name="reference"
                      className="form-control"
                      value={productData.reference}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={productData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  {/* Text input */}
                  <div className="form-outline mb-6">
                    <label htmlFor="category">Category*</label>
                    <select
                      id="category"
                      name="category"
                      className="form-control"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  {/* Product Code */}
                  <div className="form-group">
                    <label htmlFor="productCode">Product Code*</label>
                    <input
                      type="text"
                      id="productCode"
                      name="productCode"
                      className="form-control"
                      value={productData.productCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label htmlFor="description">Description*</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="form-control"
                      value={productData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Quantity in Stock */}
                  <div className="form-group">
                    <label htmlFor="quantityInStock">Quantity in Stock*</label>
                    <input
                      type="number"
                      id="quantityInStock"
                      name="quantityInStock"
                      className="form-control"
                      value={productData.quantityInStock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>

                  {/* Weighted Average Price */}
                  <div className="form-group">
                    <label htmlFor="weightedAveragePrice">Weighted Average Price (Euro)*</label>
                    <input
                      type="number"
                      id="weightedAveragePrice"
                      name="weightedAveragePrice"
                      className="form-control"
                      value={productData.weightedAveragePrice}
                      min="0"
                     
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* Add this where you want to display success or error messages */}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                  <button type="submit" className="btn btn-primary">
                    Add 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AddProduct;
