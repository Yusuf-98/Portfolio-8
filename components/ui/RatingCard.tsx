import Image from 'next/image';
import { type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

// --- Rating card ---
type RatingCardProps = {
  className?: string;
  style?: CSSProperties;
};

export function RatingCard({ className, style }: RatingCardProps) {
  return (
    <div
      className={cn(
        'absolute flex flex-col items-start gap-2 rounded-2xl border border-neutral-800 bg-base-black md:rounded-[20px]',
        className
      )}
      style={style}
    >
      {/* Rating score */}
      <p
        className='font-bold text-neutral-25'
        style={{ fontSize: 'clamp(24px, 5.714px + 2.3810vw, 40px)' }}
      >
        5.0
      </p>

      {/* Star icons */}
      <div className='flex w-full'>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className='relative shrink-0'
            style={{
              width: 'clamp(24px, 14.857px + 1.1905vw, 32px)',
              height: 'clamp(24px, 14.857px + 1.1905vw, 32px)',
            }}
          >
            <Image
              src='/icons/star-desktop.png'
              alt=''
              fill
              className='object-contain'
            />
          </span>
        ))}
      </div>

      {/* Rating caption */}
      <p
        className='font-semibold text-neutral-25'
        style={{ fontSize: 'clamp(16px, 11.429px + 0.5952vw, 20px)' }}
      >
        Many Client Trust with me
      </p>
    </div>
  );
}
