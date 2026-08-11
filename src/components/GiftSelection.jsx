import React from 'react';
import { Mail, Flower2, Music, CheckCircle2, Sparkles } from 'lucide-react';

export const GiftSelection = ({ onSelectGift, visitedGifts = [], onGoToFinal }) => {
  const gifts = [
    {
      id: 'letter',
      icon: <Mail size={32} strokeWidth={1.5} />,
      emoji: '💌',
      title: 'A Little Letter',
      description: 'Something I wrote for you.'
    },
    {
      id: 'flowers',
      icon: <Flower2 size={32} strokeWidth={1.5} />,
      emoji: '💐',
      title: 'Flowers For You',
      description: 'Pick them one by one.'
    },
    {
      id: 'songs',
      icon: <Music size={32} strokeWidth={1.5} />,
      emoji: '🎧',
      title: 'Songs For You',
      description: 'Three songs, just for you.'
    }
  ];

  const allOpened = visitedGifts.includes('letter') && visitedGifts.includes('flowers') && visitedGifts.includes('songs');

  return (
    <div className="page-view" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '720px', textAlign: 'center' }}>
        <p
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-sub)',
            marginBottom: '8px'
          }}
        >
          Special Birthday Gifts
        </p>

        <h1
          className="font-serif text-gradient"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 600,
            marginBottom: '8px'
          }}
        >
          Choose your gift 🎁
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginBottom: '36px'
          }}
        >
          Which one do you want to open first?
        </p>

        {/* 3 Gift Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          {gifts.map((gift) => {
            const isOpened = visitedGifts.includes(gift.id);

            return (
              <div
                key={gift.id}
                onClick={() => onSelectGift(gift.id)}
                className="glass-card"
                style={{
                  padding: '32px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)';
                }}
              >
                {isOpened && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      color: 'var(--accent-red)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      background: 'rgba(230, 57, 70, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>Opened</span>
                  </div>
                )}

                <div
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '16px',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'
                  }}
                >
                  {gift.emoji}
                </div>

                <h3
                  className="font-serif"
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#ffffff'
                  }}
                >
                  {gift.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-sub)',
                    lineHeight: 1.4
                  }}
                >
                  {gift.description}
                </p>
              </div>
            );
          })}
        </div>

        {allOpened && (
          <div
            style={{
              animation: 'fadeIn 0.5s ease',
              marginTop: '12px'
            }}
          >
            <button
              onClick={onGoToFinal}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, var(--accent-dark-red) 0%, var(--accent-red) 100%)',
                borderColor: 'rgba(255,255,255,0.3)',
                padding: '16px 36px',
                fontSize: '1.05rem',
                boxShadow: '0 10px 30px var(--accent-red-glow)'
              }}
            >
              <Sparkles size={18} />
              <span>One Last Thing... ✨</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftSelection;
