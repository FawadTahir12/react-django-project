import React from 'react';
import './style.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && (
        <label>
          {label}
        </label>
      )}

      <input className="formInput" onChange={handleChange} {...otherProps} />
    </div>
  );
}

export default FormInput;