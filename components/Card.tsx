import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className, actions }) => {
  return (
    <div className={`border border-[#EAE3C9] p-4 rounded-lg shadow-inner shadow-gray-500/5 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 h-1.5 w-full bg-[#00A99D]"></div>
      <div className="flex justify-between items-center mb-4 pt-2">
        <h3 className="text-2xl text-[#333333] tracking-wider">{title}</h3>
        {actions}
      </div>
      {children}
    </div>
  );
};

export default Card;