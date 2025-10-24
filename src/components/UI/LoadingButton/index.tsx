import React, { ButtonHTMLAttributes } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ className?: string }>;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-primary hover:bg-primary-dark text-white focus:ring-primary disabled:bg-primary/50',
    secondary:
      'bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary disabled:bg-secondary/50',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary disabled:border-primary/50 disabled:text-primary/50',
    ghost:
      'text-primary hover:bg-primary/10 focus:ring-primary disabled:text-primary/50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const LoadingSpinner = () => (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={` ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} `.trim()}
      aria-describedby={loading ? 'loading-state' : undefined}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>{loadingText}</span>
          <span id="loading-state" className="sr-only">
            Operation in progress, please wait
          </span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
};

export default LoadingButton;
