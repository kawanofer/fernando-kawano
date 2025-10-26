'use client';

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ComponentType;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
};

const Button = ({
  children,
  icon: Icon,
  className,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  type = 'button',
  id,
}: ButtonProps) => {
  return (
    <button
      className={`bg-primary hover:bg-secondary active:bg-background-2 rounded-md px-4 py-2 text-white ${className}`}
      id={id}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled}
    >
      {Icon && (
        <span aria-hidden="true" className="inline-flex items-center">
          <Icon />
        </span>
      )}
      <span className={Icon ? 'ml-2' : ''}>{children}</span>
    </button>
  );
};

export default Button;
