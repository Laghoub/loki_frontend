import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './PaiementPage.module.css';
import Header from '../Header';
import Menu from '../Menu';
import BillingDetailsForm from '../ShippingComponent/BillingDetailsForm';
import CheckoutForm from '../ShippingComponent/CheckoutForm';
import PopupCheckout from '../PopupCheckout/PopupCheckout';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import configData from "../../config.json" ;





const PaiementPage: FC = () => {
  const location = useLocation();

  const SERVER_URL = configData.SERVER_URL;


  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const handleEmailChange = (e: any) => {
    let inputValue = e.target.value;

    // Regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(inputValue) || inputValue === '' || inputValue === undefined) {
      setEmail(inputValue);
    }
  };

  const handlePhoneChange = (e: any) => {
    let inputValue = e.target.value;
    // Regular expression to validate phone number format
    const phonePattern = /^\d{0,10}$/; // Allowing 0 to 10 digits
    if (phonePattern.test(inputValue) || inputValue === ''|| inputValue.length <10) {
      setPhone(inputValue);
    }
  };

  let navigate = useNavigate();

  const [isConfirmationPopupVisible, setConfirmationPopupVisible] = useState(false);
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log('Purchase confirmed');
      navigate('/')

    }
    else {
      navigate('/')

    }
  };

   // Get the total price and add shupping fee

   const [initFee, setInitFee] = useState<number | null>(null);
   const [totalCharge, setTotalCharge] = useState<number>(0);
   
   const shipping_fee = configData.SHIPPING;
   
   useEffect(() => {
     if (location.state && location.state.montantTotal) {
       setInitFee(Number(location.state.montantTotal));
     }
   }, [location.state]);
   
   useEffect(() => {
     if (initFee !== null) {
       setTotalCharge(initFee + shipping_fee);
     }
   }, [initFee, shipping_fee]);

 {/*useEffect(() => {
    const id = orderId; // Replace with the actual id parameter or source
    const apiUrl = `${SERVER_URL}/commands/${id}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Assuming your API returns the total charge in the 'total' property
        setInitFee(data.total.toFixed(2))
        setTotalCharge((data.total+shipping_fee).toFixed(2));
      })
      .catch((error) => {
        console.error('Error fetching total charge:', error);
      });
  }, [SERVER_URL]); */} 
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      company: formData.get('company'),
      address: formData.get('address'),
      postalCode: formData.get('postalCode'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      additionalInfo: formData.get('additionalInfo'),
      cardNumber: formData.get('cardNumber'),
      cardName: formData.get('cardName'),
      cardCvv: formData.get('cardCvv'),
      monthExp: formData.get('monthExp'),
      yearExp: formData.get('yearExp'),
      additionalPurchaseDetails: formData.get('additionalPurchaseDetails'),
    };
    setConfirmationPopupVisible(true)
    console.log(data)
  }
  return (
    <div >
      <Header />
      <Menu />
      <div className="Bill-form" style={{ margin: "2em" }}>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-8 mb-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Shipping informations</h5>
                </div>
                <div className="card-body">
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className="row mb-6">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          First name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          maxLength={50}
                          required
                        />

                      </div>
                    </div>

                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="lastName">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          name="lastName"

                          maxLength={50}
                          required
                        />

                      </div>
                    </div>
                  </div>
                  <br />
                  {/* Text input */}
                  <div className="form-outline mb-6">
                    <label className="form-label" htmlFor="company">

                      Company name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"

                      className="form-control"
                      maxLength={150}
                    />

                  </div>
    <br />
                  {/* Text input */}
                  <div className="form-outline mb-6">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"

                      className="form-control"
                      required
                    />

                  </div>
                  <br />
                  <div className="form-outline mb-6 row">


                    <div className="col-md-2">
                      <label className="form-label" htmlFor="postalCode">
                        Postal Code
                      </label>
                      <input
                        type="number"
                        id="postalCode"
                        name="postalCode"

                        className="form-control mb-3"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="city">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control mb-3"
                        required
                      />

                    </div>

                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-6">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      required
                    />

                  </div>
                  <br />
                  {/* Number input */}
                  <div className="form-outline mb-6">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />

                  </div>
                  <br />
                  {/* Message input */}
                  <div className="form-outline mb-6">
                    <label className="form-label" htmlFor="additionalInfo">
                      Additional information
                    </label>
                    <textarea
                      className="form-control"
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={4}
                    ></textarea>

                  </div>

                  {/* Checkbox 
              <div className="form-check d-flex justify-content-center mb-2">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form7Example8"
                  checked
                />
                <label className="form-check-label" htmlFor="form7Example8">
                  Create an account?
                </label>
              </div>*/}
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>$ {initFee}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>$ {shipping_fee}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>$ {totalCharge}</strong>
                      </span>
                    </li>
                  </ul>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"

                  >
                    Make purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
          <CheckoutForm />
        </form>
      </div>

      {isConfirmationPopupVisible && (
        <PopupCheckout onConfirm={() => handleConfirmation(true)} onCancel={() => handleConfirmation(false)} />
      )}
    </div>
  );
}

export default PaiementPage;
