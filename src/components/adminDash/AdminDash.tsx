import React, { FC } from "react";
import styles from "./adminDash.module.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import BestSellersAdm from "../BestSellersAdm/BestSellersAdm";
import LoginAdmin from "../LoginAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import configData from "../../config.json";

interface AdminDashProps { }

const AdminDash: FC<AdminDashProps> = () => {
  const SERVER_URL = configData.SERVER_URL;

  let navigate = useNavigate();
  const defaultUserData = {
    id: "",
    login: "",
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    activated: "",
    langKey: "",
    createdBy: "",
    createdDate: "",
    lastModifiedBy: "",
    lastModifiedDate: "",
    authorities: [],
  };
  const [userData, setUserData] = useState(defaultUserData);
  const tokenA = localStorage.getItem("tokenA");
  var isAdministrator = true;
  const logout = () => {
    localStorage.setItem("connectedA", "false");
    localStorage.setItem("isAdmin", "false");
    localStorage.removeItem("tokenA");
    navigate("/admin");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/account`, {
          headers: {
            Authorization: `Bearer ${tokenA}`,
          },
        });

        console.log(tokenA);

        setUserData(response.data);
        console.log(response.data);
        localStorage.setItem("authorities", response.data.authorities);
        const storedAuthoritiesJSON = localStorage.getItem("authorities");
        console.log(storedAuthoritiesJSON);
        // Vérifier si 'storedAuthoritiesJSON' n'est pas null
        if (storedAuthoritiesJSON !== null) {
          // Convertir la chaîne JSON en objet JavaScript
          const authoritiesArray = storedAuthoritiesJSON.split(",");

          console.log(authoritiesArray);

          // Vérifier si 'storedAuthorities' n'est pas null et s'il contient "ROLE_ADMIN"
          const isAdmin =
            Array.isArray(authoritiesArray) &&
            authoritiesArray.includes("ROLE_ADMIN");

          if (isAdmin) {
            console.log(isAdmin);
            isAdministrator = true;
            localStorage.setItem("isAdmin", "true");
          } else {
            console.log(isAdmin);
            console.log("L'utilisateur n'a pas le rôle ROLE_ADMIN.");
          }
        } else {
          console.log("Aucune autorité n'a été trouvée dans le local storage.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur : ",
          error
        );
      }
    };

    // Appelez la fonction pour récupérer les données lorsque le composant est monté
    if (localStorage.getItem("connectedA") === "true") {
      fetchUserData();
    }
  }, []);
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
                    <a className="nav-link active">
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
                      data-bs-toggle="collapse"
                      data-bs-target="#submenu-1"
                      aria-expanded="false"
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
                      <span
                        className="nav-link-text"
                        style={{ cursor: "pointer" }}
                      >
                        Manage Products
                      </span>
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
                      className="collapse submenu submenu-1"
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
                          <Link to="/admin/addCategory">
                            <a className="submenu-link  nav-link ">
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
                        <span className="nav-link-text" onClick={logout} style={{cursor:"pointer"}}>
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
        <div className="app-wraper">
          <BestSellersAdm />
        </div>
      </div>
    );
  } else {
    return <LoginAdmin />;
  }
};

export default AdminDash;
