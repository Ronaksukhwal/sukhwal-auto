import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      style={{ 
        borderTop: '1px solid rgba(233, 30, 99, 0.15)', 
        padding: '2.5rem 5%', 
        background: '#fffdf5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        fontSize: '0.88rem',
        color: 'var(--text-gray)',
        fontWeight: '600'
      }}
    >
      <div>
        <div style={{ color: 'var(--text-heading)', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
          Sukhwal Auto Services
        </div>
        <div>Owner: <strong>Gopal Sukhwal</strong> | Shop no. 2, near TB Hospital, Manikya Nagar, Bhilwara (311001)</div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>© {new Date().getFullYear()} Sukhwal Auto. All Rights Reserved.</div>
        <div style={{ color: 'var(--primary)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} /> 100% Genuine Hero Parts
        </div>
      </div>
    </footer>
  );
}
