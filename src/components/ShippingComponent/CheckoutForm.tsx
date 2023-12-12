import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../components/PaiementPage/PaiementPage.module.css";
const CheckoutForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("BANK");
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };
  const [cardType, setCardType] = useState(""); // State to store card type
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [cardName, setCardName] = useState("");

  const handleCardNameChange = (e: any) => {
    let inputValue = e.target.value;
    // Remove numbers using regular expression
    inputValue = inputValue.replace(/[\d$%]/g, "");
    // Limit input to 100 characters
    if (inputValue.length > 100) {
      inputValue = inputValue.substring(0, 100);
    }
    setCardName(inputValue);
  };
  const handleCardNumberChange = (e: any) => {
    const inputCardNumber = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    const formattedCardNumber = inputCardNumber.replace(
      /(\d{4})(?=\d)/g,
      "$1 "
    ); // Add spaces every 4 digits
    // Truncate any additional characters after the valid 16 digits
    const truncatedCardNumber = formattedCardNumber.substring(0, 19);

    setCardNumber(truncatedCardNumber);
    setIsCardNumberValid(truncatedCardNumber.length === 19); // Check for 16 digits with spaces
  };

  const handleCvvChange = (e: any) => {
    const cvvValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (cvvValue.length <= 3) {
      setCvv(cvvValue);
      setCvvError(cvvValue.length !== 3); // Set CVV error if not exactly 3 digits
    }
  };

  const handleMonthChange = (e: any) => {
    const numericValue = e.target.value.replace(/\D/g, "");

    if (numericValue > 12 || numericValue < 1 || numericValue.length <= 2) {
      setMonth(numericValue);
      setMonthError(
        numericValue > 12 || numericValue < 1 || numericValue.length !== 2
      );
    }
  };

  const handleYearChange = (e: any) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    // Remove non-numeric characters and limit to 2 characters
    if (numericValue > 40 || numericValue < 22 || numericValue.length <= 2) {
      setYear(numericValue);
      setYearError(
        numericValue > 40 || numericValue < 22 || numericValue.length !== 2
      );
    }
  };

  return (
    <div className="row">
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
                checked={true}
                onChange={handlePaymentChange}
              />
              <label className="form-check-label">Pay using bank account</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
