'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BoxPattern } from '@/components/ui/BoxPattern';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { TextareaField } from '@/components/ui/TextareaField';
import { PopupMessage } from '@/components/ui/PopupMessage';
import { Container } from '../layout/Container';
import { usePhotoReveal } from '../hero/usePhotoReveal';
import {
  fadeInUp,
  fadeInDown,
  transitionDelayed,
} from '@/lib/animations/staggered-item';

// --- Social media data ---
const socialMedia = [
  {
    icon: '/icons/dribbble.png',
    alt: 'Dribbble',
    href: 'https://dribbble.com/',
  },
  {
    icon: '/icons/instagram.png',
    alt: 'Instagram',
    href: 'https://www.instagram.com/',
  },
  {
    icon: '/icons/linkedin.png',
    alt: 'LinkedIn',
    href: 'https://id.linkedin.com/',
  },
];

const CONTACT_W = 660;
const CONTACT_H = 873;

// --- Contact Section ---
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [popup, setPopup] = useState<{
    open: boolean;
    type: 'success' | 'failed';
  }>({
    open: false,
    type: 'success',
  });

  const {
    wrapperRef,
    grayCanvasRef,
    colorCanvasRef,
    maskRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
  } = usePhotoReveal({
    src: '/images/profile-desktop.png',
    width: CONTACT_W,
    height: CONTACT_H,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let valid = true;
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setPopup({ open: true, type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setPopup({ open: true, type: 'failed' });
    }
  };

  return (
    <section
      id='contact'
      className='relative w-full max-w-360 mx-auto border-t border-neutral-800 bg-base-black pt-10 md:pt-0 pb-17 md:pb-30 z-20'
    >
      {/* BoxPattern kiri atas */}
      <motion.div
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        transition={transitionDelayed(0.6)}
        className='absolute top-0 z-20'
        style={{ left: 0 }}
      >
        <BoxPattern rotate={180} />
      </motion.div>

      {/* BoxPattern kanan bawah */}
      <motion.div
        variants={fadeInDown}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        transition={transitionDelayed(0.6)}
        className='absolute bottom-0'
        style={{ right: 0 }}
      >
        <BoxPattern rotate={0} />
      </motion.div>

      <Container>
        <div className='flex flex-col md:flex-row md:items-center lg:pt-19 gap-30.5 md:gap-[clamp(2.5rem,8.47vw,7.63rem)]'>
          {/* --- Contact Content --- */}
          <motion.div
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.3)}
            className='relative w-full md:flex-4'
            style={{ aspectRatio: '420/557' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Wrapper A: grayscale canvas + mix-blend-luminosity */}
            <div
              ref={wrapperRef}
              className='absolute -top-10 inset-0 mix-blend-luminosity pointer-events-none'
              style={{ transform: 'rotate(-1.45deg)' }}
            >
              <canvas
                ref={maskRef}
                width={CONTACT_W}
                height={CONTACT_H}
                className='hidden'
              />
              <canvas
                ref={grayCanvasRef}
                width={CONTACT_W}
                height={CONTACT_H}
                style={{ width: '100%', height: '94%' }}
              />
            </div>

            {/* Gradient overlay */}
            <div
              className='absolute -top-10 pointer-events-none'
              style={{
                inset: '-16px',
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0) -92.59%, #000000 88.93%)',
              }}
            />

            {/* Wrapper B: color reveal canvas */}
            <div
              className='absolute -top-10 inset-0 pointer-events-none'
              style={{ transform: 'rotate(-1.45deg)' }}
            >
              <canvas
                ref={colorCanvasRef}
                width={CONTACT_W}
                height={CONTACT_H}
                style={{ width: '100%', height: '94%' }}
              />
            </div>

            {/* Contact header */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.45)}
              className='absolute left-0 right-0 flex flex-col items-center gap-4 lg:gap-6'
              style={{ top: '84.09%' }}
            >
              {/* Social media icons */}
              <div className='flex flex-row items-center gap-4 lg:gap-6'>
                {socialMedia.map((item) => (
                  <a
                    key={item.alt}
                    href={item.href}
                    className='flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-base-black border border-neutral-800 transition-transform duration-500 hover-scale'
                  >
                    <div className='relative w-8 h-8 lg:w-9.5 lg:h-9.5'>
                      <Image
                        src={item.icon}
                        alt={item.alt}
                        fill
                        sizes='(min-width: 1024px) 38px, 32px'
                        className='object-contain'
                      />
                    </div>
                  </a>
                ))}
              </div>

              {/* Name + availability */}
              <div className='flex flex-col items-center gap-1'>
                <span className='text-md font-bold text-white text-center lg:text-xl'>
                  Edwin Anderson
                </span>
                <div className='flex flex-row items-center gap-3'>
                  <div className='w-3 h-3 rounded-full bg-primary-200 shrink-0' />
                  <span className='text-sm font-semibold text-neutral-400 lg:text-md'>
                    Available for Work
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Contact Form --- */}
          <motion.div
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.3)}
            className='flex flex-col gap-6 lg:gap-12 md:flex-6'
          >
            {/* Form header */}
            <div className='flex flex-col items-start gap-2'>
              <motion.span
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(0)}
                className='text-md font-medium text-primary-200 lg:text-sec-label'
              >
                CONTACT
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(0.15)}
                className='font-extrabold text-neutral-25 text-center lg:text-left lg:text-sec-title'
              >
                LET&apos;S GET IN TOUCH
              </motion.h2>
            </div>

            <div className='flex flex-col gap-4 lg:gap-6'>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(0.3)}
              >
                <InputField
                  label='Name'
                  name='name'
                  type='text'
                  placeholder='Enter your name'
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(0.45)}
              >
                <InputField
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(0.6)}
              >
                <TextareaField
                  label='Message'
                  name='message'
                  placeholder='Enter your message'
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(0.75)}
              >
                <Button
                  className='w-full cursor-pointer'
                  onClick={handleSubmit}
                >
                  Send Message
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Popup */}
      <PopupMessage
        type={popup.type}
        isOpen={popup.open}
        onClose={() => setPopup((prev) => ({ ...prev, open: false }))}
      />
    </section>
  );
}
