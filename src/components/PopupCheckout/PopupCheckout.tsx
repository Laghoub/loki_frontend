import { FC, useEffect } from 'react';
import styles from './PopupCheckout.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PopupCheckoutProps {
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  dataForm:any
}

const PopupCheckout: FC<PopupCheckoutProps> = ({ onConfirm, onCancel, dataForm, onClose }) => {

  let navigate = useNavigate();
  const isCookie = Cookies.get('panier')

  if(isCookie == undefined|| isCookie == "[]"|| isCookie == "" ){
    useEffect(() => {
      navigate("/")
    }, []);
  }
  return (
    <div className={styles['confirmation-popup']}>
        <button className={styles['close-button']} onClick={onClose}>
    X
  </button>
      <p>Do you want to confirm your purchase?</p>
      <div className={styles['confirmation-buttons']}>
        <button  onClick={onConfirm}>Confirm</button>
        <button  onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PopupCheckout;
