import React, { useState } from 'react';

interface BillingDetailsFormProps {
  formData: any; // Adjust the type based on your form data structure
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const BillingDetailsForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailChange = (e:any) => {
    let inputValue = e.target.value;

    // Regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(inputValue) || inputValue === ''|| inputValue === undefined) {
      setEmail(inputValue);
    }
  };

  const handlePhoneChange = (e:any) => {
    let inputValue = e.target.value;

    // Regular expression to validate phone number format
    const phonePattern = /^\d{0,10}$/; // Allowing 0 to 10 digits

    if (phonePattern.test(inputValue) || inputValue === '') {
      setPhone(inputValue);
    }
  };
  return (
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
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      maxLength={50}
                      required
                    />
                    <label className="form-label" htmlFor="firstName">
                      First name
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      maxLength={50}
                      required
                    />
                    <label className="form-label" htmlFor="lastName">
                      Last name
                    </label>
                  </div>
                </div>
              </div>

              {/* Text input */}
              <div className="form-outline mb-6">
                <input
                  type="text"
                  id="Company"
                  className="form-control"
                  maxLength={150}
                />
                <label className="form-label" htmlFor="Company">

                  Company name
                </label>
              </div>

              {/* Text input */}
              <div className="form-outline mb-6">
                <input
                  type="text"
                  id="adress"
                  className="form-control"
                  required
                />
                <label className="form-label" htmlFor="adress">
                  Address
                </label>
              </div>
              <div className="form-outline mb-6 row">
                <div className="col-md-2">
                <input
                  type="number"
                  id="postalcode"
                  className="form-control"
                  required
                />
                <label className="form-label" htmlFor="postalcode">
                  Postal Code
                </label>
                </div>
                <div className="col-md-6">
                <input
                  type="text"
                  id="city"
                  className="form-control mb-3"
                  required
                />
                <label className="form-label" htmlFor="city">
                  City
                </label>
                </div>

              </div>

              {/* Email input */}
              <div className="form-outline mb-6">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                />
                <label className="form-label" htmlFor="email">
                  Email
                </label>
              </div>

              {/* Number input */}
              <div className="form-outline mb-6">
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                <label className="form-label" htmlFor="phone">
                  Phone
                </label>
              </div>

              {/* Message input */}
              <div className="form-outline mb-6">
                <textarea
                  className="form-control"
                  id="additionalAdress"
                  rows={4}
                ></textarea>
                <label className="form-label" htmlFor="additionalAdress">
                  Additional information
                </label>
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
                <span>€ 53.98</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Gratis</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p className="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span>
                  <strong>€ 53.98</strong>
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
  );
};

export default BillingDetailsForm;
