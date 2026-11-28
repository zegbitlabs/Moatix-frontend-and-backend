import React from 'react';

export const AuthNotice: React.FC = () => {
  return (
    <div
      role="status"
      style={{
        width: '100%',
        maxWidth: '460px',
        marginBottom: '1rem',
        padding: '0.625rem 1rem',
        borderRadius: '8px',
        backgroundColor: '#0B0B0B',
        color: '#FFFFFF',
        border: '1px solid rgba(184, 245, 42, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.8125rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--zb-lime)', flexShrink: 0 }} />
      <span style={{ color: '#F4F4F2', lineHeight: 1.3 }}>
        <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Moatix Identity:</strong> Secure end-to-end encrypted session for Sri Lankan citizens.
      </span>
    </div>
  );
};
