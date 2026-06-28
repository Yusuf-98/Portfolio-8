'use client';

import { motion } from 'framer-motion';

// --- CometLine ---
interface CometLineProps {
  direction: 'vertical' | 'horizontal';
  length: number;
  delay?: number;
  duration?: number;
  color?: string;
  cometSize?: number;
  opacity?: number;
}

export function CometLine({
  direction,
  length,
  delay = 0,
  duration = 3,
  color = '#91FF02',
  cometSize = 120,
  opacity = 1,
}: CometLineProps) {
  const isVertical = direction === 'vertical';

  // Durasi menggambar garis neutral-800
  const drawDuration = isVertical ? length / 300 : length / 400;

  // Gradient comet loop (tetes air)
  const cometGradient = isVertical
    ? `linear-gradient(to bottom, transparent 0%, transparent 10%, ${color}26 30%, ${color}b3 70%, ${color} 100%)`
    : `linear-gradient(to right, transparent 0%, transparent 10%, ${color}26 30%, ${color}b3 70%, ${color} 100%)`;

  return (
    <>
      {/* Garis neutral-800 — digambar dari 0 ke 100% sekali via clipPath */}
      <motion.div
        className='absolute inset-0 pointer-events-none bg-neutral-800'
        initial={
          isVertical
            ? { clipPath: 'inset(0 0 100% 0)' }
            : { clipPath: 'inset(0 100% 0 0)' }
        }
        animate={
          isVertical
            ? { clipPath: 'inset(0 0 0% 0)' }
            : { clipPath: 'inset(0 0% 0 0)' }
        }
        transition={{
          duration: drawDuration,
          ease: 'easeInOut',
          delay,
        }}
      />

      {/* Comet loop — mulai setelah garis selesai tergambar */}
      <motion.div
        className='absolute pointer-events-none'
        style={{
          opacity,
          ...(isVertical
            ? { width: '100%', height: cometSize, background: cometGradient }
            : { height: '100%', width: cometSize, background: cometGradient }),
        }}
        animate={
          isVertical ? { y: [-cometSize, length] } : { x: [-cometSize, length] }
        }
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
          delay: delay + drawDuration,
          repeatDelay: 0,
        }}
      />
    </>
  );
}
