import { FC, FormEvent, useEffect, useState } from "react";
import "./PaiementPage.module.css";
import Header from "../Header";
import Menu from "../Menu";
import CheckoutForm from "../ShippingComponent/CheckoutForm";
import PopupCheckout from "../PopupCheckout/PopupCheckout";
import { useLocation, useNavigate } from "react-router-dom";
import configData from "../../config.json";
import Cookies from "js-cookie";
import axios from "axios";
import CryptoJS from "crypto-js";

class AESEncryption {
  keySize: number;
  ivSize: number;

  constructor() {
    this.keySize = 256;
    this.ivSize = 128;
  }

  generateKey() {
    return CryptoJS.lib.WordArray.random(this.keySize / 8);
  }

  generateIV() {
    return CryptoJS.lib.WordArray.random(this.ivSize / 8);
  }

  encrypt(message: any, key: any, iv: any) {
    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return encrypted.toString();
  }
}

const PaiementPage: FC = () => {
  const location = useLocation();
  const SERVER_URL = configData.SERVER_URL;
  let navigate = useNavigate();
  const isCookie = Cookies.get("panier");

  if (isCookie == undefined || isCookie == "[]" || isCookie == "") {
    useEffect(() => {
      navigate("/");
    }, []);
  }
  const [showCardNumberInput, setShowCardNumberInput] = useState(false);
  const [paimentSuccess, setPaimentSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [form, setform] = useState();
  const handleEmailChange = (e: any) => {
    let inputValue = e.target.value;

    // Regular expression to validate email format
    const emailPattern =
      /^[a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (
      emailPattern.test(inputValue) ||
      inputValue === "" ||
      inputValue === undefined
    ) {
      setEmail(inputValue);
    }
  };

  const handleCardNumberChange = (e: any) => {
    const inputValue = e.target.value;
    dataTest.cardNumber = inputValue;
  };

  const handleCardPaymentOptionClick = () => {
    setShowCardNumberInput(true);
  };

  const handlePhoneChange = (e: any) => {
    let inputValue = e.target.value;
    // Regular expression to validate phone number format
    const phonePattern = /^\d{0,10}$/; // Allowing 0 to 10 digits
    if (
      phonePattern.test(inputValue) ||
      inputValue === "" ||
      inputValue.length < 10
    ) {
      setPhone(inputValue);
    }
  };

  // Get the total price and add shupping fee

  let [initFee, setInitFee] = useState<number | null>(null);
  let [totalCharge, setTotalCharge] = useState<number>(0);

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


  /*useEffect(() => {
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
}, [SERVER_URL]); */

  var data: any;
  var dataTest: any;
  dataTest = {
    firstName: "Marouane",
    lastName: "Lok",
    company: "Uspn",
    address: "99 av.St georges",
    postalCode: "93220",
    city: "Paris",
    email: "abc@gmail.com",
    phone: "0661201010",
    cardNumber: "",
    cardName: "",
    cardCvv: "",
    monthExp: "",
    yearExp: "",
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      company: formData.get("company"),
      address: formData.get("address"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      cardNumber: formData.get("cardNumber"),
      cardName: formData.get("cardName"),
      cardCvv: formData.get("cardCvv"),
      monthExp: formData.get("monthExp"),
      yearExp: formData.get("yearExp"),
    };
    setform(data);

    // ... (autres traitements)

    // ... (autres traitements)

    // Vérifier si le champ cardNumber n'est pas vide avant de procéder au paiement en ligne
    /* if (data.cardNumber && data.cardNumber.trim() !== "") {
       // Créer une instance de la classe AESEncryption
       const aes = new AESEncryption();
 
       // Générer une clé et un vecteur d'initialisation (IV)
       const key = aes.generateKey();
       const iv = aes.generateIV();
 
       // Construire l'objet Operation avec les données cryptées
       const Operation = {
         receiverAccount: "3LOE1KQF",
         amount: aes.encrypt(totalCharge.toString(), key, iv).toString(),
         label: aes.encrypt("paiment", key, iv).toString(),
         senderAccount: "4X1JFHA9",
         isAdmin: aes.encrypt("notadmin", key, iv).toString(),
         iv: CryptoJS.enc.Base64.stringify(iv),
         key: CryptoJS.enc.Base64.stringify(key),
       };
 
       try {
         // Envoyer la requête POST vers le serveur
         const response = await axios.post(
           configData.Transac_request,
           Operation
         );
 
         if (response.data && response.data.message === "true") {
           setPaimentSuccess(true);
           setConfirmationPopupVisible(true);
         } else {
           console.error("Error in money transfer:", response.data.error);
           setErrorMessage("Money transfer failed. Please try again.");
         }
       } catch (error) {
         console.error("Error in money transfer:", error);
         setErrorMessage("Error in money transfer. Please try again.");
       }
     } else {
       // Afficher un message d'erreur si le champ cardNumber est vide
       setErrorMessage("Card number is required for online payment.");
       setPaimentSuccess(true);
     }
 */
     // Afficher la popup de confirmation
     setConfirmationPopupVisible(true);
   
  }
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isConfirmationPopupVisible, setConfirmationPopupVisible] =
      useState(false);
    const handleConfirmation = async (confirmed: boolean) => {
      if (confirmed) {
        const aes = new AESEncryption();

        // Générer une clé et un vecteur d'initialisation (IV)
        const key = aes.generateKey();
        const iv = aes.generateIV();

        // Construire l'objet Operation avec les données cryptées
        const Operation = {
          receiverAccount: "3LOE1KQF",
          amount: aes.encrypt(totalCharge.toString(), key, iv).toString(),
          label: aes.encrypt("paiment", key, iv).toString(),
          senderAccount: "4X1JFHA9",
          isAdmin: aes.encrypt("notadmin", key, iv).toString(),
          iv: CryptoJS.enc.Base64.stringify(iv),
          key: CryptoJS.enc.Base64.stringify(key),
        };

        try {
          // Envoyer la requête POST vers le serveur
          const response = await axios.post(
            configData.Transac_request,
            Operation
          );

          if (response.data && response.data.message === "true") {
            setPaimentSuccess(true);
                    // Get product information from the cookie
        const panier = Cookies.get("panier");
        const products = panier ? JSON.parse(panier) : [];

        try {
          // Iterate over each product and create a lineofcommand
          for (const product of products) {
            const orderData = {
              quantity: product.quantite,
              total: (product.prix * product.quantite).toFixed(2),
              created: new Date().toISOString(),
              productId: product.id,
              clientId: 2,
            };

            // Send POST request for each product
            const response = await axios.post(
              `${SERVER_URL}/line-of-commands`,
              orderData
            );

            // Log the response or handle it as needed
            console.log(response.data);
          }

          setSuccessMessage("Order placed successfully!");
          navigate("/succesOrder", {
            state: {
              form: form,
            },
          });
        } catch (error) {
          setErrorMessage("Error placing order. Please try again.");
          console.error("Error placing order:", error);
          navigate("/failedOrder");
        }
          } else {
            console.error("Error in money transfer:", response.data.error);
            setErrorMessage("Money transfer failed. Please try again.");
            navigate("/failedOrder");
          }
        } catch (error) {
          console.error("Error in money transfer:", error);
          setErrorMessage("Error in money transfer. Please try again.");
          navigate("/failedOrder");
        }

      } else {
        navigate("/failedOrder");
      }
    };

    return (
      <div>
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
                            First name*
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
                            Last name*
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
                        Address*
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
                          Postal Code*
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
                          City*
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
                        Email*
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
                    {/* Number input 
                  <div className="form-outline mb-6">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>*/}
                    <br />
                    {/* Message input 
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
                  </div>*/}

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
                        <span> {initFee} €</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span> {shipping_fee} € </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong> {totalCharge} €</strong>
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
          <PopupCheckout
            onConfirm={() => handleConfirmation(true)}
            onCancel={() => handleConfirmation(false)}
            onClose={() => setConfirmationPopupVisible(false)}
            dataForm={data}
          />
        )}
      </div>
    );
}

export default PaiementPage;
