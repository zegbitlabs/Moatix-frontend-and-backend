import React from 'react';

export const AuthDivider: React.FC<{ label?: string }> = ({ label = 'OR' }) => {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.5rem 0', width: '100%' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', borderTop: '1px solid #e2e8f0' }} />
      </div>
      <div style={{ position: 'relative', padding: '0 0.75rem', backgroundColor: '#ffffff', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  );
};
