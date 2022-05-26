import React from 'react';
import './index.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode | string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children }) => {
  return <button className='button' onClick={onClick} disabled={disabled}>{children}</button>
}

export default Button;