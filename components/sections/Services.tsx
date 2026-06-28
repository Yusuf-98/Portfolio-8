'use client';

import { motion } from 'framer-motion';
import { fadeInUp, transitionDelayed } from '@/lib/animations/staggered-item';
import { Container } from '@/components/layout/Container';
import { ServiceCard } from '@/components/service/ServiceCard';

// --- Service data ---
const services = [
  {
    number: '01',
    icon: '/icons/monitor-01.png',
    title: 'Custom Website Development',
    description:
      'Building responsive, fast, and scalable websites tailored to your needs.',
  },
  {
    number: '02',
    icon: '/icons/monitor-01.png',
    title: 'Web Performance Optimization',
    description:
      'Enhancing website speed, SEO, and overall performance for better results.',
  },
  {
    number: '03',
    icon: '/icons/monitor-01.png',
    title: 'Website Maintenance & Debugging',
    description:
      'Fixing bugs, improving UI, and ensuring smooth performance over time.',
  },
];

// --- Delay urutan muncul ---
const D_HEADER = 0.1;
const D_DESC = 0.25;
const D_CARD_BASE = 0.4;
const D_CARD_STAGGER = 0.15;

// --- Services section ---
export function Services() {
  return (
    <section className='w-full max-w-360 mx-auto bg-base-black py-10 md:pt-[120px] md:pb-[70px]'>
      <Container>
        <div className='flex flex-col gap-6 md:gap-16'>
          {/* Services header */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(D_HEADER)}
              className='flex flex-col w-full md:w-60 lg:w-127.25 gap-2 md:gap-2'
            >
              <span className='text-md md:text-sec-label font-medium text-primary-200'>
                SERVICE
              </span>
              <h2 className='text-display-md md:text-sec-title font-extrabold text-neutral-25'>
                MY SERVICE EXPERTISE
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(D_DESC)}
              className='text-md md:text-sec-body font-medium text-neutral-400 md:max-w-[504px] md:text-right'
            >
              Creating modern, intuitive, and visually consistent web
              experiences that align with industry trends and user expectations.
            </motion.p>
          </div>

          {/* Services cards */}
          <div className='flex flex-col gap-6 md:flex-row md:gap-3xl lg:gap-5xl'>
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(
                  D_CARD_BASE + index * D_CARD_STAGGER
                )}
              >
                <ServiceCard
                  number={service.number}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
