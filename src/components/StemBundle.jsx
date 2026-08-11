import React from 'react';

// ─── Must match BouquetGift constants ────────────────────────────────────────
const CONTAINER_H  = 430;
const HOLDER_TOP_Y = 342; // CONTAINER_H - HOLDER_H = 430 - 88

/**
 * How far stems extend PAST the vase lip (in container px).
 * The vase holder has z-index 20 and starts at y = HOLDER_TOP_Y,
 * so it hides this portion of every stem — making them look like
 * they disappear into the vase interior.
 */
const STEM_PAST_LIP = 26;
const STEM_END_Y    = HOLDER_TOP_Y + STEM_PAST_LIP; // = 368

// All stems converge to the vase mouth centre
const VASE_X = 300; // 50 % × 600-unit viewBox

// ─── Colours ─────────────────────────────────────────────────────────────────
const STEM_C  = '#3a4a3e';
const LEAF_C1 = '#4a6350';
const LEAF_C2 = '#35413a';

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** x-percent string → SVG x unit in a 600-unit-wide viewBox */
const toSvgX = (xStr) => parseFloat(xStr) * 6;

/**
 * Bloom-bottom y in container px (= SVG y, since viewBox height = container height).
 *
 * In Flower.jsx the SVG viewBox is "0 0 56 62" and bloom-bottom sits at
 * y = BY + BR = 30 + 11 = 41 (SVG user units).
 * Scale = svgW / 56,  so rendered bloom-bottom-offset = 41 × svgW / 56.
 */
const bloomBottomY = (yStr, svgW) => parseFloat(yStr) + 41 * (svgW || 56) / 56;

/** Cubic bezier point at parameter t */
const cbz = (p0, p1, p2, p3, t) => {
  const m = 1 - t;
  return m*m*m*p0 + 3*m*m*t*p1 + 3*m*t*t*p2 + t*t*t*p3;
};

/** Cubic bezier tangent at t */
const cbzT = (p0, p1, p2, p3, t) => {
  const m = 1 - t;
  return 3*(m*m*(p1-p0) + 2*m*t*(p2-p1) + t*t*(p3-p2));
};

// ─── Component ───────────────────────────────────────────────────────────────
/**
 * StemBundle — renders ALL flower stems + leaves in one SVG.
 *
 * Architecture:
 *  • viewBox "0 0 600 430"  (x unit = 1 % of container width; y unit = 1 px)
 *  • preserveAspectRatio="none" so x% positions stay correct on any screen
 *  • vectorEffect="non-scaling-stroke" keeps stroke width consistent on mobile
 *  • <clipPath> clips everything at y ≥ STEM_END_Y (inside vase)
 *  • The vase holder (z-index 20, top at y=342) covers the STEM_PAST_LIP portion
 *    → stems appear to enter and vanish inside the vase
 *
 * When a flower is picked:
 *  • its stem group transitions to opacity 0 (fade out)
 *  • the flower bloom (in Flower.jsx) flies upward simultaneously
 *  → feels like the whole flower + stem is pulled out
 */
export const StemBundle = ({ flowers, pickedIds }) => (
  <svg
    viewBox={`0 0 600 ${CONTAINER_H}`}
    preserveAspectRatio="none"
    style={{
      position    : 'absolute',
      top         : 0,
      left        : 0,
      width       : '100%',
      height      : '100%',
      pointerEvents: 'none',
      zIndex      : 3,               // behind all flowers (z 4–10)
    }}
  >
    <defs>
      {/*
        CRITICAL: This clipPath is what keeps every stem inside the vase.
        Rect covers the full container width (-10 → 610) and from
        above the top (-20) down to STEM_END_Y (inside the vase).
        Anything below STEM_END_Y is clipped = invisible.
        The vase body (z-index 20) then covers HOLDER_TOP_Y → STEM_END_Y,
        so no stem end is ever visible.
      */}
      <clipPath id="vaseStemClip">
        <rect x="-10" y="-20" width="620" height={STEM_END_Y + 20} />
      </clipPath>
    </defs>

    <g clipPath="url(#vaseStemClip)">
      {flowers.map((flower) => {
        const picked = pickedIds.includes(flower.id);

        /* ── Stem start: bloom bottom in container coordinates ── */
        const sx = toSvgX(flower.x);
        const sy = bloomBottomY(flower.y, flower.svgW);

        /* ── Stem end: vase mouth centre, past the lip ── */
        const ex = VASE_X;
        const ey = STEM_END_Y;

        /*
         * Cubic bezier control points.
         * cp1 drops straight down from the flower, staying near flower x.
         * cp2 approaches the vase centre from above.
         * This creates a graceful inward curve for side flowers and a
         * near-straight line for centre flowers — just like a real bouquet.
         */
        const cp1x = sx;
        const cp1y = sy + (ey - sy) * 0.42;
        const cp2x = sx + (ex - sx) * 0.50;
        const cp2y = ey - 28;

        /* ── Leaf 1 at t = 0.38 ── */
        const t1  = 0.38;
        const l1x = cbz(sx, cp1x, cp2x, ex, t1);
        const l1y = cbz(sy, cp1y, cp2y, ey, t1);
        const ang1 = Math.atan2(cbzT(sy, cp1y, cp2y, ey, t1),
                                cbzT(sx, cp1x, cp2x, ex, t1)) * 180 / Math.PI;
        const ls = flower.id % 2 === 0 ? 1 : -1; // leaf side

        /* ── Leaf 2 at t = 0.62 ── */
        const t2  = 0.62;
        const l2x = cbz(sx, cp1x, cp2x, ex, t2);
        const l2y = cbz(sy, cp1y, cp2y, ey, t2);
        const ang2 = Math.atan2(cbzT(sy, cp1y, cp2y, ey, t2),
                                cbzT(sx, cp1x, cp2x, ex, t2)) * 180 / Math.PI;

        return (
          <g
            key={flower.id}
            style={{ opacity: picked ? 0 : 1, transition: 'opacity 0.42s ease' }}
          >
            {/* Main stem curve */}
            <path
              d={`M ${sx} ${sy} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${ex} ${ey}`}
              stroke={STEM_C}
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Leaf 1 — upper, alternates left/right */}
            <g transform={`translate(${l1x} ${l1y}) rotate(${ang1 + ls * 46})`}>
              <ellipse cx={ls * 10} cy="0" rx="10" ry="4.5" fill={LEAF_C1} opacity="0.9" />
              <line x1="0" y1="0" x2={ls * 15} y2="-1.5"
                stroke={LEAF_C2} strokeWidth="0.8" opacity="0.6"
                vectorEffect="non-scaling-stroke" />
            </g>

            {/* Leaf 2 — lower, opposite side, smaller */}
            <g transform={`translate(${l2x} ${l2y}) rotate(${ang2 + (-ls) * 38})`}>
              <ellipse cx={-ls * 8} cy="0" rx="7.5" ry="3.5" fill={LEAF_C2} opacity="0.82" />
            </g>
          </g>
        );
      })}
    </g>
  </svg>
);

export default StemBundle;
