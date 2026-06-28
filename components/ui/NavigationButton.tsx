'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

// --- Navigation Button ---
type NavigationButtonProps = {
  direction: 'left' | 'right';
  size?: 'sm' | 'lg';
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
};

export function NavigationButton({
  direction,
  size = 'lg',
  onClick,
  className,
  style,
}: NavigationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isLg = size === 'lg';
  const buttonSize = isLg ? 56 : 48;
  const arrowSize = isLg ? 24 : 21;
  const borderColor = isHovered ? '#91FF02' : '#252B37';

  // Pilih PNG berdasarkan hover state dan direction
  // Default (neutral-800): arrow-left-*.png
  // Hover (primary-200): right-arrow-*.png
  const suffix = isLg ? 'large' : 'small';
  const defaultSrc = `/icons/arrow-left-${suffix}.png`;
  const hoverSrc = `/icons/right-arrow-${suffix}.png`;

  // Kiri: default=normal, hover=normal (keduanya sudah arrow kiri / kanan yang di-flip)
  // Kanan: default=scaleX(-1), hover=normal
  const src = isHovered ? hoverSrc : defaultSrc;
  const shouldFlip = direction === 'right' ? !isHovered : isHovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'flex items-center justify-center shrink-0 rounded-full cursor-pointer',
        className
      )}
      style={{
        width: buttonSize,
        height: buttonSize,
        border: `2px solid ${borderColor}`,
        transition: 'border-color 200ms',
        ...style,
      }}
    >
      {/* Arrow icon */}
      <div
        className='relative shrink-0'
        style={{
          width: arrowSize,
          height: arrowSize,
          transform: shouldFlip ? 'scaleX(-1)' : 'none',
          transition: 'transform 0ms',
        }}
      >
        <Image
          src={src}
          alt={direction === 'left' ? 'Previous' : 'Next'}
          fill
          sizes={`${arrowSize}px`}
          className='object-contain'
        />
      </div>
    </button>
  );
}
