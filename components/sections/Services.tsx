'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';

// --- Service data ---
const services = [
  {
    number: '01',
    title: 'Custom Website Development',
    description:
      'Building responsive, fast, and scalable websites tailored to your needs.',
  },
  {
    number: '02',
    title: 'Web Performance Optimization',
    description:
      'Enhancing website speed, SEO, and overall performance for better results.',
  },
  {
    number: '03',
    title: 'Website Maintenance & Debugging',
    description:
      'Fixing bugs, improving UI, and ensuring smooth performance over time.',
  },
];

// --- Services section ---
export function Services() {
  return (
    <section className='bg-base-black py-10 md:py-[120px]'>
      <Container>
        <div className='flex flex-col gap-6 md:gap-16'>
          {/* Services header */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-[121px]'>
            <div className='flex flex-col gap-4 md:gap-4'>
              <span className='text-md md:text-lg font-medium text-primary-200'>
                SERVICE
              </span>
              <h2 className='text-display-md md:text-display-2xl font-extrabold text-neutral-25'>
                My Service Expertise
              </h2>
            </div>
            <p className='text-md md:text-xl font-medium text-neutral-400 md:max-w-[504px] md:text-right'>
              Creating modern, intuitive, and visually consistent web
              experiences that align with industry trends and user expectations.
            </p>
          </div>

          {/* Services cards */}
          <div className='flex flex-col gap-6 md:flex-row md:items-stretch md:gap-10'>
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='flex flex-1 flex-col gap-3 md:gap-6'
              >
                {/* Service number */}
                <span className='text-md md:text-xl font-semibold text-neutral-400'>
                  {service.number}
                </span>

                {/* Divider */}
                <div className='h-px w-full bg-neutral-800' />

                {/* Service icon */}
                <Image
                  src='/icons/monitor-01.png'
                  alt=''
                  width={32}
                  height={32}
                  className='h-8 w-8'
                />

                {/* Service title */}
                <h3 className='text-xl md:text-display-sm font-semibold text-neutral-25'>
                  {service.title}
                </h3>

                {/* Service description */}
                <p className='text-md md:text-xl font-normal text-neutral-400'>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
