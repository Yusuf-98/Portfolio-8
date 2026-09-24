'use client';

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

const SCORE_TEXT = 'Open to work';
const TAGS = ['Remote', 'Full-time', 'Contract'];
const CAPTION_TEXT = 'Worldwide, any time zone';
const BORDER_DRAW_DURATION = 700;
const CONTENT_START_DELAY = 0;
const TYPE_SPEED = 50;
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
  const [tagsVisible, setTagsVisible] = useState(0);
  const [captionText, setCaptionText] = useState('');
  const shimmerRef = useRef<HTMLSpanElement>(null);

  const triggerShimmer = () => {
    const el = shimmerRef.current;
    if (!el) return;
    el.classList.remove('card-shimmer-run');
    void el.offsetWidth;
    el.classList.add('card-shimmer-run');
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const addTimer = (fn: () => void, delay: number) => {
      const t = setTimeout(fn, delay);
      timers.push(t);
    };

    const startIntro = () => {
      setPhase('drawing');

      addTimer(() => {
        setPhase('typing');

        // --- Score ---
        let t = CONTENT_START_DELAY;
        for (let i = 1; i <= SCORE_TEXT.length; i++) {
          const captured = i;
          addTimer(() => setScoreText(SCORE_TEXT.slice(0, captured)), t);
          t += TYPE_SPEED + Math.random() * 30;
        }

        // --- Tags ---
        t += 200;
        for (let i = 1; i <= TAGS.length; i++) {
          const captured = i;
          addTimer(() => setTagsVisible(captured), t);
          t += 140;
        }

        // --- Caption ---
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

    // --- Shimmer loop ---
    const scheduleShimmer = (offset: number) => {
      const t = setTimeout(() => {
        triggerShimmer();
        scheduleShimmer(CORNER_GLOW_CYCLE_MS);
      }, offset);
      timers.push(t);
    };
    scheduleShimmer(introDelay + CORNER_GLOW_PEAK_MS);

    return () => timers.forEach(clearTimeout);
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
            stroke='rgba(145, 255, 2, 0.4)'
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

      {/* --- Corner glow --- */}
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

      {/* --- Card content --- */}
      {phase !== 'hidden' && (
        <>
          {/* Card shimmer */}
          <span ref={shimmerRef} aria-hidden className='card-shimmer-stripe' />

          {/* Score */}
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

          {/* Tags */}
          <div
            className='relative z-10 flex w-full items-center gap-1.5'
            style={{ height: 'clamp(24px, 14.857px + 1.1905vw, 32px)' }}
          >
            {TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                className='rounded-full border border-[#F3993F] bg-[#F3993F]/10 px-2.5 py-0.5 font-medium text-[#F3993F]'
                style={{ fontSize: 'clamp(11px, 9.2px + 0.24vw, 13px)' }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  i < tagsVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Caption */}
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
