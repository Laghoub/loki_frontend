import { FC, useEffect } from 'react';
import './failComponent.module.css';
import Header from '../Header';
import dislike from '../../assets/emojidislike.png'
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface FailComponentProps { }

const FailComponent: FC<FailComponentProps> = () => {
  let navigate = useNavigate();
  const isCookie = Cookies.get('panier')

  if(isCookie == undefined|| isCookie == "[]"|| isCookie == "" ){
    useEffect(() => {
      navigate("/")
    }, []);
  }
  return(
  <><Header />
  <div className="RecapComponent">
    <div className="container-fluid" style={{marginTop:"2em"}}>
      <div className="container text-center">
        <h3>Oh no!</h3>
        <img src={dislike} />
        <p className="lead w-lg-50 mx-auto">Your order has been canceled.</p>
        <Link to='/'> <button style={{margin : '2em'}} type="button" className="btn btn-secondary">Go Back to Home Page</button></Link>

      </div>
      
    </div>
  </div>
  <Footer />
  </>)};

export default FailComponent;
