'use client';

import { useTransform, MotionValue, motion } from 'framer-motion';
import { forwardRef } from 'react';

// --- Work Bubble ---
interface WorkBubbleProps {
  number: number;
  progress: MotionValue<number>;
  phaseStart: number;
  phaseEnd: number;
}

const WorkBubble = forwardRef<HTMLDivElement, WorkBubbleProps>(
  ({ number, progress, phaseStart, phaseEnd }, ref) => {
    const degrees = useTransform(progress, [phaseStart, phaseEnd], [0, 180]);

    const conicGradient = useTransform(degrees, (d) => {
      const filled = '#91FF02';
      const empty = '#252B37';
      if (d <= 0)
        return `conic-gradient(from 0deg at 50% 50%, ${empty} 0deg, ${empty} 360deg)`;
      if (d >= 180)
        return `conic-gradient(from 0deg at 50% 50%, ${filled} 0deg, ${filled} 360deg)`;
      return `conic-gradient(from 0deg at 50% 50%, ${filled} 0deg, ${filled} ${d}deg, ${empty} ${d}deg, ${empty} ${360 - d}deg, ${filled} ${360 - d}deg, ${filled} 360deg)`;
    });

    return (
      <motion.div
        ref={ref}
        style={{ background: conicGradient }}
        className='
          relative z-10 shrink-0 flex items-center justify-center
          w-10 h-10 rounded-full
          md:w-12 md:h-12
        '
      >
        {/* Bubble inner */}
        <div
          className='
          absolute inset-[1.5px] rounded-full bg-base-black
          flex items-center justify-center
        '
        >
          {/* Bubble number */}
          <span className='text-sm font-bold text-primary-200 text-center md:text-md'>
            {number}
          </span>
        </div>
      </motion.div>
    );
  }
);

WorkBubble.displayName = 'WorkBubble';
export default WorkBubble;
