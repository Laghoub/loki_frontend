import React, { FC, useEffect, useState } from 'react';
import { ProductDetailsWrapper } from './ProductDetails.styled';
import "./ProductDetails.css"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { colors } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MoreDetailsComponent from '../MoreDetailsComponent/MoreDetailsComponent';
import axios from 'axios';
import { useParams } from 'react-router-dom';
interface ProductDetailsProps {}

const ProductDetails = () =>{
   const { id } = useParams(); // Obtenez l'ID de l'URL
   const [productData, setProductData] = useState<any>({});
 
   useEffect(() => {
     // Effectuez une requête HTTP pour obtenir les détails du produit en utilisant l'ID de l'URL
     axios.get(`http://localhost:8081/api/products/product/${id}`)
       .then(response => {
         // Mettez à jour l'état du composant avec les données du produit
         setProductData(response.data);
         console.log(response.data)
       })
       .catch(error => {
         // Gérez les erreurs de requête ici
         console.error('Erreur lors de la récupération des données du produit :', error);
       });
   }, [id]);
  const stockClass = productData.quantityInStock > 0 ? 'instock' : 'outofstock';
  const stockText = productData.quantityInStock > 0 ? 'In Stock' : 'Out of Stock';
   return (
      <div className="product container"> 
         <ul className="breadcrumb">
      <li>
         <a href = "/" >
         <HomeIcon />
         </a>

         </li>
         <li>
            <KeyboardDoubleArrowRightIcon />
         </li>

         <li style={{marginTop : '0.45%' ,marginLeft: '1%'}}>
         <span style={{ color: 'white', fontWeight : 999 }}>{productData.name}</span>
         </li>
         </ul>
         <div id="content" className="col-sm-12">
			 
          <div className="row">
              
              
              
             <div className="col-sm-6 col-lg-7 product_page-left">
                <div className="product-gallery">
                    
                   <div className="row">
                      <div className="col-lg-9 pull-right hidden-xs hidden-sm hidden-md text-center" >
                         <img width="800" height="800" id="productZoom" src="https://livedemo00-opencart.template-help.com/opencart_prod-23526/image/cache/catalog/products/product-22-518x500.png" data-zoom-image="https://livedemo00-opencart.template-help.com/opencart_prod-23526/image/cache/catalog/products/product-22-800x800.png"/>
                      </div>

                      
                   </div>
                    
                </div>
             </div>
              
              
              
             <div className="col-sm-6 col-lg-5 product_page-right">
                <div className="general_info product-info">
                  <span style={{color:"#0000004f;",textAlign:'center',padding:'10px',    marginBottom: '30px',display: 'block',fontSize: 'x-large'}}>Product details</span>
                  <h2 className="product-title">{productData.name}</h2>
                   <ul className="list-unstyled product-section">
                       
                      <li><strong>Brand:</strong>
                         <a href="https://livedemo00-opencart.template-help.com/opencart_prod-23526/index.php?route=product/manufacturer/info&amp;manufacturer_id=8">{productData.brand}</a>
                      </li>
                       
                      <li>
                         <strong>Product Code:</strong>
                         <span>{productData.productCode}</span>
                      </li>
                      <li>
                         <strong>Category:</strong>
                         <span>Pills</span>
                      </li>


                       
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
                               <label className="control-label" htmlFor="input-quantity">Quantity</label>
                               <input
                                    type="number"
                                    name="quantity"
                                    id="input-quantity"
                                    className="form-control"
                                    min={0}
                                    onKeyPress={(e) => {
                                       if (e.key === '-' ) {
                                          e.preventDefault();
                                       }
                                    }} />
                            </div>
                         
                      </div>
                   </div>			
                   		
                   <div className="buy-section">
                     <div className="price-section">							
                        <span className="price-old"></span>
                        <span className="price-new">${productData.weightedAveragePrice}</span>
                     </div>                     
                     <button type="button" id="button-cart" data-loading-text="Loading..." className={`btn-primary ${productData.quantityInStock <= 0 ? 'disabled' : ''}`}
        disabled={productData.quantityInStock <= 0}><i className="material-icons-add_shopping_cart"></i><span>Add to Cart</span><AddShoppingCartIcon /></button>    
                  </div>            
                </div>
             </div>
          </div>

      </div>
      <MoreDetailsComponent productDesc={productData.description} />
      </div>
   


   )
}
export default ProductDetails;
