import React from 'react';
import { Loader } from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ isLoading = false, children, ...props }) => {
  return (
    <button
      {...props}
      className={`relative inline-flex items-center justify-center px-6 py-2 bg-[#F45D48] text-white font-bold rounded-full hover:bg-[#e14a35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F45D48] focus:ring-offset-[#FDFCEC] disabled:opacity-60 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 uppercase text-xs tracking-wider shadow-md hover:shadow-lg disabled:shadow-none ${props.className || ''}`}
      disabled={isLoading || props.disabled}
    >
      {isLoading && <Loader className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 !border-white" />}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>{children}</span>
    </button>
  );
};

export default Button;