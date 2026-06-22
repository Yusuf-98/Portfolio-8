'use client';

import { useRef, useState } from 'react';
import { useAnimationFrame } from 'framer-motion';
import {
  HELM_VIEWBOX,
  HELM_LATITUDE_LINES,
  HELM_MERIDIAN_LINES,
  HELM_OUTLINE_LEFT,
  HELM_OUTLINE_RIGHT,
  HELM_Y_TOP,
  HELM_Y_BOTTOM,
  HELM_N_BANDS,
} from './helmGeometry';

// --- Helm Wireframe Overlay (sketsa-25, v3) ---
// Kontur mengikuti siluet kepala asli. Animasi BAND-SCANNING: dome SELALU full
// dari ubun-ubun s/d bawah dagu, yang bergerak cuma opacity per-band (termasuk
// outline kiri-kanan ikut tersegmentasi, bukan cuma garis dalam).
// 1 band di posisi "peak" = opacity 100%, tetangga (jarak 1) = 50%, sisanya 0%.

type HelmOverlayProps = {
  className?: string;
  cycleDurationMs?: number;
};

const HOLOGRAM = '#414651';

function pointsToPath(points: [number, number][]) {
  return points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
}

function bandForLevel(level: number) {
  return Math.min(HELM_N_BANDS - 1, Math.floor(level * HELM_N_BANDS));
}

function bandForY(y: number) {
  const level = (y - HELM_Y_TOP) / (HELM_Y_BOTTOM - HELM_Y_TOP);
  return bandForLevel(Math.max(0, Math.min(1, level)));
}

function opacityForBand(bandIdx: number, peak: number) {
  return Math.max(0, 1 - 0.5 * Math.abs(bandIdx - peak));
}

function segmentByBand(points: [number, number][], peak: number) {
  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const midY = (y1 + y2) / 2;
    const band = bandForY(midY);
    const op = opacityForBand(band, peak);
    if (op <= 0.02) continue;
    segments.push({
      d: `M${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`,
      opacity: op,
      key: `${i}`,
    });
  }
  return segments;
}

export default function HelmOverlay({
  className,
  cycleDurationMs = 3600,
}: HelmOverlayProps) {
  const [peak, setPeak] = useState(-1);
  const startRef = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (startRef.current === null) startRef.current = time;
    const elapsed = (time - startRef.current) % cycleDurationMs;
    const progress = elapsed / cycleDurationMs;
    setPeak(-1 + progress * (HELM_N_BANDS - -1));
  });

  return (
    <svg
      viewBox={`0 0 ${HELM_VIEWBOX.width} ${HELM_VIEWBOX.height}`}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      preserveAspectRatio='xMidYMid meet'
    >
      {/* --- Latitude rings (horizontal-ish) --- */}
      {HELM_LATITUDE_LINES.map((line, idx) => {
        const band = bandForLevel(line.level);
        const op = opacityForBand(band, peak);
        if (op <= 0.02) return null;
        return (
          <path
            key={`lat-${idx}`}
            d={pointsToPath(line.points)}
            stroke={HOLOGRAM}
            strokeWidth={1.5}
            fill='none'
            opacity={op}
            strokeLinecap='round'
          />
        );
      })}

      {/* --- Meridian lines (vertical-ish), segmented by band along length --- */}
      {HELM_MERIDIAN_LINES.map((line, lineIdx) =>
        segmentByBand(line.points, peak).map((seg) => (
          <path
            key={`mer-${lineIdx}-${seg.key}`}
            d={seg.d}
            stroke={HOLOGRAM}
            strokeWidth={line.isRim ? 3 : 1.5}
            fill='none'
            opacity={seg.opacity}
            strokeLinecap='round'
          />
        ))
      )}

      {/* --- Outline left & right, ALSO segmented by band (per user requirement) --- */}
      {segmentByBand(HELM_OUTLINE_LEFT, peak).map((seg) => (
        <path
          key={`out-l-${seg.key}`}
          d={seg.d}
          stroke={HOLOGRAM}
          strokeWidth={3}
          fill='none'
          opacity={seg.opacity}
          strokeLinecap='round'
        />
      ))}
      {segmentByBand(HELM_OUTLINE_RIGHT, peak).map((seg) => (
        <path
          key={`out-r-${seg.key}`}
          d={seg.d}
          stroke={HOLOGRAM}
          strokeWidth={3}
          fill='none'
          opacity={seg.opacity}
          strokeLinecap='round'
        />
      ))}
    </svg>
  );
}
