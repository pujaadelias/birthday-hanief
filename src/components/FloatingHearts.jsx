import React, { useMemo } from 'react';

const PALETTE = ['#ff5c72', '#e63956', '#b83b4b', '#d66a7a', '#f3b6bd', '#ffffff'];
const SIZES = [8, 8, 12, 12, 12, 16, 16, 20, 26, 32];
const ANIMATIONS = [
  'floatUpDriftLeft',
  'floatUpDriftRight',
  'floatDownDrift',
  'floatDiagonal',
  'floatSwayPulse'
];

export const FloatingHearts = ({ count = 38 }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = SIZES[Math.floor(Math.random() * SIZES.length)];
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const animName = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];

      const isFocal = Math.random() < 0.20; // 20% focal hearts
      const opacity = isFocal
        ? Number((0.58 + Math.random() * 0.07).toFixed(2)) // 0.58 - 0.65 for focal
        : Number((0.20 + Math.random() * 0.35).toFixed(2)); // 0.20 - 0.55 standard

      const left = Number((Math.random() * 96 + 2).toFixed(1)); // 2% to 98%
      const top = Number((Math.random() * 96 + 2).toFixed(1)); // 2% to 98%
      const duration = Number((8 + Math.random() * 10).toFixed(1)); // 8s to 18s
      const delay = Number((-Math.random() * 18).toFixed(1)); // negative delay for instant spread

      // Glow effect calculation
      const glowColor = color === '#ffffff' ? 'rgba(255, 92, 114, 0.4)' : color;
      const glowBlur = isFocal ? '10px' : '7px';
      const glowOpacity = isFocal ? '0.5' : '0.35';
      const textShadow = `0 0 ${glowBlur} ${glowColor}${Math.round(parseFloat(glowOpacity) * 255).toString(16).padStart(2, '0')}`;

      return {
        id: i,
        size,
        color,
        left: `${left}%`,
        top: `${top}%`,
        opacity,
        animName,
        duration: `${duration}s`,
        delay: `${delay}s`,
        textShadow
      };
    });
  }, [count]);

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            top: h.top,
            fontSize: `${h.size}px`,
            color: h.color,
            opacity: h.opacity,
            textShadow: h.textShadow,
            animation: `${h.animName} ${h.duration} infinite ease-in-out ${h.delay}`
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;

