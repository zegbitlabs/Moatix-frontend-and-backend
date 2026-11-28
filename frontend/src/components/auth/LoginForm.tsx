'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Check, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';
import { ZbButton } from '../check/zb/ZbButton';
import { PasswordField } from './PasswordField';
import { AuthDivider } from './AuthDivider';
import { mockAuthClient } from '@/lib/auth/mock-auth';
import { isValidIdentifier } from '@/lib/auth/validators';

export const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [identifierError, setIdentifierError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const [shake, setShake] = useState(false);

  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 240);
  };

  const validate = (): boolean => {
    let valid = true;
    setGeneralError(null);

    if (!identifier.trim()) {
      setIdentifierError('Email or phone number is required.');
      valid = false;
    } else if (!isValidIdentifier(identifier)) {
      setIdentifierError('Enter a valid email address or Sri Lankan phone (+94 / 07x).');
      valid = false;
    } else {
      setIdentifierError(null);
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;

    if (!validate()) {
      triggerShake();
      if (!identifier.trim() || !isValidIdentifier(identifier)) {
        identifierRef.current?.focus();
      } else if (!password || password.length < 8) {
        passwordRef.current?.focus();
      }
      return;
    }

    setIsLoading(true);
    setGeneralError(null);

    try {
      const res = await mockAuthClient.login({
        identifier,
        password,
        rememberMe,
      });

      if (res.success) {
        setIsSuccess(true);
        setPassword('');
      } else {
        triggerShake();
        setGeneralError(res.error || 'Email or password is incorrect.');
        if (res.cooldownSeconds) {
          setCooldown(res.cooldownSeconds);
        }
        passwordRef.current?.focus();
      }
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
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Signed In Successfully</h2>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Welcome to Moatix Cyber Defense</p>
          </div>
        </div>

        <div className="mx-card-body" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9375rem', color: '#334155' }}>
            You are securely authenticated. You now have access to verified scam scanning tools, reporting, and priority threat intelligence.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <ZbButton variant="primary" fullWidth>
                Go to Moatix Check →
              </ZbButton>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setIdentifier('');
              }}
              style={{ fontSize: '0.8125rem', color: '#64748b', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Sign in with another account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-card ${shake ? 'zb-shake' : ''}`}>
      {/* Top Header echoing the Web Link Checker banner from screenshot */}
      <div className="mx-card-header">
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <UserCheck style={{ width: '20px', height: '20px' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Sign In to Moatix
          </h2>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
            Access saved scam evaluations & verified history
          </p>
        </div>
      </div>

      <div className="mx-card-body">
        {generalError && (
          <div role="alert" style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8125rem', color: '#dc2626', fontWeight: 500 }}>
            <AlertCircle style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <ZbField
            ref={identifierRef}
            label="Email or Phone Number:"
            placeholder="e.g. name@example.lk or 077..."
            value={identifier}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setIdentifier(e.target.value);
              if (identifierError) setIdentifierError(null);
            }}
            error={identifierError || undefined}
            autoComplete="username"
            inputMode="email"
            icon={<Mail style={{ width: '1.125rem', height: '1.125rem' }} />}
            disabled={isLoading || cooldown > 0}
          />

          <PasswordField
            ref={passwordRef}
            label="Password:"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(null);
            }}
            error={passwordError || undefined}
            autoComplete="current-password"
            disabled={isLoading || cooldown > 0}
          />

          {/* Remember me & Forgot Password */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', padding: '0 0 1.25rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '1rem', height: '1rem', accentColor: '#1d4ed8' }}
              />
              <span style={{ color: '#475569', fontWeight: 500 }}>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              style={{ fontSize: '0.8125rem', color: '#1d4ed8', textDecoration: 'none', fontWeight: 600 }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => {
                setIdentifier('');
                setPassword('');
              }}
              style={{ background: 'none', border: 'none', color: '#475569', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
            >
              Clear
            </button>

            <ZbButton
              type="submit"
              variant="primary"
              fullWidth={false}
              isLoading={isLoading}
              disabled={cooldown > 0}
              style={{ minWidth: '150px' }}
            >
              {cooldown > 0 ? (
                <span>Wait {cooldown}s</span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  Sign In →
                </span>
              )}
            </ZbButton>
          </div>
        </form>

        <AuthDivider label="OR" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <ZbButton variant="outline" fullWidth>
              Continue as Guest (No Account Needed)
            </ZbButton>
          </Link>

          <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
            New to Moatix?{' '}
            <Link href="/register" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
