'use client';

import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeInDown,
  fadeInScale,
  fadeIn,
  transition,
  transitionDelayed,
  transitionScaleDelayed,
  viewportEarly,
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
const D_TITLE = 0.5;
const D_SUBTITLE = 0.8;
const D_BUTTON = 1.1;
const D_IMAGE = 1.4;
const D_RATING = (D_IMAGE + 0.9) * 1000;
const D_BOXPATTERN = D_IMAGE + 1.2;
const D_HELM = D_IMAGE + 1.5;

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
        className='absolute bottom-56 md:bottom-0 h-[69px] w-[103.5px] md:h-[92px] md:w-[138px] z-50'
        style={{ left: 0 }}
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        transition={transitionDelayed(D_BOXPATTERN)}
      >
        <BoxPattern rotate={0} />
      </motion.div>

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
                Hi, I am Edwin Anderson{' '}
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
              className='mt-xl font-medium text-lg text-neutral-400 md:max-w-[597px] md:text-xl'
            >
              {SUBTITLE_TEXT}
            </motion.p>

            {/* Hero button */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              animate='visible'
              transition={transitionDelayed(D_BUTTON)}
              className='mt-10 md:mt-[clamp(2.5rem,0.1925rem+4.808vw,3.75rem)] w-full md:w-[300px]'
            >
              <Button className='w-full uppercase'>Hire Me</Button>
            </motion.div>
          </div>

          {/* Profile photo - mobile */}
          <motion.div
            variants={fadeInScale}
            initial='hidden'
            animate='visible'
            transition={transitionScaleDelayed(D_IMAGE)}
            className='relative mt-2 pt-3 md:mt-7xl aspect-393/513 w-full md:hidden'
            onMouseMove={mobileHandleMouseMove}
            onMouseEnter={mobileHandleMouseEnter}
            onMouseLeave={mobileHandleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Lime background block */}
            <div className='absolute left-[51.9%] top-[1.5%] h-[90.8%] w-[51.6%] bg-primary-200' />

            {/* Wrapper A: grayscale canvas + mix-blend-luminosity */}
            <div
              ref={mobileWrapperRef}
              className='absolute left-[1.5%] top-0 h-[98.1%] w-[96.7%] mix-blend-luminosity pointer-events-none'
              style={{ transform: 'rotate(-1.45deg)' }}
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
            <div className='absolute w-[108.9%] inset-0 bg-linear-to-b from-transparent via-90% via-base-black to-base-black z-5' />

            {/* Wrapper B: color reveal canvas */}
            <div
              className='absolute left-[1.5%] top-0 h-[98.1%] w-[96.7%] pointer-events-none'
              style={{ transform: 'rotate(-1.45deg)' }}
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
          style={{ transform: 'rotate(0deg)' }}
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
          className='absolute left-[-1.5%] top-[-0.8%] h-[100%] w-[100.5%] pointer-events-none'
          style={{ transform: 'rotate(-1.45deg)' }}
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
      </motion.div>
    </section>
  );
}
