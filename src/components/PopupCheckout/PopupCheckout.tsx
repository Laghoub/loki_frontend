import React, { FC } from 'react';
import styles from './PopupCheckout.module.css'; // Import the CSS module

interface PopupCheckoutProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const PopupCheckout: FC<PopupCheckoutProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles['confirmation-popup']}>
      <p>Do you want to confirm your purchase?</p>
      <div className={styles['confirmation-buttons']}>
        <button disabled onClick={onConfirm}>Confirm</button>
        <button disabled onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PopupCheckout;
