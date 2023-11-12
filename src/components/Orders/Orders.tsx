import React, { FC, useEffect, useState } from 'react';
import styles from './orders.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import axios from 'axios';
import LoginAdmin from '../LoginAdmin';
import configData from "../../config.json";

interface OrdersProps { }

const Orders: FC<OrdersProps> = () => {
  const SERVER_URL = configData.SERVER_URL;

  const LineOfCommand = {
    id: 0,
    quantity: 0,
    product: {
      name: "",
      weightedAveragePrice: 0,
      // Add other properties as needed
    },
    total: 0,
    created: ""
    // Add other properties as needed
  }
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
        const response = await axios.get(`${SERVER_URL}/api/account`, {
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
  const [lineOfCommands, setLineOfCommands] = useState<typeof LineOfCommand[]>([]);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/line-of-commands?page=0&size=${ITEMS_PER_PAGE}&sort=created,desc`);
        console.log('API Response:', response.data);
        setLineOfCommands(response.data);
      } catch (error) {
        console.error('Error fetching line of commands:', error);
      }
    };

    fetchData();
  }, []);
  console.log(lineOfCommands)
  if (tokenA && isAdministrator) {
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
                <Link to="/admin/dash">


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
                  <li className="nav-item ">
                    <Link to='/admin/recentOrders' style={{ width: "100%" }}>
                      <a className="nav-link active ">
                        <span className="nav-icon">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            {/* SVG path here */}
                          </svg>
                        </span>
                        <span className="nav-link-text">Orders</span>
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item has-submenu">
                    <a className="nav-link submenu-toggle" data-bs-toggle="collapse" data-bs-target="#submenu-1" aria-expanded="false" aria-controls="submenu-1" style={{ fontWeight: "500" }}>
                      <span className="nav-icon">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-files" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          {/* SVG path here */}
                        </svg>
                      </span>
                      <span className="nav-link-text" style={{ cursor: 'pointer' }}>Manage Products</span>
                      <span className="submenu-arrow">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          {/* SVG path here */}
                        </svg>
                      </span>
                    </a>
                    <div id="submenu-1" className="collapse submenu submenu-1" data-bs-parent="#menu-accordion" style={{ fontWeight: "500", paddingLeft: " 1.5em" }}>
                      <ul className="submenu-list list-unstyled">
                        <li className="submenu-item"><Link to='/admin/addProduct'><a className="submenu-link nav-link ">Add Product</a></Link></li>
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
                        <span className="nav-link-text" onClick={logout} style={{ cursor: "pointer" }}>
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
          <div className="app-wrapper">
            <div className="app-content pt-3 p-md-3 p-lg-4">
              <div className="container-xl">
                <div className="row g-3 mb-4 align-items-center justify-content-between">
                  <div className="col-auto">
                    <h1 className="app-page-title mb-0">Recent orders</h1>
                  </div>


                </div>
                <nav
                  id="orders-table-tab"
                  className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
                >
                  <a
                    className="flex-sm-fill text-sm-center nav-link active"
                    id="orders-all-tab"
                    data-bs-toggle="tab"
                    href="#orders-all"
                    role="tab"
                    aria-controls="orders-all"
                    aria-selected="true"
                    style={{ padding: "1.5em" }}

                  >
                    Recent Orders
                  </a>

                </nav>
                <div className="tab-content" id="orders-table-tab-content">
                  <div className="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
                    <div className="app-card app-card-orders-table shadow-sm mb-5">
                      <div className="app-card-body">
                        <div className="table-responsive">
                          <table className="table app-table-hover mb-0 text-left">
                            <thead>
                              <tr>
                                <th className="cell">Order</th>
                                <th className="cell">Product</th>
                                <th className="cell">Weighted Average Price</th>
                                <th className="cell">Quantity</th>
                                <th className="cell">Date</th>
                                <th className="cell">Status</th>
                                <th className="cell">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lineOfCommands?.map((order) => (
                                <tr key={order.id}>
                                  {order.product != null ? (
                                    <>
                                      <td className="cell">#{order.id}</td>





                                      <td className="cell">
                                        <span className="truncate">{order.product.name}</span>
                                      </td>
                                      <td className="cell">{order.product.weightedAveragePrice} €</td>


                                      <td className="cell">{order.quantity}</td>
                                      <td className="cell">
                                        <span>{new Date(order.created).toLocaleDateString()}</span>
                                        <span className="note">{new Date(order.created).toLocaleTimeString()}</span>
                                      </td>
                                      <td className="cell">
                                        <span className="badge bg-success">Paid</span>
                                      </td>
                                      <td className="cell">{order.total} €</td> </>) : (<></>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

    )
  } else {
    return <LoginAdmin />;
  }
};

export default Orders;
