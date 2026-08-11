import React from 'react';
import { Heart } from 'lucide-react';

export const BirthdayCalendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // August 2026 starts on Saturday (index 6).
  // Total days = 31.
  const emptyDays = Array.from({ length: 6 });
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div
      className="glass-card"
      style={{
        width: '100%',
        maxWidth: '380px',
        padding: '24px 20px',
        margin: '28px auto 32px',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <span
          className="font-serif text-gradient"
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          AUGUST 2026
        </span>
        <span
          style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-sub)',
            background: 'rgba(255,255,255,0.06)',
            padding: '4px 10px',
            borderRadius: '12px'
          }}
        >
          Special Day
        </span>
      </div>

      {/* Days of Week Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '10px'
        }}
      >
        {daysOfWeek.map((day) => (
          <span
            key={day}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase'
            }}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          alignItems: 'center'
        }}
      >
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {monthDays.map((day) => {
          const isTargetDay = day === 12;

          return (
            <div
              key={day}
              style={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: isTargetDay ? 700 : 400,
                borderRadius: '50%',
                position: 'relative',
                color: isTargetDay ? '#ffffff' : 'var(--text-sub)',
                background: isTargetDay ? 'var(--accent-red)' : 'transparent',
                boxShadow: isTargetDay ? '0 0 16px var(--accent-red-glow)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {day}
              {isTargetDay && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-2px',
                    color: '#ffffff'
                  }}
                >
                  <Heart size={10} fill="#ffffff" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '18px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          color: 'var(--text-sub)',
          fontSize: '0.85rem'
        }}
      >
        <Heart size={14} fill="var(--accent-red)" color="var(--accent-red)" />
        <span>12 August — your special day</span>
      </div>
    </div>
  );
};

export default BirthdayCalendar;
