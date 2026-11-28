import React from 'react';

interface ZbButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const ZbButton: React.FC<ZbButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = true,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const btnClass = variant === 'primary' ? 'mx-btn-primary' : 'mx-btn-outline';

  return (
    <button
      className={`${btnClass} ${className}`}
      disabled={disabled || isLoading}
      style={{
        width: fullWidth ? '100%' : 'auto',
        opacity: (disabled || isLoading) ? 0.6 : 1,
        ...style,
      }}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg style={{ animation: 'spin 1s linear infinite', width: '1rem', height: '1rem' }} viewBox="0 0 24 24" fill="none">
            <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Processing…</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
