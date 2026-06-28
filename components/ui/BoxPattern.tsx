'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// --- Box pattern decoration ---
type BoxPatternProps = {
  rotate?: 0 | 90 | 180 | 270;
  className?: string;
  style?: React.CSSProperties;
};

const rotateClass: Record<number, string> = {
  0: 'rotate-0',
  90: 'rotate-90',
  180: 'rotate-180',
  270: 'rotate-270',
};

const isSwapped = (rotate: number) => rotate === 90 || rotate === 270;

export const BoxPattern = forwardRef<HTMLDivElement, BoxPatternProps>(
  ({ rotate = 0, className, style }, ref) => {
    const swapped = isSwapped(rotate);

    return (
      <div
        ref={ref}
        className={cn(
          'z-50 flex items-center justify-center',
          swapped
            ? 'h-[103.5px] w-[69px] md:h-[138px] md:w-[92px]'
            : 'h-[69px] w-[103.5px] md:h-[92px] md:w-[138px]',
          className
        )}
        style={style}
      >
        <div
          className={cn(
            'grid h-[69px] w-[103.5px] shrink-0 grid-cols-3 grid-rows-2 md:h-[92px] md:w-[138px]',
            rotateClass[rotate]
          )}
        >
          {/* Box */}
          <div className='col-start-1 row-start-2 h-full w-full bg-primary-400' />
          {/* Box */}
          <div className='col-start-3 row-start-2 h-full w-full bg-primary-400' />
          {/* Box */}
          <div className='col-start-2 row-start-1 h-full w-full bg-primary-400' />
        </div>
      </div>
    );
  }
);

BoxPattern.displayName = 'BoxPattern';
