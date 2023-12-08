import { useEffect, useState } from "react";
import "./ProductDetails.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreDetailsComponent from "../MoreDetailsComponent/MoreDetailsComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import configData from "../../config.json";
import Header from "../Header";
import Footer from "../Footer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import uboprofene from "../../assets/No_image_available.png";

interface ProductDetailsProps {}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenez l'ID de l'URL
  const [productData, setProductData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const SERVER_URL = configData.SERVER_URL;
  const [quantity, setQuantity] = useState(1); // Set an initial quantity

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/products/product/${id}`)
      .then((response) => {
        setProductData(response.data);
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [id]);

  const ajouterAuPanier = () => {
    const panierCookie = Cookies.get("panier");
    let panier = [];

    if (panierCookie) {
      try {
        panier = JSON.parse(panierCookie);
      } catch (error) {
        console.error("Erreur lors de la désérialisation du panier :", error);
        // En cas d'erreur, vous pouvez choisir de ne pas modifier le panier existant.
        // Ou bien, vous pouvez initialiser un nouveau panier vide.
      }
    }

    // Recherchez si le produit existe déjà dans le panier
    const existingProductIndex = panier.findIndex(
      (item: any) => item.nom === productData.name
    );
    console.log(quantity);
    if (existingProductIndex !== -1) {
      // Si le produit existe, augmentez la quantité
      panier[existingProductIndex].quantite =
        panier[existingProductIndex].quantite + quantity;
    } else {
      // Sinon, ajoutez un nouvel élément au panier
      console.log;
      panier.push({
        id : productData.id,
        nom: productData.name,
        prix: productData.weightedAveragePrice.toFixed(2),
        
        quantite: quantity,
      });
    }

    // Enregistrez le panier mis à jour dans les cookies en utilisant JSON.stringify
    if (localStorage.getItem("connected") === "true") {
      Cookies.set("panier", JSON.stringify(panier), { expires: 7 });
      alert("Your item has been added to the cart");
    } else {
      navigate("/login");
    }
  };

  // Conditional rendering: Show loading indicator while loading
  if (loading) {
    return <p>Loading...</p>;
  }
  {
    /* const stockClass = productData.quantityInStock > 0 ? "instock" : "outofstock";
   const stockText =
      productData.quantityInStock > 0 ? "In Stock" : "Out of Stock";*/
  }
  const productQuantity = productData.quantityInStock; // Replace this with your actual variable

  let stockText;
  let stockClass;

  if (productQuantity > 50) {
    stockText = `+ 50`;
    stockClass = "instock";
  } else if (productQuantity > 40 && productQuantity <= 50) {
    stockText = `less than 50`;
    stockClass = "low-stock";
  } else if (productQuantity > 30 && productQuantity <= 40) {
    stockText = `less than 40`;
    stockClass = "low-stock";
  } else if (productQuantity > 20 && productQuantity <= 30) {
    stockText = `less than 30`;
    stockClass = "low-stock";
  } else if (productQuantity > 10 && productQuantity <= 20) {
    stockText = `less than 20`;
    stockClass = "low-stock";
  } else if (productQuantity > 0 && productQuantity <= 10) {
    stockText = `${productQuantity} available`;
    stockClass = "outofstock";
  } else {
    stockText = `Out of Stock`;
    stockClass = "outofstock";
  }
  return (
    <div>
      <Header />
      <div className="product container">
        <ul className="breadcrumb">
          <li>
            <a href="/">
              <HomeIcon />
            </a>
          </li>

          {/*    <li>
                  <KeyboardDoubleArrowRightIcon />
               </li>
                <li style={{ marginLeft: '1%' }}>
                  <KeyboardDoubleArrowRightIcon />
               </li>

               <li style={{ marginTop: '0.45%', marginLeft: '1%' }}>
                  <span style={{ fontWeight: 999 }}>{productData.categor_id.name}</span>
               </li>*/}
          <li style={{ marginLeft: "1%" }}>
            <KeyboardDoubleArrowRightIcon />
          </li>

          <li style={{ marginTop: "0.45%", marginLeft: "1%" }}>
            <span style={{ fontWeight: 999 }}>{productData.name}</span>
          </li>
        </ul>
        <div id="content" className="col-sm-12">
          <div className="row">
            <div className="col-sm-6 col-lg-7 product_page-left">
              <div className="product-gallery">
                <div className="row">
                  <div className="col-lg-9 pull-right hidden-xs hidden-sm hidden-md text-center">
                    <img
                      width="800"
                      height="800"
                      id="productZoom"
                      src={uboprofene}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-5 product_page-right">
              <div className="general_info product-info">
                <span
                  style={{
                    color: "#0000004f",
                    textAlign: "center",
                    padding: "10px",
                    marginBottom: "30px",
                    display: "block",
                    fontSize: "x-large",
                  }}
                >
                  Cell details
                </span>
                <h2 className="product-title">{productData.name}</h2>
                <ul className="list-unstyled product-section">
                  <li>
                    <strong>Cell reference:</strong>
                    <span>{productData.reference}</span>
                  </li>
                  {/* 
                           <li>
                              <strong>Category:</strong>
                              <span>{productData.productCategory.name}</span>
                           </li>
                           */}

                  <li>
                    <strong>Availability:</strong>
                    <span className={`stock ${stockClass}`}>{stockText}</span>
                  </li>
                </ul>
              </div>
              <hr />
              <div id="product">
                <div className="form-group form-horizontal">
                  <div className="col-sm-12">
                    <div className="quantity">
                      <label className="control-label" htmlFor="input-quantity">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="input-quantity"
                        className="form-control"
                        min={0}
                        max={9}
                        value={quantity}
                        onChange={(e: any) => {
                          setQuantity(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "-") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="buy-section">
                  <div className="price-section">
                    <span className="price-old"></span>
                    <span className="price-new">
                      {productData.weightedAveragePrice} €
                    </span>
                  </div>
                  <button
                    onClick={ajouterAuPanier}
                    type="button"
                    id="button-cart"
                    data-loading-text="Loading..."
                    className={`btn-primary ${
                      productData.quantityInStock <= 0 ? "disabled" : ""
                    }`}
                    disabled={productData.quantityInStock <= 0}
                  >
                    <i className="material-icons-add_shopping_cart"></i>
                    <span>Add to Cart</span>
                    <AddShoppingCartIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MoreDetailsComponent productDesc={productData.description} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
