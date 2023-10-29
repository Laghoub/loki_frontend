import React, { FC } from 'react';
import styles from './adminDash.module.css';
import logo from '../../assets/logo.jpg'
import { Link } from 'react-router-dom';
import BestSellersAdm from '../BestSellersAdm/BestSellersAdm';

interface AdminDashProps { }

const AdminDash: FC<AdminDashProps> = () => (
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
                <a className="nav-link active" href="index.html">
                  <span className="nav-icon">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                  <span className="nav-link-text">Overview</span>
                </a>
              </li>
              <li className="nav-item">
               <Link to='/orders'> <a className="nav-link" >
                  <span className="nav-icon">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG path here */}
                    </svg>
                  </span>
                  <span className="nav-link-text">Orders</span>
                </a></Link>
              </li>
              <li className="nav-item has-submenu">
                <a className="nav-link submenu-toggle"  data-bs-toggle="collapse" data-bs-target="#submenu-1" aria-expanded="false" aria-controls="submenu-1">
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
     <BestSellersAdm />
    </div>
  </div>

);

export default AdminDash;
