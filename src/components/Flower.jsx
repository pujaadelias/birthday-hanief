import React from 'react';

// ─── Colour palettes ─────────────────────────────────────────────────────────
const PALETTES = [
  { petals: '#f8fafc', center: '#fbbf24' }, // white + gold
  { petals: '#f1f5f9', center: '#fde68a' }, // off-white + pale gold
  { petals: '#e2e8f0', center: '#fef08a' }, // soft gray + yellow
  { petals: '#cbd5e1', center: '#fbbf24' }, // silver + gold
  { petals: '#e8c5cc', center: '#e63946' }, // dusty rose + red
  { petals: '#e63946', center: '#fbbf24' }, // burgundy + gold
];

// ─── Bloom geometry (SVG viewBox 0 0 56 62) ──────────────────────────────────
const BX = 28; // bloom center x
const BY = 30; // bloom center y
const BR = 11; // bloom radius

/**
 * FLOWER — bloom only (no stem / leaves in this SVG).
 *
 * WHY: Stems are drawn in StemBundle.jsx using container-absolute coordinates.
 * If the stem were inside this rotated div, the stem end would drift far
 * left/right when the flower leans ±25–36°, poking outside the vase.
 *
 * The rotation of the bloom visual is applied to the inner <g> element
 * (SVG transform, not CSS), so the wrapping div stays axis-aligned.
 * This means StemBundle can reliably compute "bloom bottom" as:
 *   container_y = topY + 41 * svgW / 56    (no rotation correction needed)
 */
export const Flower = ({ flower, isPicked, onPick, index }) => {
  const palette = PALETTES[index % PALETTES.length];

  return (
    <div
      onClick={() => !isPicked && onPick(flower.id)}
      title={isPicked ? 'Picked' : 'Tap to pick this flower'}
      style={{
        position      : 'absolute',
        left          : flower.x,
        top           : flower.y,
        // Div only centres + animates pick — NO CSS rotation here
        transform     : isPicked ? 'translate(-50%, -72px) scale(0.07)' : 'translate(-50%, 0)',
        transformOrigin: '50% 0%',
        opacity       : isPicked ? 0 : 1,
        cursor        : isPicked ? 'default' : 'pointer',
        transition    : 'transform 0.58s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.44s ease 0.1s',
        zIndex        : isPicked ? 1 : (flower.zIndex || 10),
        pointerEvents : isPicked ? 'none' : 'auto',
        willChange    : 'transform, opacity',
      }}
    >
      <svg
        width={flower.svgW || 56}
        height={flower.svgH || 62}
        viewBox="0 0 56 62"
        style={{
          display : 'block',
          overflow: 'visible', // top petals bleed above y=0 — that's fine
          filter  : 'drop-shadow(0 4px 10px rgba(0,0,0,0.52))',
        }}
      >
        {/*
          Rotation lives here (SVG attribute), NOT on the outer div.
          Pivot = bloom centre (BX, BY) = (28, 30).
        */}
        <g transform={`rotate(${flower.rotation} ${BX} ${BY})`}>
          {/* 8 petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx={BX}
              cy={BY - 19}
              rx="9.5"
              ry="19"
              fill={palette.petals}
              opacity={0.87 + (i % 2) * 0.08}
              transform={`rotate(${(i * 360) / 8} ${BX} ${BY})`}
            />
          ))}
          {/* Centre */}
          <circle cx={BX} cy={BY} r={BR} fill={palette.center} stroke="rgba(0,0,0,0.2)" strokeWidth="1.6" />
          <circle cx={BX - 3.5} cy={BY - 2} r="2" fill="rgba(0,0,0,0.13)" />
          <circle cx={BX + 3.5} cy={BY - 2} r="2" fill="rgba(0,0,0,0.13)" />
          <circle cx={BX}       cy={BY + 4}  r="2" fill="rgba(0,0,0,0.13)" />
        </g>
      </svg>
    </div>
  );
};

export default Flower;
