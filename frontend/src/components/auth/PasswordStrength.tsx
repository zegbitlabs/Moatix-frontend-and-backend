'use client';

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { PasswordStrengthResult } from '@/lib/auth/types';

interface PasswordStrengthProps {
  strength: PasswordStrengthResult;
  showRules?: boolean;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength, showRules = true }) => {
  const { score, level, label, rules } = strength;

  const getSegmentColor = (index: number) => {
    if (index >= score) return '#e2e8f0';
    if (level === 'weak') return '#ef4444';
    if (level === 'fair') return '#f59e0b';
    if (level === 'good') return '#3b82f6';
    if (level === 'strong') return '#1d4ed8';
    return '#e2e8f0';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
      {/* 4 Segment Progress Rail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', width: '100%', height: '4px' }}>
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            style={{
              height: '100%',
              flex: 1,
              borderRadius: '9999px',
              backgroundColor: getSegmentColor(idx),
              transition: 'all 200ms ease'
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
        <span style={{ color: '#64748b' }}>Password strength</span>
        <span 
          role="status" 
          aria-live="polite" 
          style={{
            fontWeight: 700,
            color: level === 'weak' ? '#dc2626' : level === 'fair' ? '#d97706' : '#1d4ed8'
          }}
        >
          {score > 0 ? label : 'None'}
        </span>
      </div>

      {showRules && (
        <ul style={{ margin: '0.25rem 0 0 0', padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr', gap: '0.25rem', fontSize: '0.75rem' }}>
          {rules.map((rule) => (
            <li key={rule.id} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {rule.met ? (
                <Check style={{ width: '0.875rem', height: '0.875rem', color: '#16a34a', strokeWidth: 2.5 }} />
              ) : (
                <Circle style={{ width: '0.875rem', height: '0.875rem', color: '#cbd5e1' }} />
              )}
              <span style={{ color: rule.met ? '#0f172a' : '#64748b', fontWeight: rule.met ? 600 : 400 }}>
                {rule.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
