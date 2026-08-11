import React, { useState, useMemo } from 'react';
import { ArrowLeft, Heart, Sparkles, RefreshCw } from 'lucide-react';
import Flower from './Flower';
import StemBundle from './StemBundle';
import { config } from '../config';

// ─── Layout constants ─────────────────────────────────────────────────────────
const CONTAINER_H  = 430;  // px — bouquet area height
const HOLDER_H     = 88;   // px — vase height
const HOLDER_TOP_Y = CONTAINER_H - HOLDER_H; // = 342

// ─── Bouquet layout ───────────────────────────────────────────────────────────
// topY : bloom SVG top from container top (px)
// x    : horizontal centre of bloom (%)
// rot  : visual lean angle for the bloom only (deg)
// svgW : rendered bloom SVG width (px) — larger = front flower
// zIdx : stacking order (higher = in front)
//
// 7 rows, dome-shaped: 1+2+3+3+3+2+1 = 15 flowers
const RAW_LAYOUT = [
  // Row 0 — back, topmost, smallest
  { topY:  12, x: 50, rot:   0, svgW: 40, zIdx:  3 },

  // Row 1
  { topY:  30, x: 34, rot: -12, svgW: 42, zIdx:  4 },
  { topY:  30, x: 66, rot:  12, svgW: 42, zIdx:  4 },

  // Row 2
  { topY:  60, x: 20, rot: -25, svgW: 46, zIdx:  5 },
  { topY:  55, x: 50, rot:  -2, svgW: 48, zIdx:  6 },
  { topY:  60, x: 80, rot:  25, svgW: 46, zIdx:  5 },

  // Row 3
  { topY: 100, x: 30, rot: -14, svgW: 50, zIdx:  7 },
  { topY:  97, x: 50, rot:   4, svgW: 52, zIdx:  8 },
  { topY: 100, x: 70, rot:  14, svgW: 50, zIdx:  7 },

  // Row 4 — wide side flowers
  { topY: 148, x: 17, rot: -36, svgW: 48, zIdx:  6 },
  { topY: 148, x: 83, rot:  36, svgW: 48, zIdx:  6 },

  // Row 5
  { topY: 178, x: 36, rot: -16, svgW: 54, zIdx:  9 },
  { topY: 178, x: 64, rot:  16, svgW: 54, zIdx:  9 },

  // Row 6 — front, lowest, largest
  { topY: 218, x: 28, rot: -22, svgW: 56, zIdx: 10 },
  { topY: 218, x: 72, rot:  22, svgW: 56, zIdx: 10 },
];

