import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const duration = 2800; // 2.8 seconds
    const intervalTime = 30;
    const step = (100 / (duration / intervalTime));

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFadingOut(true);
          setTimeout(() => {
            onFinish();
          }, 500);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className={`page-view ${isFadingOut ? 'fade-out' : ''}`} style={{ justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '360px'
        }}
      >
        {/* Animated SVG Birthday Cake */}
        <div style={{ position: 'relative', width: '160px', height: '170px', marginBottom: '32px' }}>
          <svg viewBox="0 0 200 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Flame gradient */}
              <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="35%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="cakeGrad1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#272a34" />
                <stop offset="50%" stopColor="#3b3f4d" />
                <stop offset="100%" stopColor="#232630" />
              </linearGradient>
              <linearGradient id="cakeGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1f222a" />
                <stop offset="50%" stopColor="#2e323e" />
                <stop offset="100%" stopColor="#1c1e25" />
              </linearGradient>
              <linearGradient id="candleGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>

            {/* Cake Plate */}
            <ellipse cx="100" cy="195" rx="85" ry="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

            {/* Bottom Layer */}
            <path d="M 30 140 L 30 190 Q 100 210 170 190 L 170 140 Z" fill="url(#cakeGrad2)" />
            <ellipse cx="100" cy="140" rx="70" ry="12" fill="#333745" />

            {/* Top Layer */}
            <path d="M 48 95 L 48 140 Q 100 155 152 140 L 152 95 Z" fill="url(#cakeGrad1)" />
            <ellipse cx="100" cy="95" rx="52" ry="10" fill="#44495a" />

            {/* Cake Frosting Drips */}
            <path
              d="M 48 95 
                 Q 58 112 68 97 
                 Q 78 115 88 96 
                 Q 98 118 108 97 
                 Q 118 116 128 96 
                 Q 138 114 148 96 
                 Q 152 95 152 95"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Candle */}
            <rect x="94" y="50" width="12" height="45" rx="3" fill="url(#candleGrad)" />
            {/* Candle Wick */}
            <line x1="100" y1="50" x2="100" y2="42" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Flickering Animated Flame */}
            <g className="candle-flame">
              <path
                d="M 100 12 
                   C 92 28, 92 38, 100 44 
                   C 108 38, 108 28, 100 12 Z"
                fill="url(#flameGrad)"
              />
              <circle cx="100" cy="36" r="4" fill="#ffffff" opacity="0.9" />
            </g>
          </svg>
        </div>

        <p
          className="font-serif text-gradient"
          style={{
            fontSize: '1.25rem',
            fontWeight: 500,
            marginBottom: '16px'
          }}
        >
          Preparing something special for you...
        </p>

        {/* Loading Bar */}
        <div
          style={{
            width: '200px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            overflow: 'hidden',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #9ca3af 0%, #ffffff 50%, var(--accent-red) 100%)',
              transition: 'width 0.1s linear',
              borderRadius: '10px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
