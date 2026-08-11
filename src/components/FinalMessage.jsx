import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { config } from '../config';

export const FinalMessage = ({ onRestart }) => {
  useEffect(() => {
    // Elegant dark red & silver romantic confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#e63946', '#ffffff', '#9ca3af']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#e63946', '#d1d5db']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#ffffff', '#e63946']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#ffffff', '#9ca3af']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#e63946']
    });
  }, []);

  return (
    <div className="page-view" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '540px',
          padding: 'clamp(32px, 6vw, 56px) clamp(20px, 5vw, 40px)',
          textAlign: 'center',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7)'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(230, 57, 70, 0.12)',
            border: '1px solid var(--accent-red-glow)',
            color: '#ffffff',
            padding: '8px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            marginBottom: '28px'
          }}
        >
          <Sparkles size={16} color="var(--accent-red)" />
          <span>One Last Thing...</span>
        </div>

        <h1
          className="font-serif text-gradient"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
            fontWeight: 700,
            marginBottom: '20px',
            lineHeight: 1.25
          }}
        >
          Happy 25th Birthday, Hanief. <span style={{ color: 'var(--accent-red)' }}>❤️</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
            color: '#e5e7eb',
            lineHeight: 1.8,
            marginBottom: '36px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300
          }}
        >
          Semoga tahun ini membawa lebih banyak hal baik, lebih banyak kebahagiaan, dan lebih banyak alasan untuk tersenyum.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '40px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>With love,</span>
          <span
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '2.4rem',
              color: '#ffffff'
            }}
          >
            {config.senderName}
          </span>
        </div>

        <button
          onClick={onRestart}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-sub)',
            padding: '12px 28px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <RefreshCw size={15} />
          <span>Replay experience</span>
        </button>
      </div>
    </div>
  );
};

export default FinalMessage;
