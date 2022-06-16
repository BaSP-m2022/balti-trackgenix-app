import React from 'react';
import styles from './index.module.css';

const Modal = ({ children, isOpen, handleClose, isConfirmation, confirmed }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
        <div className={styles.childrenContainer}>{children}</div>
          {isConfirmation ? 
          <div className={styles.buttonwrapper}>
          <button className={styles.modalButton} onClick={confirmed}>
            Accept
          </button>
          <button className={styles.modalButton} onClick={handleClose}>
            Cancel
          </button> 
          </div> : 
          <div className={styles.buttonwrapper}>
          <button className={styles.modalButton} onClick={handleClose}>
            OK
          </button>
          </div>}
      </div>
    </div>
  );
};

export default Modal;
