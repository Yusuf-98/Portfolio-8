'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

// --- Popup Message ---
interface PopupMessageProps {
  type: 'success' | 'failed';
  isOpen: boolean;
  onClose: () => void;
}

const content = {
  success: {
    logo: '/icons/logo-success.png',
    title: 'Message Sent Successfully!',
    subtitle:
      "Thank you for reaching out. I'll get back to you as soon as possible",
    button: 'BACK TO HOME',
  },
  failed: {
    logo: '/icons/logo-failed.png',
    title: 'Message not sent!',
    subtitle: 'Something went wrong on our end. Please try again in a moment',
    button: 'TRY AGAIN',
  },
};

export function PopupMessage({ type, isOpen, onClose }: PopupMessageProps) {
  const { logo, title, subtitle, button } = content[type];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleButton = () => {
    if (type === 'success') {
      onClose();
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Card */}
          <motion.div
            className='relative flex flex-col items-center w-[361px] md:w-[479px] bg-base-black border border-neutral-800 rounded-2xl pt-20 px-6 pb-6 md:px-8 md:pb-8 gap-6'
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Logo */}
            <div className='absolute left-1/2 -translate-x-1/2 -top-[67px] md:-top-[80px]'>
              <Image
                src={logo}
                alt={type === 'success' ? 'Success' : 'Failed'}
                width={148}
                height={136}
                className='w-[120px] h-[110px] md:w-[148px] md:h-[136px] object-contain'
              />
            </div>

            {/* Text */}
            <div className='flex flex-col items-center gap-2 w-full'>
              <h3 className='text-lg md:text-xl font-bold text-neutral-25 text-center'>
                {title}
              </h3>
              <p className='text-sm md:text-md font-normal text-neutral-400 text-center'>
                {subtitle}
              </p>
            </div>

            {/* Button */}
            <Button onClick={handleButton} className='w-full'>
              {button}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
