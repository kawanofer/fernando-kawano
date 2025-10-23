import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ComponentType;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  children,
  icon: Icon,
  className,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`bg-primary hover:bg-secondary active:bg-background-2 rounded-md px-4 py-2 text-white ${className}`}
      id={'button'}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {Icon && (
        <span>
          <Icon />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
