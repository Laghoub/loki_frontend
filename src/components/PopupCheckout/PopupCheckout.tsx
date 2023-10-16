import React, { FC } from 'react';
import styles from './PopupCheckout.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';

interface PopupCheckoutProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const PopupCheckout: FC<PopupCheckoutProps> = ({ onConfirm, onCancel }) => {
  let navigate = useNavigate();

 const none= () => {

  alert("Unavailable at the moment")
  navigate('/')
 }
  return (
    <div className={styles['confirmation-popup']}>
      <p>Do you want to confirm your purchase?</p>
      <div className={styles['confirmation-buttons']}>
        <button  onClick={none}>Confirm</button>
        <button  onClick={none}>Cancel</button>
      </div>
    </div>
  );
};

export default PopupCheckout;
