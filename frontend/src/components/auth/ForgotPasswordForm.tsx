'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, Check, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';
import { ZbButton } from '../check/zb/ZbButton';
import { mockAuthClient } from '@/lib/auth/mock-auth';
import { isValidEmail } from '@/lib/auth/validators';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 240);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      triggerShake();
      emailRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      await mockAuthClient.forgotPassword({ email });
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-card">
        <div className="mx-card-header">
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check style={{ width: '20px', height: '20px', strokeWidth: 3 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Check Your Inbox</h2>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Reset instructions sent</p>
          </div>
        </div>

        <div className="mx-card-body" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9375rem', color: '#334155' }}>
            If an account exists for that email, recovery instructions have been sent.
          </p>

          <Link href="/login" style={{ textDecoration: 'none' }}>
            <ZbButton variant="primary" fullWidth>
              Return to Sign In →
            </ZbButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-card ${shake ? 'zb-shake' : ''}`}>
      <div className="mx-card-header">
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KeyRound style={{ width: '20px', height: '20px' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Reset Password
          </h2>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
            Enter your email to receive recovery instructions
          </p>
        </div>
      </div>

      <div className="mx-card-body">
        <form onSubmit={handleSubmit} noValidate>
          <ZbField
            ref={emailRef}
            label="Email Address:"
            placeholder="e.g. name@example.lk"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            error={emailError || undefined}
            autoComplete="email"
            inputMode="email"
            icon={<Mail style={{ width: '1.125rem', height: '1.125rem' }} />}
            disabled={isLoading}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Link href="/login" style={{ fontSize: '0.875rem', color: '#475569', textDecoration: 'none', fontWeight: 600 }}>
              Cancel
            </Link>

            <ZbButton type="submit" variant="primary" fullWidth={false} isLoading={isLoading} style={{ minWidth: '160px' }}>
              Send Recovery Link →
            </ZbButton>
          </div>
        </form>
      </div>
    </div>
  );
};
