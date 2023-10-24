import React, { FC, useEffect } from 'react';
import './RecapComponent.css';
import Header from '../Header';
import logo from '../../assets/logo.jpg'
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

interface RecapComponentProps { }

const RecapComponent: FC<RecapComponentProps> = () => {
  let navigate = useNavigate();
  const isCookie = Cookies.get('panier')
  const { state } = useLocation();
  if (isCookie == undefined || isCookie == "[]" || isCookie == "" || !state) {
    useEffect(() => {
      navigate("/")
    }, []);
  }
  const panierFromCookies = JSON.parse(Cookies.get("panier") || "[]");
  useEffect(() => {
    // Remove the "panier" cookie when the component mounts
    Cookies.remove('panier');
  }, []);
  let total = 0; // Initialize the overall total

  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  return (
    <React.Fragment><Header />
      if{state != null && (
        <div className="RecapComponent">
          <div className="container-fluid" >
            <div className="container text-center">
              <h1>Thank you.</h1>
              <p className="lead w-lg-50 mx-auto">Your order has been placed successfully.</p>
              <p className="w-lg-50 mx-auto"> We will immediatelly process your and it will be delivered soon.</p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="grid invoice">
                  <div className="grid-body">
                    <div className="invoice-title">
                      <br />
                      <div className='toPrint'>
                        <div className="row">
                          <div className="col-10">
                            <h2>INVOICE</h2><br />
                          </div>
                          <div className="col-2 text-right" >
                            <img src={logo} alt="" height={10} width={50} />
                          </div>
                        </div>

                        <hr />
                        <div className="row">

                          <div className="col-6 ">
                            <address>
                              <strong>Shipped To:</strong><br />
                              {state.form.firstName} {state.form.lastName}<br />
                              {state.form.address}<br />
                              {state.form.city}, {state.form.postalCode}<br />
                              {state.form.email} <br />
                            </address>
                          </div>

                          <div className="col-6 text-right" >
                            <address>
                              <strong>Payment Method:</strong><br />
                              Cash on delivery<br />
                            </address>
                            <address>
                              <strong>Order Date:</strong><br />
                              {formattedDate}
                            </address>
                          </div>
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h3>ORDER SUMMARY</h3>
                          <table className="table table-striped">
                            <thead>
                              <tr className="line">
                                <td><strong>#</strong></td>
                                <td ><strong>PRODUCT</strong></td>
                                <td className="text-center"><strong>QUANTITY</strong></td>
                                <td className="text-center"><strong>UNITE PRICE</strong></td>
                                <td className="text-right"><strong>SUBTOTAL</strong></td>
                              </tr>
                            </thead>
                            <tbody>
                              {panierFromCookies && panierFromCookies.map((item: any, index: any) => {
                                const itemTotal = item.prix * item.quantite; // Calculate the total for each row
                                total += itemTotal; // Update the overall total

                                return (
                                  <tr key={index}>
                                    <td key={index} >{index}</td>
                                    <td key={index} >{item.nom}</td>
                                    <td className="text-center" key={index}>€ {item.prix}</td>
                                    <td className="text-center" key={index}> {item.quantite}</td>
                                    <td className="text-right" key={index} >€ {(item.prix * item.quantite).toFixed(2)}</td>

                                  </tr>
                                );
                              })}

                              <tr>
                                <td colSpan={3}>
                                </td><td className="text-right"><strong>Total</strong></td>
                                <td className="text-right"><strong>€ {total.toFixed(2)}</strong></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 text-right identity">
                          <p>LOKI PHARMACEUTICS <br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
};

export default RecapComponent;