export const BouquetGift = ({ onBack }) => {
  const [pickedIds, setPickedIds]       = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  const flowers = useMemo(() =>
    RAW_LAYOUT.map((l, i) => ({
      id     : i + 1,
      x      : `${l.x}%`,
      y      : `${l.topY}px`,
      rotation: l.rot,
      svgW   : l.svgW,
      // viewBox is 0 0 56 62 → aspect ratio 56:62
      svgH   : Math.round(l.svgW * 62 / 56),
      zIndex : l.zIdx,
      message: config.flowerMessages[i] || `Sweet message #${i + 1}`,
    })),
  []);

  const handlePickFlower = (id) => {
    if (pickedIds.includes(id)) return;
    const flower = flowers.find((f) => f.id === id);
    setPickedIds((prev) => [...prev, id]);
    setActiveMessage(flower.message);
  };

  const handleReset = () => {
    setPickedIds([]);
    setActiveMessage(null);
  };

  const isCompleted = pickedIds.length === flowers.length;

  return (
    <div className="page-view" style={{ minHeight: '100vh', justifyContent: 'flex-start', paddingTop: '20px' }}>
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-sub)', padding: '10px 18px',
              borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center',
              gap: '8px', cursor: 'pointer', fontSize: '0.9rem',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to gifts</span>
          </button>
          <span style={{
            fontSize: '0.85rem', color: 'var(--text-sub)',
            background: 'rgba(255,255,255,0.06)', padding: '6px 14px',
            borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            Flowers picked: <strong style={{ color: '#fff' }}>{pickedIds.length}</strong> / {flowers.length}
          </span>
        </div>

        <h1 className="font-serif text-gradient"
          style={{ fontSize: 'clamp(1.75rem,5vw,2.4rem)', fontWeight: 600, marginBottom: '4px', textAlign: 'center' }}>
          Flowers For You 💐
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', textAlign: 'center' }}>
          Tap or click each flower to uncover a little message
        </p>

        {/* ── Message box ────────────────────────────────────────────────── */}
        <div className="glass-card" style={{
          width: '100%', minHeight: '76px', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px', textAlign: 'center',
          border: activeMessage ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
        }}>
          {activeMessage ? (
            <p key={activeMessage} className="font-serif"
              style={{ fontSize: 'clamp(1.1rem,3.5vw,1.35rem)', color: '#fff', fontWeight: 600, animation: 'fadeIn 0.3s ease' }}>
              "{activeMessage}"
            </p>
          ) : (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Pick a flower from the bouquet below...
            </p>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            BOUQUET CONTAINER
            Layer order (bottom → top):
              1. container background gradient
              2. ambient glow (z 1)
              3. StemBundle SVG — all stems + leaves, clipped at vase lip (z 3)
              4. Flower blooms — sorted by zIndex (z 4–10)
              5. Vase holder — always on top, hides stem ends (z 20)
            ════════════════════════════════════════════════════════════════ */}
        <div className="glass-card" style={{
          width: '100%',
          height: `${CONTAINER_H}px`,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '24px',
          background: 'radial-gradient(ellipse at 50% 28%, rgba(34,37,48,0.72) 0%, rgba(11,12,17,0.97) 100%)',
        }}>

          {/* Ambient glow in bloom zone */}
          <div style={{
            position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)',
            width: '280px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {/* ── All stems + leaves (clipped at vase lip) ── */}
          <StemBundle flowers={flowers} pickedIds={pickedIds} />

          {/* ── Flower blooms (rendered back→front by z-index) ── */}
          {[...flowers]
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((flower) => (
              <Flower
                key={flower.id}
                flower={flower}
                index={flower.id - 1}
                isPicked={pickedIds.includes(flower.id)}
                onPick={handlePickFlower}
              />
            ))
          }

          {/* ── Vase holder — z-index 20 covers stem ends inside vase ── */}
          <div style={{
            position: 'absolute', bottom: '0px', left: '50%',
            transform: 'translateX(-50%)',
            width: '130px', height: `${HOLDER_H}px`,
            background: 'linear-gradient(165deg, #252830 0%, #191c23 50%, #101318 100%)',
            border: '1px solid rgba(255,255,255,0.11)',
            borderRadius: '14px 14px 56px 56px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
            paddingTop: '0',
            boxShadow: '0 16px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
            zIndex: 20,
            overflow: 'hidden',
          }}>
            {/* Vase interior shadow — makes it look like stems enter a deep opening */}
            <div style={{
              width: '100%', height: '28px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)',
              borderRadius: '14px 14px 0 0',
            }} />
            {/* Ribbon stripe */}
            <div style={{
              width: '100%', height: '10px',
              background: 'linear-gradient(90deg, #8b1520 0%, var(--accent-red) 45%, #8b1520 100%)',
              boxShadow: '0 0 12px rgba(230,57,70,0.4)',
            }} />
            <Heart size={15} fill="var(--accent-red)" color="var(--accent-red)"
              style={{ marginTop: '8px', opacity: 0.82 }} />
          </div>

        </div>

        {/* ── Completion message ──────────────────────────────────────── */}
        {isCompleted && (
          <div className="glass-card" style={{
            width: '100%', padding: '24px', textAlign: 'center',
            animation: 'fadeIn 0.6s ease', marginBottom: '20px',
          }}>
            <Sparkles size={24} color="var(--accent-red)" style={{ marginBottom: '8px' }} />
            <h3 className="font-serif text-gradient"
              style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '6px' }}>
              Looks like you found all my little messages. ❤️
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', marginBottom: '18px' }}>
              Maybe there are still a few things I haven't said...
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={handleReset} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-sub)', padding: '10px 20px',
                borderRadius: 'var(--radius-full)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem',
              }}>
                <RefreshCw size={15} />
                <span>Pick again</span>
              </button>
              <button onClick={onBack} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                Back to gifts
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BouquetGift;
