import React, { useState } from 'react';
import { ArrowLeft, Mail, Heart } from 'lucide-react';
import { config } from '../config';

export const LetterGift = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="page-view" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Navigation Top */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-sub)',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to gifts</span>
          </button>
        </div>

        {!isOpen ? (
          /* Sealed Envelope View */
          <div
            onClick={() => setIsOpen(true)}
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '48px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)';
            }}
          >
            {/* Envelope Visual */}
            <div
              style={{
                width: '100px',
                height: '70px',
                background: 'linear-gradient(135deg, #252830 0%, #16181f 100%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: '24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}
            >
              {/* Heart Wax Seal */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--accent-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px var(--accent-red-glow)'
                }}
              >
                <Heart size={16} fill="#ffffff" color="#ffffff" />
              </div>
            </div>

            <h2
              className="font-serif text-gradient"
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                marginBottom: '8px'
              }}
            >
              Open this letter 💌
            </h2>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
              Click to unfold Puja's message for you
            </p>
          </div>
        ) : (
          /* Opened Digital Letter View */
          <div
            className="glass-card"
            style={{
              width: '100%',
              padding: 'clamp(24px, 5vw, 44px)',
              background: 'rgba(18, 20, 26, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
              animation: 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Letter Header Accent */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '28px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)' }}>
                <Heart size={18} fill="var(--accent-red)" />
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-sub)' }}>
                  A Letter For You
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {config.birthdayDate}
              </span>
            </div>

            {/* Letter Content formatted beautifully */}
            <div
              style={{
                color: '#e5e7eb',
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                lineHeight: 1.85,
                whiteSpace: 'pre-line',
                textAlign: 'left'
              }}
            >
              {config.letterContent}
            </div>

            {/* Letter Footer */}
            <div
              style={{
                marginTop: '36px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.8rem', color: 'var(--text-main)' }}>
                Puja Adelia
              </span>

              <button
                onClick={onBack}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.9rem' }}
              >
                Back to gifts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterGift;
