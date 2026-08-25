import React from 'react';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={`animate-spin rounded-full h-5 w-5 border-b-2 border-[#00A99D] ${className}`}></div>
  );
};