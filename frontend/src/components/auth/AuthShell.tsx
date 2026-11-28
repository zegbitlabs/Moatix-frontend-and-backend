'use client';

import React from 'react';

interface AuthShellProps {
  children: React.ReactNode;
  pageType: 'login' | 'register' | 'forgot-password';
}

export const AuthShell: React.FC<AuthShellProps> = ({ children, pageType }) => {
  return (
    <div className="mx-page-wrapper">
      {/* Hero Intro Header Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 1.5rem 4rem' }}>
        {/* Top Floating Pill Badge */}
        <div className="mx-pill-badge" style={{ marginBottom: '1.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1d4ed8' }} />
          <span>Moatix Check • Digital Safety for Sri Lanka</span>
        </div>

        {/* Big Bold Headline from the Portal */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#0f172a',
            margin: '0 0 0.5rem 0'
          }}>
            Think Before You Trust.<br />
            <span style={{ color: '#1d4ed8' }}>
              {pageType === 'login' ? 'Sign In Before You Verify.' : pageType === 'register' ? 'Join & Check Before You Click.' : 'Recover Your Account Access.'}
            </span>
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#334155',
            lineHeight: 1.6,
            maxWidth: '38rem',
            margin: '1rem auto 0',
            fontWeight: 500
          }}>
            {pageType === 'login' 
              ? 'Access your saved fraud assessments, track suspicious phone numbers, and submit community safety reports.'
              : pageType === 'register'
              ? 'Create your free Sri Lankan digital safety account to verify suspicious web links, payment slips, and fraud SMS.'
              : 'Enter your registered email address to receive secure instructions to recover your Moatix account.'
            }
          </p>
        </div>

        {/* Centered White Card */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          {children}
        </div>
      </main>
    </div>
  );
};
