import React, { FC } from 'react';
import styles from './orders.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg'

interface OrdersProps { }

const Orders: FC<OrdersProps> = () => (
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
              <Link to="/admin"> <a className="nav-link " >
                  <span className="nav-icon">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                  <span className="nav-link-text">Overview</span>
                </a></Link> 
              </li>
              <li className="nav-item">
                <a className="nav-link active">
                  <span className="nav-icon">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                  <span className="nav-link-text">Orders</span>
                </a>
              </li>
              <li className="nav-item has-submenu">
                <a className="nav-link submenu-toggle" href="#" data-bs-toggle="collapse" data-bs-target="#submenu-1" aria-expanded="false" aria-controls="submenu-1">
                  <span className="nav-icon">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-files" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                  <span className="nav-link-text">Manage Products</span>
                  <span className="submenu-arrow">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                </a>
                <div id="submenu-1" className="collapse submenu submenu-1" data-bs-parent="#menu-accordion">
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item"><a className="submenu-link">Add Product</a></li>
                    <li className="submenu-item"><a className="submenu-link">Add categorie</a></li>
                    <li className="submenu-item"><a className="submenu-link">Delete Product</a></li>
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
    <div className="app-wraper">
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Orders</h1>
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
                            <th className="cell">Customer</th>
                            <th className="cell">Date</th>
                            <th className="cell">Status</th>
                            <th className="cell">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="cell">#15346</td>
                            <td className="cell"><span className="truncate">Lorem ipsum dolor sit amet eget volutpat erat</span></td>
                            <td className="cell">John Sanders</td>
                            <td className="cell"><span>17 Oct</span><span className="note">2:16 PM</span></td>
                            <td className="cell"><span className="badge bg-success">Paid</span></td>
                            <td className="cell">$259.35</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <nav className="app-pagination">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default Orders;
