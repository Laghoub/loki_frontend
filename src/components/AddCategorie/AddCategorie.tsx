import React, { FC, useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import configData from "../../config.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginAdmin from "../LoginAdmin";

interface AddCategorieProps {}
interface Category {
  name: string;
  created: string;
  createdBy: string;
  products: any[];
}
const AddCategorie: FC<AddCategorieProps> = () => {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("connectedA", "false");
    localStorage.setItem("isAdmin", "false");
    localStorage.removeItem("tokenA");
    navigate("/admin");
  };
  const tokenA = localStorage.getItem("tokenA");
  const isAdministrator = localStorage.getItem("isAdmin");
  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    created: "",
    createdBy: "",
    products: [],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const SERVER_URL = configData.SERVER_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new category by sending a POST request to your server
    const postCategoryData = {
      name: categoryData.name,
      created: new Date().toISOString(),
      createdBy: "admin",
      products: [],
    };
    axios
      .post(`${SERVER_URL}/product-categories`, postCategoryData)
      .then((response) => {
        // Handle the successful response, e.g., show a success message or redirect
        console.log(postCategoryData);
        console.log("Category added successfully:", response.data);
        setSuccessMessage("Category added successfully");
        setErrorMessage(""); // Clear any previous error message
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        console.error("Error adding category:", error);
        console.log(postCategoryData);
        setSuccessMessage(""); // Clear any previous success message
        setErrorMessage("Failed to add the product. Please try again.");
      });
  };
  if (tokenA && isAdministrator) {
    return (
      <div className="app">
        <div className="app-header fixed-top">
          <div id="app-sidepanel" className="app-sidepanel">
            <div id="sidepanel-drop" className="sidepanel-drop"></div>
            <div className="sidepanel-inner d-flex flex-column">
              <a
                href="#"
                id="sidepanel-close"
                className="sidepanel-close d-xl-none"
              >
                &times;
              </a>
              <div className="app-branding">
                <Link to="/admin/dash">
                  <a className="app-logo">
                    <img
                      className="logo-icon me-2"
                      src={logo}
                      width={20}
                      alt="logo"
                    />
                    <span className="logo-text">LOKI</span>
                  </a>
                </Link>
              </div>
              <nav
                id="app-nav-main"
                className="app-nav app-nav-main flex-grow-1"
              >
                <ul
                  className="app-menu list-unstyled accordion"
                  id="menu-accordion"
                >
                  <li className="nav-item">
                    <Link to="/admin/dash">
                      <a className="nav-link ">
                        <span className="nav-icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-house-door"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* SVG path here */}
                          </svg>
                        </span>
                        <span className="nav-link-text">Overview</span>
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/recentOrders">
                      {" "}
                      <a className="nav-link">
                        <span className="nav-icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-card-list"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* SVG path here */}
                          </svg>
                        </span>
                        <span className="nav-link-text">Orders</span>
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item has-submenu">
                    <a
                      className="nav-link submenu-toggle"
                      data-bs-target="#submenu-1"
                      aria-expanded="true"
                      aria-controls="submenu-1"
                      style={{ fontWeight: "500" }}
                    >
                      <span className="nav-icon">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-files"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* SVG path here */}
                        </svg>
                      </span>
                      <span className="nav-link-text">Manage Products</span>
                      <span className="submenu-arrow">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chevron-down"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* SVG path here */}
                        </svg>
                      </span>
                    </a>
                    <div
                      id="submenu-1"
                      className=" submenu submenu-1 nav-item"
                      data-bs-parent="#menu-accordion"
                      style={{ fontWeight: "500", paddingLeft: " 1.5em" }}
                    >
                      <ul className="submenu-list list-unstyled">
                        <li className="submenu-item">
                          <Link to="/admin/addProduct">
                            <a className="submenu-link nav-link ">
                              Add Product
                            </a>
                          </Link>
                        </li>
                        <li className="submenu-item">
                          <Link
                            to="/admin/addCategory"
                            style={{ width: "100%" }}
                          >
                            <a className="submenu-link  nav-link active">
                              Add Category
                            </a>
                          </Link>
                        </li>
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
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-gear"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* SVG path here */}
                          </svg>
                        </span>
                        <span className="nav-link-text" onClick={logout}>
                          Log out
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div
          className="app-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          <form onSubmit={handleFormSubmit} style={{ width: "70%" }}>
            <div className="row">
              <div className="col-md-12 mb-4 float-right">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Add a Category*</h5>
                  </div>
                  <div className="card-body">
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="name">Category Name*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={categoryData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  {/* Add this where you want to display success or error messages */}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}

                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <LoginAdmin />;
  }
};

export default AddCategorie;
