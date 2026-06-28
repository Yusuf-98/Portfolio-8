import type { Variants, Transition } from 'framer-motion';

const X = 120;
const Y = 60;
const OPACITY_DURATION = 0.9;
const Y_DURATION = 0.7;
const STAGGER = 0.15;

export const transition: Transition = {
  opacity: { duration: OPACITY_DURATION, ease: 'easeOut' },
  y: { duration: Y_DURATION, ease: 'easeOut' },
};

export const transitionDelayed = (delay: number): Transition => ({
  opacity: { duration: OPACITY_DURATION, ease: 'easeOut', delay },
  y: { duration: Y_DURATION, ease: 'easeOut', delay },
});

export const transitionXDelayed = (delay: number): Transition => ({
  opacity: { duration: OPACITY_DURATION, ease: 'easeOut', delay },
  x: { duration: Y_DURATION, ease: 'easeOut', delay },
});

export const transitionScaleDelayed = (delay: number): Transition => ({
  opacity: { duration: OPACITY_DURATION, ease: 'easeOut', delay },
  scale: { duration: Y_DURATION, ease: 'easeOut', delay },
  y: { duration: Y_DURATION, ease: 'easeOut', delay },
});

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: Y },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -Y },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -X },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: X },
  visible: { opacity: 1, x: 0 },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: Y },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export const staggerContainer = (delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER, delayChildren } },
});

export const staggerContainerDefault: Variants = staggerContainer(0);

export const viewportOnce = { once: true, amount: 0.2 } as const;
export const viewportEarly = { once: true, amount: 0.1 } as const;
export const viewportDeep = { once: true, amount: 0.4 } as const;

// backward compat
export const appleTransition = transition;
export const appleTransitionDelayed = transitionDelayed;
