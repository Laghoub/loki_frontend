import React, { FC, useEffect, useState } from 'react';
import styles from './BestSellersAdm.module.css';
import axios from "axios";
import configData from "../../config.json";
interface BestSellersAdmProps { }

const BestSellersAdm: FC<BestSellersAdmProps> = () => {

  const SERVER_URL = configData.SERVER_URL;
  type ProductType = {
    id: number;
    reference: string;
    name: string;
    nbrOfSells:string;
    weightedAveragePrice:string;
  };
  const [value, setValue] = React.useState(0);
  const [bestproducts, setBestProducts] = useState([] as ProductType[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/best-selling`)
      .then((response) => {
        setBestProducts(response.data);
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  },[]);
  return(
  <div className="app">
    <div className="app-wrapper">
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto">
              <h1 className="app-page-title mb-0">Dashboard</h1>
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
              Best sellers
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
                      <th className="cell">ID</th>
                      <th className="cell">Reference</th>
                      <th className="cell">Product Name</th>
                       <th className="cell">Weighted Average Price</th>
                      <th className="cell">Number of Sells</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {bestproducts.slice(0, 10).map((product) => (
                      <tr key={product.id}>
                        <td className="cell">{product.id}</td>
                        <td className="cell">{product.reference}</td>
                        <td className="cell">{product.name}</td>
                        <td className="cell">{product.weightedAveragePrice} €</td>
                        <td className="cell">{product.nbrOfSells}</td>
                        
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
);}

export default BestSellersAdm;
