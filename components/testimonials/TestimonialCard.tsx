'use client';

import Image from 'next/image';
import { CornerGlow } from '@/lib/animations/corner-glow';

// --- Testimonial Card ---
interface TestimonialCardProps {
  name: string;
  role: string;
  logo: string;
  logoAlt: string;
  quote: string;
  index?: number;
}

export default function TestimonialCard({
  name,
  role,
  logo,
  logoAlt,
  quote,
  index = 0,
}: TestimonialCardProps) {
  return (
    <div
      className='
      relative flex flex-col gap-3 md:gap-sec-card-title
      w-full h-full
      border border-neutral-800
      rounded-2xl md:rounded-[20px]
      p-4 md:p-6
    '
    >
      {/* Corner glow */}
      <CornerGlow delay={index * 1.5} />

      {/* Card header */}
      <div className='flex flex-row items-center justify-between gap-4 w-full'>
        {/* Nama dan role */}
        <div className='flex flex-col gap-1'>
          {/* Nama */}
          <span className='text-lg font-bold text-neutral-25 md:text-sec-card-title'>
            {name}
          </span>

          {/* Role */}
          <span className='text-md font-normal text-neutral-400 md:text-body-responsive'>
            {role}
          </span>
        </div>

        {/* Company logo */}
        <div className='relative shrink-0 w-19 h-8 md:w-28.5 md:h-12'>
          <Image
            src={logo}
            alt={logoAlt}
            fill
            sizes='(max-width: 768px) 76px, 114px'
            className='object-contain object-right'
          />
        </div>
      </div>

      {/* Stars */}
      <div className='flex flex-row items-center gap-0'>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className='relative shrink-0 w-5 h-5 md:w-8 md:h-8'>
            <Image
              src='/icons/star-desktop.png'
              alt='star'
              fill
              sizes='(max-width: 768px) 20px, 32px'
              className='object-contain'
            />
          </div>
        ))}
      </div>

      {/* Quote */}
      <p className='text-md font-medium text-neutral-25 md:text-body-responsive'>
        {quote}
      </p>
    </div>
  );
}
