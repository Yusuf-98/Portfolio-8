'use client';

import { motion } from 'framer-motion';

// --- RotatingBorder ---
// Border gradient yang berputar melingkari elemen
// Pakai sebagai child pertama di dalam parent yang punya position: relative
interface RotatingBorderProps {
  duration?: number;
  color1?: string;
  color2?: string;
  borderRadius?: string;
  borderWidth?: number;
}

export function RotatingBorder({
  duration = 4,
  color1 = '#91FF02',
  color2 = '#D5FF40',
  borderRadius = '1rem',
  borderWidth = 1,
}: RotatingBorderProps) {
  return (
    <div
      className='pointer-events-none absolute overflow-hidden'
      style={{ inset: -borderWidth, borderRadius }}
      aria-hidden
    >
      <motion.div
        className='absolute'
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 150deg, ${color1} 180deg, ${color2} 200deg, transparent 210deg, transparent 360deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      />
      <div
        className='absolute bg-base-black'
        style={{
          inset: borderWidth,
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      />
    </div>
  );
}
