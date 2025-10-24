import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
  inline?: boolean;
  color?: 'primary' | 'secondary' | 'white';
}

export default function Loader({
  size = 'medium',
  text,
  className = '',
  inline = false,
  color = 'primary',
}: LoaderProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
  };

  const SpinnerSVG = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
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

  if (inline) {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <SpinnerSVG />
        {text && <span className="text-sm">{text}</span>}
      </span>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <SpinnerSVG />
      {text && (
        <p className={`text-center ${colorClasses[color]} text-sm font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Alternative MUI Loader for consistency with existing usage
export function MUILoader() {
  return (
    <div className="flex justify-center">
      <CircularProgress />
    </div>
  );
}
