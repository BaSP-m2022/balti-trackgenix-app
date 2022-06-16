import React from 'react';
import styles from './index.module.css';

const Select = ({ text, id, value, required, onChange, item, type }) => {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.labelSelect}>{text}</label>
      <select
        className={styles.selectBox}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        type={type}
      >
        <option selected disabled value="">{`select ${item.title}`}</option>
          {item.options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
