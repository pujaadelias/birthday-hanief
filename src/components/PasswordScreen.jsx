import React, { useState } from 'react';
import { Lock, Heart, KeyRound } from 'lucide-react';
import { config } from '../config';

export const PasswordScreen = ({ onUnlock }) => {
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal === config.password) {
      setIsSuccess(true);
      setErrorMsg('');
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setErrorMsg('Oops... try again ❤️');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className={`page-view ${isSuccess ? 'fade-out' : ''}`} style={{ justifyContent: 'center' }}>
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '40px 28px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Subtle lock icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: '#e5e7eb'
          }}
        >
          <Lock size={26} strokeWidth={1.5} />
        </div>

        <p
          style={{
            fontSize: '0.95rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--text-sub)',
            marginBottom: '8px'
          }}
        >
          Something special is waiting for you...
        </p>

        <h1
          className="font-serif text-gradient"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.2rem)',
            fontWeight: 600,
            marginBottom: '28px',
            lineHeight: 1.2
          }}
        >
          Enter the secret code
        </h1>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className={isShaking ? 'shake-input' : ''} style={{ marginBottom: '20px', position: 'relative' }}>
            <input
              type="password"
              inputMode="numeric"
              maxLength={10}
              placeholder="••••••"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              style={{
                width: '100%',
                padding: '16px 20px',
                paddingLeft: '44px',
                fontSize: '1.25rem',
                letterSpacing: '0.3em',
                textAlign: 'center',
                background: 'rgba(10, 11, 14, 0.7)',
                border: errorMsg ? '1px solid var(--accent-red)' : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-sm)',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              aria-label="Secret password input"
              autoFocus
            />
            <KeyRound
              size={18}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
          </div>

          {errorMsg && (
            <p
              style={{
                color: '#f87171',
                fontSize: '0.9rem',
                marginBottom: '18px',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: '6px' }}
          >
            Unlock <Heart size={18} fill="var(--accent-red)" color="var(--accent-red)" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordScreen;
