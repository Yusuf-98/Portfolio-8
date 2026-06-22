'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Container } from '../layout/Container';
import HelmOverlay from '../hero/HelmOverlay';
import { BoxPattern } from '../ui/BoxPattern';
import { Button } from '../ui/Button';
import { RatingCard } from '../ui/RatingCard';

// --- Text reveal animation ---
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function Hero() {
  return (
    <section id='hero' className='relative -mt-20 bg-base-black'>
      <Container>
        {/* Hero content */}
        <div className='relative z-10 flex flex-col items-center pb-8xl md:items-start md:pb-9xl md:text-left pt-[clamp(7.5rem,18.67vw,13.81rem)] '>
          {/* Hero text content */}
          <motion.div
            className='flex w-full md:w-[clamp(22.56rem,56.04vw,50.44rem)] flex-col items-start md:text-left pb-5xl'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            {/* Hero greeting */}
            <motion.div
              variants={itemVariants}
              className='flex items-center gap-md'
            >
              <span className='h-px bg-neutral-25 w-5.25 lg:w-[clamp(1.31rem,7.92vw,7.13rem)]' />
              <p className='text-md font-medium text-neutral-25 lg:text-xl'>
                Hi, I am Edwin Anderson Frontend Developer
              </p>
            </motion.div>

            {/* Hero title */}
            <motion.h1
              variants={itemVariants}
              className='mt-xl font-extrabold uppercase text-base-white'
              style={{
                fontSize: 'clamp(2.25rem, 5.56vw, 5rem)',
                lineHeight: 'clamp(3rem, 6.76vw, 5rem)',
              }}
            >
              Building fast &{' '}
              <span className='text-primary-200'>interactive</span> web
              experiences.
            </motion.h1>

            {/* Hero subtitle */}
            <motion.p
              variants={itemVariants}
              className='mt-xl font-medium text-lg text-neutral-400 md:max-w-[597px] md:text-xl'
            >
              Bridging creativity and functionality to deliver stunning,
              user-friendly web applications
            </motion.p>

            {/* CTA button */}
            <Button
              variants={itemVariants}
              className='mt-10 md:mt-[clamp(1.25rem,5.41vw,4rem)] w-full uppercase md:w-[300px]'
            >
              Hire Me
            </Button>
          </motion.div>

          {/* Profile photo - mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='relative mt-2 pt-3 md:mt-7xl aspect-[393/513] w-full md:hidden'
          >
            {/* Lime background block */}
            <div className='absolute left-[52.3%] top-[1.5%] h-[90.8%] w-[56.5%] bg-primary-200' />

            {/* Portrait image */}
            <div className='absolute left-[1.5%] top-[3.5%] h-[89.9%] w-[96.4%]'>
              <Image
                src='/images/profile-mobile.png'
                alt='Edwin Anderson'
                fill
                className='object-cover mix-blend-luminosity'
                style={{ transform: 'rotate(-1.45deg)' }}
              />
            </div>

            {/* Black fade gradient */}
            <div className='absolute w-[108.9%] inset-0 bg-linear-to-b from-transparent to-base-black z-5' />

            {/* Helm wireframe overlay */}
            <HelmOverlay />
          </motion.div>
        </div>
      </Container>

      {/* Box pattern decoration */}
      <BoxPattern
        rotate={0}
        className='top-[72%] md:top-[92%]'
        style={{
          left: 'max(0px, calc((100vw - 1440px) / 2))',
        }}
      />

      {/* Rating card */}
      <RatingCard
        className='left-8 md:left-[67%] z-10 top-[79%] md:top-[clamp(416.38px,192.814px+29.1101vw,612px)] w-87.25 md:w-[clamp(240px,67.429px+17.2619vw,316px)]'
        style={{
          height: 'clamp(138px, 92.286px + 5.9524vw, 178px)',
          padding: 'clamp(16px, 11.429px + 0.5952vw, 20px)',
        }}
      />

      {/* Profile photo - desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className='absolute top-0 z-0 hidden md:block'
        style={{
          right: 'max(0px, calc((100vw - 1440px) / 2))',
          width: 'clamp(24.56rem, 45.84vw, 41.26rem)',
          height: 'clamp(32.51rem, 60.67vw, 54.60rem)',
        }}
      >
        {/* Lime background block */}
        <div className='absolute left-[52.1%] top-0 h-[98.9%] w-[47.9%] bg-primary-200' />

        {/* Portrait image */}
        <div className='absolute left-[-1.5%] top-[-0.8%] h-[99.8%] w-[99.7%]'>
          <Image
            src='/images/profile-desktop.png'
            alt='Edwin Anderson'
            fill
            className='object-cover mix-blend-luminosity'
            style={{ transform: 'rotate(-1.45deg)' }}
          />
        </div>

        {/* Black fade gradient */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-base-black z-5' />

        {/* Helm wireframe overlay */}
        <HelmOverlay />
      </motion.div>
    </section>
  );
}
