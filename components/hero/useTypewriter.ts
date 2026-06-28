'use client';

import { useEffect, useRef, useState } from 'react';

// --- useTypewriter hook ---
interface UseTypewriterOptions {
  text: string;
  startDelay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  loop?: boolean;
  onComplete?: () => void;
}

interface UseTypewriterReturn {
  displayed: string;
  isDone: boolean;
}

export function useTypewriter({
  text,
  startDelay = 0,
  typeSpeed = 95,
  deleteSpeed = 55,
  pauseAfterType = 1400,
  pauseAfterDelete = 400,
  loop = false,
  onComplete,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let started = false;

    function tick() {
      if (!started) {
        started = true;
        timerRef.current = setTimeout(tick, startDelay);
        return;
      }

      if (!isDeleting) {
        // --- Fase mengetik ---
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index === text.length) {
          // Selesai mengetik
          if (!loop) {
            setIsDone(true);
            onCompleteRef.current?.();
            return;
          }
          // Loop: jeda lalu hapus
          timerRef.current = setTimeout(() => {
            isDeleting = true;
            tick();
          }, pauseAfterType);
          return;
        }
      } else {
        // --- Fase hapus ---
        index -= 1;
        setDisplayed(text.slice(0, index));

        if (index === 0) {
          // Selesai hapus
          isDeleting = false;
          timerRef.current = setTimeout(tick, pauseAfterDelete);
          return;
        }
      }

      // Variasi kecepatan natural
      const jitter = Math.random() * 40 - 20;
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timerRef.current = setTimeout(tick, speed + jitter);
    }

    timerRef.current = setTimeout(tick, 0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    text,
    startDelay,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
    loop,
  ]);

  return { displayed, isDone };
}

// --- useTypewriterSequence hook ---
interface UseTypewriterSequenceOptions {
  words: string[];
  startDelay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}

export function useTypewriterSequence({
  words,
  startDelay = 0,
  typeSpeed = 95,
  deleteSpeed = 55,
  pauseAfterType = 1600,
  pauseAfterDelete = 400,
}: UseTypewriterSequenceOptions): string {
  const [displayed, setDisplayed] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (words.length === 0) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let started = false;

    function tick() {
      if (!started) {
        started = true;
        timerRef.current = setTimeout(tick, startDelay);
        return;
      }

      const currentWord = words[wordIndex];

      if (!isDeleting) {
        charIndex += 1;
        setDisplayed(currentWord.slice(0, charIndex));

        if (charIndex === currentWord.length) {
          timerRef.current = setTimeout(() => {
            isDeleting = true;
            tick();
          }, pauseAfterType);
          return;
        }
      } else {
        charIndex -= 1;
        setDisplayed(currentWord.slice(0, charIndex));

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timerRef.current = setTimeout(tick, pauseAfterDelete);
          return;
        }
      }

      const jitter = Math.random() * 35 - 17;
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timerRef.current = setTimeout(tick, speed + jitter);
    }

    timerRef.current = setTimeout(tick, 0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    words,
    startDelay,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return displayed;
}
