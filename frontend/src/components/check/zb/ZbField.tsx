import React from 'react';

interface ZbFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const ZbField = React.forwardRef<HTMLInputElement, ZbFieldProps>(
  ({ label, error, helperText, icon, rightElement, id, className = '', ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || `mx-field-${generatedId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label htmlFor={inputId} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {label}
          </label>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          {icon && (
            <div style={{
              position: 'absolute',
              left: '0.875rem',
              width: '1.5rem',
              height: '1.5rem',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 2
            }}>
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`mx-input ${error ? 'has-error' : ''} ${className}`}
            style={{
              paddingLeft: icon ? '2.75rem' : '1rem',
              paddingRight: rightElement ? '2.75rem' : '1rem',
            }}
            {...props}
          />

          {rightElement && (
            <div style={{ position: 'absolute', right: '0.75rem', display: 'flex', alignItems: 'center', zIndex: 2 }}>
              {rightElement}
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} role="alert" style={{ fontSize: '0.75rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.375rem', margin: '0.25rem 0 0', fontWeight: 500 }}>
            <svg style={{ width: '0.875rem', height: '0.875rem', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={helperId} style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.25rem 0 0' }}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

ZbField.displayName = 'ZbField';
