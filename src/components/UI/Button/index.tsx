import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`rounded-md bg-primary px-4 py-2 text-white hover:bg-secondary active:bg-background2
      ${className}`}
      id={'button'}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
