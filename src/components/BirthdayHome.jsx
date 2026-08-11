import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import BirthdayCalendar from './BirthdayCalendar';
import { config } from '../config';

export const BirthdayHome = ({ onOpenGifts }) => {
  return (
    <div className="page-view" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          textAlign: 'center',
          padding: '20px 0'
        }}
      >
        {/* Subtle badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            color: 'var(--text-sub)',
            marginBottom: '24px'
          }}
        >
          <Sparkles size={14} color="var(--accent-red)" />
          <span>A Private Birthday Surprise</span>
        </div>

        <p
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            fontWeight: 400,
            color: 'var(--text-sub)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}
        >
          Happy 25th Birthday
        </p>

        <h1
          className="font-serif text-gradient"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '8px'
          }}
        >
          {config.birthdayName} <span style={{ color: 'var(--accent-red)' }}>❤️</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
            fontWeight: 400,
            color: 'var(--text-main)',
            fontStyle: 'italic',
            marginBottom: '8px',
            fontFamily: 'var(--font-serif)'
          }}
        >
          from {config.senderName}
        </p>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '12px'
          }}
        >
          A little something I made just for you.
        </p>

        {/* August 2026 Calendar Card */}
        <BirthdayCalendar />

        {/* Action Button */}
        <button
          onClick={onOpenGifts}
          className="btn-primary"
          style={{
            padding: '16px 36px',
            fontSize: '1.05rem',
            letterSpacing: '0.02em'
          }}
        >
          <span>Open your gifts</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default BirthdayHome;
