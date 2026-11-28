'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, User, Phone, Check, ArrowRight, UserPlus } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';
import { ZbButton } from '../check/zb/ZbButton';
import { PasswordField } from './PasswordField';
import { PasswordStrength } from './PasswordStrength';
import { mockAuthClient } from '@/lib/auth/mock-auth';
import { isValidEmail, validateFullName, evaluatePasswordStrength } from '@/lib/auth/validators';
import { isValidSriLankanPhone } from '@/lib/phone';

export const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const passwordStrength = evaluatePasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 240);
  };

  const validate = (): boolean => {
    let valid = true;
    let firstFocusTarget: React.RefObject<HTMLInputElement | null> | null = null;

    const nameRes = validateFullName(fullName);
    if (!nameRes.isValid) {
      setFullNameError(nameRes.error || 'Name is invalid');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = fullNameRef;
    } else {
      setFullNameError(null);
    }

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = emailRef;
    } else {
      setEmailError(null);
    }

    if (phone.trim() && !isValidSriLankanPhone(phone)) {
      setPhoneError('Please enter a valid Sri Lankan mobile number.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = phoneRef;
    } else {
      setPhoneError(null);
    }

    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = passwordRef;
    } else {
      setPasswordError(null);
    }

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = confirmRef;
    } else {
      setConfirmError(null);
    }

    if (!acceptTerms) {
      setTermsError('You must agree to the Terms and Privacy Policy.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = termsRef;
    } else {
      setTermsError(null);
    }

    if (firstFocusTarget?.current) {
      firstFocusTarget.current.focus();
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      triggerShake();
      return;
    }

    setIsLoading(true);

    try {
      const res = await mockAuthClient.register({
        fullName,
        email,
        phone: phone.trim() ? phone : undefined,
        password,
        acceptTerms,
        marketingOptIn,
      });

      if (res.success) {
        setIsSuccess(true);
        setPassword('');
        setConfirmPassword('');
      } else {
        triggerShake();
        if (res.fieldErrors?.email) {
          setEmailError(res.fieldErrors.email);
          emailRef.current?.focus();
        }
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
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Account Created Successfully</h2>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Your security profile is now active</p>
          </div>
        </div>

        <div className="mx-card-body" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9375rem', color: '#334155' }}>
            Your digital safety account is active. You can now use all Moatix scam detection and community reporting tools.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <ZbButton variant="primary" fullWidth>
                Go to Sign In →
              </ZbButton>
            </Link>
            <Link href="/check" style={{ textDecoration: 'none' }}>
              <ZbButton variant="outline" fullWidth>
                Start Checking Scams
              </ZbButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-card ${shake ? 'zb-shake' : ''}`}>
      <div className="mx-card-header">
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <UserPlus style={{ width: '20px', height: '20px' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Create Moatix Account
          </h2>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
            Join the digital scam assessment portal for Sri Lanka
          </p>
        </div>
      </div>

      <div className="mx-card-body">
        <form onSubmit={handleSubmit} noValidate>
          {/* Section 01: Details */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
              01 • Personal Details
            </span>

            <ZbField
              ref={fullNameRef}
              label="Full Name:"
              placeholder="e.g. Kasun Perera"
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFullName(e.target.value);
                if (fullNameError) setFullNameError(null);
              }}
              error={fullNameError || undefined}
              autoComplete="name"
              icon={<User style={{ width: '1.125rem', height: '1.125rem' }} />}
              disabled={isLoading}
            />

            <ZbField
              ref={emailRef}
              label="Email Address:"
              placeholder="e.g. kasun@example.lk"
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

            <ZbField
              ref={phoneRef}
              label="Phone Number (Optional):"
              placeholder="e.g. 077 123 4567"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(null);
              }}
              error={phoneError || undefined}
              helperText="Optional. Used only for emergency security alerts."
              autoComplete="tel"
              icon={<Phone style={{ width: '1.125rem', height: '1.125rem' }} />}
              disabled={isLoading}
            />
          </div>

          {/* Section 02: Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
              02 • Security
            </span>

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
              autoComplete="new-password"
              disabled={isLoading}
            />
            {password.length > 0 && <PasswordStrength strength={passwordStrength} />}

            <div style={{ marginTop: '0.75rem' }}>
              <PasswordField
                ref={confirmRef}
                label="Confirm Password:"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmError) setConfirmError(null);
                }}
                error={confirmError || undefined}
                autoComplete="new-password"
                disabled={isLoading}
              />
              {passwordsMatch && (
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Check style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Passwords match</span>
                </p>
              )}
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                ref={termsRef}
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  if (termsError) setTermsError(null);
                }}
                style={{ width: '1rem', height: '1rem', marginTop: '2px', accentColor: '#1d4ed8' }}
              />
              <span style={{ color: '#475569', lineHeight: 1.4 }}>
                I agree to the{' '}
                <Link href="/privacy" style={{ color: '#1d4ed8', fontWeight: 600, textDecoration: 'none' }}>
                  Privacy Policy
                </Link>{' '}
                and Terms of Service.
              </span>
            </label>
            {termsError && (
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#dc2626', fontWeight: 500, paddingLeft: '1.5rem' }}>
                {termsError}
              </p>
            )}

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                style={{ width: '1rem', height: '1rem', marginTop: '2px', accentColor: '#1d4ed8' }}
              />
              <span style={{ color: '#64748b', lineHeight: 1.4 }}>
                Send me emergency scam alerts and phishing advisories (optional).
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                setFullName('');
                setEmail('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
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
              style={{ minWidth: '180px' }}
            >
              Create Account →
            </ZbButton>
          </div>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
