'use client';

import { useInView } from 'framer-motion';
import {
  useRef,
  useState,
  useEffect,
  ElementType,
  ComponentPropsWithRef,
} from 'react';
import { cn } from '@/lib/utils';

// --- TypewriterText component ---
interface TypewriterTextProps {
  text: string;
  /** Tag HTML yang dirender, default 'p' */
  tag?: ElementType;
  /** Kecepatan ketik per karakter (ms), default 65 */
  speed?: number;
  /** Delay sebelum mulai setelah masuk viewport (ms), default 0 */
  delay?: number;
  /** Threshold viewport sebelum animasi mulai (0-1), default 0.5 */
  threshold?: number;
  /** Hanya animasi sekali, tidak repeat saat scroll ulang, default true */
  once?: boolean;
  className?: string;
  /** Warna cursor, default warna text yang dipakai */
  cursorColor?: string;
  /** Tampilkan cursor saat mengetik, default true */
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  tag: Tag = 'p',
  speed = 65,
  delay = 0,
  threshold = 0.5,
  once = true,
  className,
  cursorColor,
  showCursor = true,
}: TypewriterTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: threshold,
  });

  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    let index = 0;

    const tick = () => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index === text.length) {
        setIsDone(true);
        return;
      }

      // Variasi kecepatan natural
      const jitter = Math.random() * 30 - 15;
      timerRef.current = setTimeout(tick, speed + jitter);
    };

    timerRef.current = setTimeout(tick, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isInView, text, speed, delay]);

  const cursorStyle = cursorColor ? { backgroundColor: cursorColor } : {};

  // Cast ke any untuk menghindari error TypeScript pada dynamic tag dengan ref
  const DynamicTag = Tag as React.ComponentType<ComponentPropsWithRef<'div'>>;

  return (
    <DynamicTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
    >
      {displayed}
      {showCursor && !isDone && displayed.length > 0 && (
        <span
          className='inline-block w-px align-middle animate-blink ml-0.5'
          style={{ height: '0.85em', ...cursorStyle }}
        />
      )}
    </DynamicTag>
  );
}
