'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  fadeInUp,
  fadeInDown,
  fadeInScale,
  transitionDelayed,
  transitionScaleDelayed,
} from '@/lib/animations/staggered-item';
import { Container } from '../layout/Container';
import HelmOverlay from '../hero/HelmOverlay';
import { BoxPattern } from '../ui/BoxPattern';
import { Button } from '../ui/Button';
import { RatingCard } from '../ui/RatingCard';
import { CometLine } from '../ui/CometLine';
import { usePhotoReveal } from '../hero/usePhotoReveal';
import { useTypewriterSequence } from '../hero/useTypewriter';

// --- Konstanta dimensi foto ---
const MOBILE_W = 360;
const MOBILE_H = 470;
const DESKTOP_W = 660;
const DESKTOP_H = 873;

const GREETING_WORDS = [
  'Software Engineer',
  'Frontend Developer',
  'App Developer',
  'React Expert',
];

const TITLE_TEXT = 'Building fast & interactive web experiences.';
const SUBTITLE_TEXT =
  'Bridging creativity and functionality to deliver stunning, user-friendly web applications';

// --- Delay urutan muncul ---
const D_GREETING = 0.2;
const D_TITLE = 0.4;
const D_SUBTITLE = 0.6;
const D_BUTTON = 0.8;
const D_IMAGE = 1.0;
const D_RATING = (D_IMAGE + 0.3) * 1000;
const D_BOXPATTERN = D_IMAGE + 0.6;
const D_HELM = D_IMAGE + 0.6;

const renderTitle = (text: string) => {
  const keyword = 'interactive';
  const idx = text.toLowerCase().indexOf(keyword);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className='text-primary-200'>
        {text.slice(idx, idx + keyword.length)}
      </span>
      {text.slice(idx + keyword.length)}
    </>
  );
};

