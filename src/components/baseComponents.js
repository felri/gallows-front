import React from 'react';

export const Error = ({ children }) => (
  <div className='error-form'>{children}</div>
);

export const Input = ({ value, type, handleChange }) => (
  <input
    className='input-form'
    value={value}
    onChange={(e) => handleChange(e.target.value, type)}
    placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
    type={type}
  />
);

export const Btn = ({ children, handleClick }) => (
  <div onClick={handleClick} className='btn'>
    {children}
  </div>
);

export const BtnWhite = ({ children, handleClick }) => (
  <div onClick={handleClick} className='btn-white'>
    {children}
  </div>
);
