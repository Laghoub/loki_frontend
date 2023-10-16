import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../components/PaiementPage/PaiementPage.module.css';
const CheckoutForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };
  const [cardType, setCardType] = useState(''); // State to store card type
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [cardName, setCardName] = useState('');

  const handleCardNameChange = (e: any) => {
    let inputValue = e.target.value;
    // Remove numbers using regular expression
    inputValue = inputValue.replace(/[\d$%]/g, '');
    // Limit input to 100 characters
    if (inputValue.length > 100) {
      inputValue = inputValue.substring(0, 100);
    }
    setCardName(inputValue);
  };
  const handleCardNumberChange = (e: any) => {
    const inputCardNumber = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedCardNumber = inputCardNumber.replace(/(\d{4})(?=\d)/g, '$1 '); // Add spaces every 4 digits
    // Truncate any additional characters after the valid 16 digits
    const truncatedCardNumber = formattedCardNumber.substring(0, 19);

    setCardNumber(truncatedCardNumber);
    setIsCardNumberValid(truncatedCardNumber.length === 19); // Check for 16 digits with spaces
  };

  const handleCvvChange = (e: any) => {
    const cvvValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    if (cvvValue.length <= 3) {
      setCvv(cvvValue);
      setCvvError(cvvValue.length !== 3); // Set CVV error if not exactly 3 digits
    }
  };

  const handleMonthChange = (e: any) => {
    const numericValue = e.target.value.replace(/\D/g, '');

    if (numericValue > 12 || numericValue < 1 || numericValue.length <= 2) {
      setMonth(numericValue)
      setMonthError(numericValue > 12 || numericValue < 1 || numericValue.length !== 2);
    }
  };

  const handleYearChange = (e: any) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    // Remove non-numeric characters and limit to 2 characters
    if (numericValue > 40 || numericValue < 22 || numericValue.length <= 2) {
      setYear(numericValue)
      setYearError(numericValue > 40 || numericValue < 22 || numericValue.length !== 2);
    }
  };

  return (<div className="row">
    {/* Purchase Details Form */}
    <div className="col-md-8 mb-4">
      <div className="card mb-4">
        <div className="card-header py-3">
          <h5 className="mb-0">Payment details</h5>
        </div>
        <div className="card-body">
            {/* Payment Method Radio Buttons */}
            <div className="form-check mb-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cash-on-delivery"
                className="form-check-input"
                checked={paymentMethod === 'cash-on-delivery'}
                onChange={handlePaymentChange}
              />
              <label className="form-check-label">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                type="radio"
                name="paymentMethod"
                value="card-payment"
                className="form-check-input"
                checked={paymentMethod === 'card-payment'}
                onChange={handlePaymentChange}
              />
              <label className="form-check-label">
                Card Payment
              </label>
            </div>

            {/* Card Details (Visible when Card Payment is selected) */}
            {paymentMethod === 'card-payment' && (
              <div className="form-outline mb-4 ">
                <input
                  type="text"
                  id="cardNumber"
                  className={`margin-bot1 form-control ${isCardNumberValid ? '' : 'is-invalid'}`}
                  placeholder="Card Number"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                {!isCardNumberValid && (
                  <div className="invalid-feedback">Invalid card number</div>
                )}

                <input
                  type="text"
                  id="cardName"
                  className="form-control margin-bot1"
                  placeholder="Card Holder's name"
                  value={cardName}
                  name="cardName"
                  onChange={handleCardNameChange}
                />

                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      id="cardCvv"
                      className={`margin-bot1 form-control ${cvvError ? 'is-invalid' : ''}`}
                      placeholder="CVV"
                      name="cardCvv"
                      value={cvv}
                      onChange={handleCvvChange}
                    />
                    {cvvError && (
                      <div className="invalid-feedback">CVV should be 3 numbers</div>
                    )}

                  </div>
                  <div className="col-md-4 ">
                    <span className="expiration " style={{ display: 'flex' }}>
                      <input
                        type="text"
                        id="monthExp"
                        placeholder="MM"
                        name="monthExp"
                        style={{ width: '6em' }}
                        className={`margin-bot1 form-control  ${monthError ? 'is-invalid' : ''}`}
                        value={month}
                        onChange={handleMonthChange}
                      />
                      <span style={{ marginLeft: '0.5em', marginRight: '0.5em', marginTop: '0.5em' }}>/</span>
                      <input
                        type="text"
                        id="yearExp"
                        placeholder="YY"
                        style={{ width: '6em' }}
                        name="yearExp"
                        className={`margin-bot1  form-control ${yearError ? 'is-invalid' : ''}`}
                        value={year}
                        onChange={handleYearChange}
                      />
                      {(yearError || monthError) && (
                        <div className="invalid-feedback">Invalid Date</div>
                      )}
                    </span>


                  </div>
                </div>

                {cardType === 'visa' && (
                  <img src="/src/assets/visa-logo-png.webp" alt="Visa Logo" />
                )}
                {cardType === 'mastercard' && (
                  <img src="/src/assets/mastercard.png" alt="MasterCard Logo" />
                )}
              </div>


            )}

            {/* Additional Purchase Details */}
            <div className="form-outline mb-4">
              <textarea
                className="form-control"
                id="additionalPurchaseDetails"
                rows={4}
                placeholder="Additional Purchase Details"
              ></textarea>

            </div>
        </div>
      </div>
    </div>
  </div>)

}
export default CheckoutForm;