export function Hero() {
  const mobile = usePhotoReveal({
    src: '/images/profile-mobile.png',
    width: MOBILE_W,
    height: MOBILE_H,
  });

  const desktop = usePhotoReveal({
    src: '/images/profile-desktop.png',
    width: DESKTOP_W,
    height: DESKTOP_H,
  });

  const {
    wrapperRef: mobileWrapperRef,
    grayCanvasRef: mobileGrayCanvasRef,
    colorCanvasRef: mobileColorCanvasRef,
    maskRef: mobileMaskRef,
    handleMouseMove: mobileHandleMouseMove,
    handleMouseEnter: mobileHandleMouseEnter,
    handleMouseLeave: mobileHandleMouseLeave,
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
  } = mobile;

  // --- Mobile "tap to lock" reveal ---
  const [mobileLocked, setMobileLocked] = useState(false);

  const lockMobileReveal = () => {
    setMobileLocked(true);
    handleTouchStart(); // batalkan fade yang mungkin masih berjalan
  };

  const unlockMobileReveal = () => {
    setMobileLocked(false);
    handleTouchEnd(); // fade balik ke grayscale, scroll aktif lagi
  };

  const {
    wrapperRef: desktopWrapperRef,
    grayCanvasRef: desktopGrayCanvasRef,
    colorCanvasRef: desktopColorCanvasRef,
    maskRef: desktopMaskRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = desktop;

  const greetingWord = useTypewriterSequence({
    words: GREETING_WORDS,
    startDelay: 1200,
    typeSpeed: 95,
    deleteSpeed: 60,
    pauseAfterType: 1800,
    pauseAfterDelete: 400,
  });

  return (
    <section
      id='hero'
      className='relative -mt-20 w-full max-w-360 mx-auto bg-base-black'
    >
      {/* Vertical lines - desktop */}
      <div
        className='absolute top-0 bottom-0 w-px hidden md:block overflow-hidden'
        style={{ left: '26%' }}
      >
        <CometLine direction='vertical' length={2000} delay={0} duration={5} />
      </div>
      <div
        className='absolute top-0 bottom-0 w-px hidden md:block overflow-hidden'
        style={{ left: '49%' }}
      >
        <CometLine
          direction='vertical'
          length={2000}
          delay={0.8}
          duration={5}
        />
      </div>

      {/* Vertical lines - mobile */}
      <div
        className='absolute w-px md:hidden overflow-hidden'
        style={{ left: '75%', top: 81, height: 482 }}
      >
        <CometLine direction='vertical' length={482} delay={0} duration={5} />
      </div>
      <div
        className='absolute w-px md:hidden overflow-hidden'
        style={{ left: '51%', top: -12, height: 563 }}
      >
        <CometLine direction='vertical' length={563} delay={0.5} duration={5} />
      </div>

      {/* Horizontal line - desktop only */}
      <div
        className='absolute bottom-0 h-px hidden md:block overflow-hidden'
        style={{ left: 0, right: 0 }}
      >
        <CometLine
          direction='horizontal'
          length={1440}
          delay={0.4}
          duration={5}
        />
      </div>

      {/* Box pattern decoration */}
      <motion.div
        className='absolute bottom-56 md:bottom-0 h-17.25 w-[103.5px] md:h-23 md:w-34.5 z-50'
        style={{ left: 0 }}
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        transition={transitionDelayed(D_BOXPATTERN)}
      >
        <BoxPattern rotate={0} />
      </motion.div>

      {/* Mobile hint: tap to lock / back to scroll — sebaris dengan box pattern */}
      <button
        type='button'
        onClick={mobileLocked ? unlockMobileReveal : lockMobileReveal}
        className='absolute bottom-56 right-4 z-50 flex items-center gap-3 md:hidden'
      >
        <AnimatePresence mode='wait' initial={false}>
          <motion.span
            key={mobileLocked ? 'locked-label' : 'unlocked-label'}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.2 }}
            className='text-[11px] font-semibold uppercase tracking-[0.14em] text-white'
          >
            {mobileLocked ? 'Back to scroll' : 'Tap to lock'}
          </motion.span>
        </AnimatePresence>

        <span className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-200 text-base-black'>
          <AnimatePresence mode='wait' initial={false}>
            {mobileLocked ? (
              <motion.svg
                key='x'
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.18 }}
                width='32'
                height='32'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M6 6l12 12M18 6L6 18' />
              </motion.svg>
            ) : (
              <motion.svg
                key='hand'
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                width='32'
                height='32'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.6'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M8 13V5.5a1.75 1.75 0 0 1 3.5 0V11' />
                <path d='M11.5 11V9.25a1.75 1.75 0 0 1 3.5 0V11' />
                <path d='M15 11v-.75a1.75 1.75 0 0 1 3.5 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.6-2.15l-3-3.6a1.75 1.75 0 0 1 2.7-2.2L8 12.5' />
                <path d='M4.5 4.5 3 3M9 3.5 9.5 2M14.5 4.5 16 3' />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
      </button>

      <Container className='relative'>
        {/* Hero content */}
        <div className='relative md:max-w-90.25 z-30 flex flex-col items-center pb-7xl md:items-start md:pb-10xl md:text-left pt-[clamp(7.5rem,18.67vw,13.81rem)]'>
          {/* Hero text content */}
          <div className='flex w-full md:w-[clamp(22.56rem,56.04vw,50.44rem)] flex-col items-start md:text-left pb-5xl'>
            {/* Hero greeting */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
              transition={transitionDelayed(D_GREETING)}
              className='flex items-center gap-md lg:gap-xl'
            >
              <span className='h-px bg-neutral-25 w-5.25 lg:w-[clamp(1.31rem,7.92vw,7.13rem)]' />
              <p className='text-md font-medium text-neutral-25 lg:text-xl'>
                Hi, I am yusuf Arif{' '}
                <span className='inline-block min-w-[1ch]'>
                  {greetingWord}
                  <span
                    className='inline-block w-px bg-neutral-25 align-middle animate-blink ml-0.5'
                    style={{ height: '0.85em' }}
                  />
                </span>
              </p>
            </motion.div>

            {/* Hero title */}
            <motion.h1
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
              transition={transitionDelayed(D_TITLE)}
              className='mt-xl font-extrabold uppercase text-base-white'
              style={{
                fontSize: 'clamp(2.25rem, 5.56vw, 5rem)',
                lineHeight: 'clamp(3rem, 6.76vw, 5rem)',
              }}
            >
              {renderTitle(TITLE_TEXT)}
            </motion.h1>

            {/* Hero subtitle */}
            <motion.p
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
              transition={transitionDelayed(D_SUBTITLE)}
              className='mt-xl font-medium text-lg text-neutral-400 md:max-w-149.25 md:text-xl'
            >
              {SUBTITLE_TEXT}
            </motion.p>

            {/* Hero button */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
              transition={transitionDelayed(D_BUTTON)}
              className='mt-10 md:mt-[clamp(2.5rem,0.1925rem+4.808vw,3.75rem)] w-full md:w-75'
            >
              <Link href='#contact'>
                <Button className='w-full uppercase cursor-pointer'>
                  Hire Me
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Profile photo - mobile */}
          <motion.div
            variants={fadeInScale}
            initial='hidden'
            animate='visible'
            transition={transitionScaleDelayed(D_IMAGE)}
            className='relative mt-2 pt-3 md:mt-7xl aspect-393/513 w-full min-w-98.25 md:hidden overflow-hidden'
            onMouseMove={mobileHandleMouseMove}
            onMouseEnter={mobileHandleMouseEnter}
            onMouseLeave={mobileHandleMouseLeave}
            onClick={mobileLocked ? undefined : lockMobileReveal}
            onTouchMove={mobileLocked ? handleTouchMove : undefined}
            onTouchStart={mobileLocked ? handleTouchStart : undefined}
            style={{
              isolation: 'isolate',
              // saat locked, matikan scroll browser di area foto -> drag = melukis
              touchAction: mobileLocked ? 'none' : 'pan-y',
            }}
          >
            {/* Lime background block */}
            <div className='absolute right-0 top-[0%] h-[90.8%] w-[48%] bg-primary-200' />

            {/* Wrapper A: grayscale canvas + mix-blend-luminosity */}
            <div
              ref={mobileWrapperRef}
              className='absolute left-0 top-0 h-[98.1%] w-[98.5%] mix-blend-luminosity pointer-events-none'
              style={{ transform: 'rotate(5deg)' }}
            >
              <canvas
                ref={mobileMaskRef}
                width={MOBILE_W}
                height={MOBILE_H}
                className='hidden'
              />
              <canvas
                ref={mobileGrayCanvasRef}
                width={MOBILE_W}
                height={MOBILE_H}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Black fade gradient */}
            <div
              className='absolute w-full inset-0'
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, #000000 90%)',
              }}
            />

            {/* Wrapper B: color reveal canvas */}
            <div
              className='absolute left-0 top-0 h-[98.1%] w-[98.5%] pointer-events-none'
              style={{ transform: 'rotate(5deg)' }}
            >
              <canvas
                ref={mobileColorCanvasRef}
                width={MOBILE_W}
                height={MOBILE_H}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Helm wireframe overlay */}
            <motion.div
              variants={fadeInDown}
              initial='hidden'
              animate='visible'
              transition={transitionDelayed(D_HELM)}
              className='absolute inset-0'
            >
              <HelmOverlay />
            </motion.div>

            {/* Black triangle masking the top-left corner of the photo */}
            <div
              className='absolute inset-0 z-20 bg-base-black pointer-events-none'
              style={{
                // 1st %: seberapa jauh alas menjulur ke kanan
                // 2nd %: seberapa dalam sisi miring turun memotong pojok
                clipPath: 'polygon(0 0, 25% 0, 0 35%)',
              }}
            />

            {/* Black triangle masking the bottom-right corner of the photo */}
            <div
              className='absolute inset-0 z-20 bg-base-black pointer-events-none'
              style={{
                // 1st %: seberapa jauh alas menjulur ke kiri di sepanjang tepi bawah
                // 2nd %: seberapa tinggi sisi miring naik menutup pojok kanan
                clipPath: 'polygon(100% 100%, 80% 100%, 100% 10%)',
              }}
            />

          </motion.div>
        </div>

        {/* Rating card */}
        <RatingCard
          introDelay={D_RATING}
          className='left-5 md:left-[67%] z-40 bottom-19 md:top-[clamp(416.38px,192.814px+29.1101vw,612px)] w-88 md:w-[clamp(240px,67.429px+17.2619vw,316px)]'
          style={{
            height: 'clamp(138px, 92.286px + 5.9524vw, 178px)',
            padding: 'clamp(16px, 11.429px + 0.5952vw, 20px)',
          }}
        />
      </Container>

      {/* Profile photo - desktop */}
      <motion.div
        variants={fadeInScale}
        initial='hidden'
        animate='visible'
        transition={transitionScaleDelayed(D_IMAGE)}
        className='absolute top-0 z-10 hidden md:block overflow-hidden'
        style={{
          right: '0',
          width: 'clamp(24.56rem, 45.84vw, 41.26rem)',
          height: 'clamp(32.51rem, 60.67vw, 54.60rem)',
          isolation: 'isolate',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Lime background block */}
        <div className='absolute left-[52.1%] top-0 h-[98.9%] w-[47.9%] bg-primary-200 pointer-events-none' />

        {/* Wrapper A: grayscale canvas + mix-blend-luminosity */}
        <div
          ref={desktopWrapperRef}
          className='absolute h-[98.9%] w-[98.2%] mix-blend-luminosity pointer-events-none'
          style={{ transform: 'rotate(5deg)' }}
        >
          <canvas
            ref={desktopMaskRef}
            width={DESKTOP_W}
            height={DESKTOP_H}
            className='hidden'
          />
          <canvas
            ref={desktopGrayCanvasRef}
            width={DESKTOP_W}
            height={DESKTOP_H}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Black fade gradient */}
        <div
          className='absolute pointer-events-none'
          style={{
            inset: '-20px',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) -92.59%, #000000 88.93%)',
          }}
        />

        {/* Wrapper B: color reveal canvas */}
        <div
          className='absolute h-[98.9%] w-[98.2%] pointer-events-none'
          style={{ transform: 'rotate(5deg)' }}
        >
          <canvas
            ref={desktopColorCanvasRef}
            width={DESKTOP_W}
            height={DESKTOP_H}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Helm wireframe overlay */}
        <motion.div
          variants={fadeInDown}
          initial='hidden'
          animate='visible'
          transition={transitionDelayed(D_HELM)}
          className='absolute inset-0'
        >
          <HelmOverlay />
        </motion.div>

        {/* Black triangle masking the top-left corner of the photo */}
        <div
          className='absolute inset-0 z-20 bg-base-black pointer-events-none'
          style={{
            // 1st %: seberapa jauh alas menjulur ke kanan (arah antara "Skill" & "Projects")
            // 2nd %: seberapa dalam sisi miring turun memotong pojok
            clipPath: 'polygon(0 0, 25% 0, 0 35%)',
          }}
        />

        {/* Black triangle masking the bottom-right corner of the photo */}
        <div
          className='absolute inset-0 z-20 bg-base-black pointer-events-none'
          style={{
            // 1st %: seberapa jauh alas menjulur ke kiri di sepanjang tepi bawah
            // 2nd %: seberapa tinggi sisi miring naik menutup pojok kanan
            clipPath: 'polygon(100% 100%, 80% 100%, 100% 35%)',
          }}
        />
      </motion.div>
    </section>
  );
}
