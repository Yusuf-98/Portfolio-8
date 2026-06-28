'use client';

import Image from 'next/image';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CornerGlow } from '@/lib/animations/corner-glow';

// --- Rating card ---
type RatingCardProps = {
  className?: string;
  style?: CSSProperties;
  introDelay?: number;
};

const SCORE_TEXT = '5.0';
const CAPTION_TEXT = 'Many Client Trust with me';
const STAR_COUNT = 5;
const BORDER_DRAW_DURATION = 1200;
const CONTENT_START_DELAY = 200;
const TYPE_SPEED = 90;
// CornerGlow: duration 2s, peak di detik ke-2, total siklus 4s
const CORNER_GLOW_PEAK_MS = 2000;
const CORNER_GLOW_CYCLE_MS = 4000;

export function RatingCard({
  className,
  style,
  introDelay = 0,
}: RatingCardProps) {
  const [phase, setPhase] = useState<'hidden' | 'drawing' | 'typing' | 'done'>(
    'hidden'
  );
  const [scoreText, setScoreText] = useState('');
  const [starsVisible, setStarsVisible] = useState(0);
  const [captionText, setCaptionText] = useState('');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  const triggerShimmer = () => {
    const el = shimmerRef.current;
    if (!el) return;
    el.classList.remove('card-shimmer-run');
    void el.offsetWidth;
    el.classList.add('card-shimmer-run');
  };

  const addTimer = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timersRef.current.push(t);
  };

  useEffect(() => {
    const startIntro = () => {
      setPhase('drawing');

      addTimer(() => {
        setPhase('typing');

        // --- Ketik score ---
        let t = CONTENT_START_DELAY;
        for (let i = 1; i <= SCORE_TEXT.length; i++) {
          const captured = i;
          addTimer(() => setScoreText(SCORE_TEXT.slice(0, captured)), t);
          t += TYPE_SPEED + Math.random() * 30;
        }

        // --- Bintang satu per satu ---
        t += 200;
        for (let i = 1; i <= STAR_COUNT; i++) {
          const captured = i;
          addTimer(() => setStarsVisible(captured), t);
          t += 140;
        }

        // --- Ketik caption ---
        t += 300;
        for (let i = 1; i <= CAPTION_TEXT.length; i++) {
          const captured = i;
          addTimer(() => setCaptionText(CAPTION_TEXT.slice(0, captured)), t);
          t += TYPE_SPEED + Math.random() * 25;
        }

        addTimer(() => setPhase('done'), t + 200);
      }, BORDER_DRAW_DURATION + CONTENT_START_DELAY);
    };

    addTimer(startIntro, introDelay);

    // --- Shimmer loop sync dengan peak CornerGlow ---
    const scheduleShimmer = (offset: number) => {
      const t = setTimeout(() => {
        triggerShimmer();
        scheduleShimmer(CORNER_GLOW_CYCLE_MS);
      }, offset);
      timersRef.current.push(t);
    };
    scheduleShimmer(introDelay + CORNER_GLOW_PEAK_MS);

    return () => timersRef.current.forEach(clearTimeout);
  }, [introDelay]);

  const isTyping = phase === 'typing';

  return (
    <div
      className={cn(
        'absolute flex flex-col items-start gap-2 rounded-2xl md:rounded-[20px] overflow-hidden',
        phase === 'hidden'
          ? 'bg-transparent'
          : 'bg-base-black border border-neutral-800',
        className
      )}
      style={style}
    >
      {/* --- SVG border draw intro --- */}
      {(phase === 'drawing' || phase === 'typing') && (
        <svg
          className='pointer-events-none absolute inset-0 overflow-visible'
          style={{ width: '100%', height: '100%' }}
        >
          <rect
            x='0.5'
            y='0.5'
            width='99%'
            height='99%'
            rx='19.5'
            ry='19.5'
            fill='none'
            stroke='#91FF02'
            strokeWidth='1'
            pathLength='1'
            strokeDasharray='1'
            strokeDashoffset='1'
            style={{
              animation: `draw-border-path ${BORDER_DRAW_DURATION}ms cubic-bezier(0.4,0,0.2,1) forwards`,
            }}
          />
        </svg>
      )}

      {/* --- Corner glow pojok kiri atas --- */}
      {phase !== 'hidden' && (
        <CornerGlow
          color='#91FF02'
          duration={3}
          delay={0}
          opacity={0.4}
          borderRadius='20px'
          innerBorderRadius='18px'
        />
      )}

      {/* --- Konten card --- */}
      {phase !== 'hidden' && (
        <>
          {/* Card shimmer */}
          <span ref={shimmerRef} aria-hidden className='card-shimmer-stripe' />

          {/* Rating score */}
          <p
            className='relative z-10 font-bold text-neutral-25 min-h-[1.5em]'
            style={{ fontSize: 'clamp(24px, 5.714px + 2.3810vw, 40px)' }}
          >
            {scoreText}
            {isTyping && scoreText.length < SCORE_TEXT.length && (
              <span
                className='inline-block w-px bg-primary-200 align-middle animate-blink ml-0.5'
                style={{ height: '0.9em' }}
              />
            )}
          </p>

          {/* Star icons */}
          <div className='relative z-10 flex w-full gap-0.5'>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className='relative shrink-0'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  i < starsVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  width: 'clamp(24px, 14.857px + 1.1905vw, 32px)',
                  height: 'clamp(24px, 14.857px + 1.1905vw, 32px)',
                }}
              >
                <Image
                  src='/icons/star-desktop.png'
                  alt=''
                  fill
                  sizes='32px'
                  className='object-contain'
                />
              </motion.span>
            ))}
          </div>

          {/* Rating caption */}
          <p
            className='relative z-10 font-semibold text-neutral-25 min-h-[1.5em]'
            style={{ fontSize: 'clamp(16px, 11.429px + 0.5952vw, 20px)' }}
          >
            {captionText}
            {isTyping &&
              captionText.length > 0 &&
              captionText.length < CAPTION_TEXT.length && (
                <span
                  className='inline-block w-px bg-primary-200 align-middle animate-blink ml-0.5'
                  style={{ height: '0.85em' }}
                />
              )}
          </p>
        </>
      )}
    </div>
  );
}
