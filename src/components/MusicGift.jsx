import React from 'react';
import { ArrowLeft, Music, Heart } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import { config } from '../config';

export const MusicGift = ({ onBack }) => {
  return (
    <div className="page-view" style={{ minHeight: '100vh', justifyContent: 'flex-start', paddingTop: '20px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Navigation Top */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
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
              fontSize: '0.9rem'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to gifts</span>
          </button>
        </div>

        <h1
          className="font-serif text-gradient"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.4rem)',
            fontWeight: 600,
            marginBottom: '4px',
            textAlign: 'center'
          }}
        >
          Songs For You 🎧
        </h1>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '24px',
            textAlign: 'center'
          }}
        >
          Maybe these songs can say some of the things I can't.
        </p>

        {/* Functional Music Player */}
        <MusicPlayer songs={config.songs} />

        {/* Song Descriptions Container */}
        <div
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: '24px 20px',
            marginTop: '24px',
            marginBottom: '28px'
          }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '16px',
              textAlign: 'center'
            }}
          >
            Three songs, three little feelings.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {config.songs.map((song) => (
              <div
                key={song.id}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{song.title}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{song.artist}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', fontStyle: 'italic' }}>
                  "{song.description}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onBack}
          className="btn-primary"
          style={{ padding: '12px 28px', fontSize: '0.95rem', marginBottom: '24px' }}
        >
          Back to gifts
        </button>
      </div>
    </div>
  );
};

export default MusicGift;
