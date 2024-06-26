import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css';

const Button = ({ type, text, onClick }) => {
    return (
      <button type={type} className="btn btn-custom mb-1" onClick={onClick}>
        {text}
      </button>
    );
  }

export default Button;
