'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { BoxPattern } from '@/components/ui/BoxPattern';

// --- About section ---
export function About() {
  return (
    <section className='relative bg-base-black py-10 md:py-[120px]'>
      {/* Box pattern decoration */}
      <BoxPattern
        rotate={90}
        className='bottom-[40px] md:bottom-[60px]'
        style={{ left: 'max(0px, calc((100vw - 1440px) / 2))' }}
      />

      <Container>
        <div className='relative flex flex-col items-center gap-6 text-center md:gap-8'>
          {/* About label */}
          <span className='text-md font-medium text-primary-200 md:text-lg'>
            ABOUT ME
          </span>

          {/* About title */}
          <h2 className='text-display-md font-extrabold text-neutral-25 md:text-display-2xl'>
            Crafting Seamless{' '}
            <span className='text-primary-200'>High-Performance Web</span>{' '}
            Experiences
          </h2>

          {/* About description */}
          <p className='text-md font-medium text-neutral-400 md:max-w-[996px] md:text-xl'>
            I love turning designs into interactive, high-performance websites.
            With a keen eye for detail and a deep understanding of frontend
            technologies, I create smooth and visually appealing user
            experiences.
          </p>

          {/* Mockup image left */}
          <div className='absolute hidden md:flex lg:left-[124px] lg:top-[-131px] lg:h-[178px] lg:w-[238px]'>
            <Image
              src='/images/image-01d.png'
              alt='Website mockup project'
              fill
              className='object-cover'
            />
          </div>

          {/* Mockup image right top */}
          <div className='absolute hidden md:flex lg:left-[884px] lg:top-[-94px] lg:h-[187px] lg:w-[250px]'>
            <Image
              src='/images/image-02d.png'
              alt='Website mockup project'
              fill
              className='object-cover'
            />
          </div>

          {/* Mockup image right bottom */}
          <div className='absolute hidden md:flex lg:left-[745px] lg:top-[109px] lg:h-[88px] lg:w-[117px]'>
            <Image
              src='/images/image-03d.png'
              alt='Website mockup project'
              fill
              className='object-cover'
            />
          </div>

          {/* Mobile mockup collage */}
          <div className='relative flex h-[288px] w-full items-start justify-center gap-3 md:hidden'>
            <Image
              src='/images/image-01d.png'
              alt='Website mockup project'
              width={170}
              height={127}
              className='object-cover'
            />
            <div className='flex flex-col gap-3'>
              <Image
                src='/images/image-02d.png'
                alt='Website mockup project'
                width={134}
                height={99}
                className='object-cover'
              />
              <Image
                src='/images/image-03d.png'
                alt='Website mockup project'
                width={133}
                height={100}
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
