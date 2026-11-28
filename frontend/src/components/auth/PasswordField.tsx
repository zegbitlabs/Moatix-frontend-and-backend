'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  helperText?: string;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, helperText, onKeyDown, onKeyUp, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [capsLockActive, setCapsLockActive] = useState(false);

    const handleKeyDetection = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'));
      }
    };

    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <ZbField
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          label={label}
          error={error}
          helperText={helperText}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            handleKeyDetection(e);
            onKeyDown?.(e);
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            handleKeyDetection(e);
            onKeyUp?.(e);
          }}
          rightElement={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {capsLockActive && (
                <span 
                  role="status" 
                  aria-live="polite"
                  style={{
                    padding: '2px 6px',
                    fontSize: '0.625rem',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    backgroundColor: '#fef3c7',
                    color: '#b45309',
                    border: '1px solid #fde68a'
                  }}
                  title="Caps Lock is active"
                >
                  CAPS
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
              </button>
            </div>
          }
          {...props}
        />
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
