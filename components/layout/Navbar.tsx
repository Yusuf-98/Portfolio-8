'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { Container } from './Container';

// --- Nav Links Data ---
const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skill', href: '#skills' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Detect scroll to toggle navbar background ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Auto-close mobile menu when screen reaches md breakpoint ---
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-neutral-800 bg-base-black'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container>
        <div className='flex h-20 items-center justify-between gap-4xl'>
          <div className='flex items-center w-full'>
            {/* --- Logo --- */}
            <Link
              href='#hero'
              className='flex w-full items-center gap-2.25 md:gap-2'
            >
              <span className='h-0 border w-6 border-base-white md:w-10' />
              <span className='w-full text-md font-bold text-primary-200 md:text-xl md:p-2'>
                Edwin Anderson.
              </span>
            </Link>
          </div>

          {/* --- Desktop Nav --- */}
          <nav className='hidden items-center justify-center gap-4xl md:flex'>
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  className='flex p-2 gap-2 text-md text-base-white transition-colors duration-300 hover:text-primary-200'
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* --- Mobile Menu --- */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type='button'
                aria-label='Open menu'
                className='flex h-8 w-8 items-center justify-center md:hidden'
              >
                <Image
                  src='/icons/menu-04.png'
                  alt='Hamburger Menu'
                  width={24}
                  height={24}
                  unoptimized
                />
              </button>
            </Dialog.Trigger>

            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      className='fixed inset-0 z-50 bg-base-black/80'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  </Dialog.Overlay>

                  <Dialog.Content asChild forceMount>
                    <motion.div
                      className='fixed right-0 top-0 z-50 flex h-full w-full max-w-full flex-col gap-4xl border-l border-neutral-800 bg-base-black px-xl py-7xl'
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{
                        type: 'tween',
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                      onClick={() => setOpen(false)}
                    >
                      <div className='flex items-center justify-between'>
                        <Dialog.Title className='flex items-center gap-2 text-md font-bold text-primary-200'>
                          <span className='h-px w-6 bg-base-white' />
                          Edwin Anderson.
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button
                            type='button'
                            aria-label='Close menu'
                            className='flex h-6 w-6 items-center justify-center'
                          >
                            <Image
                              src='/icons/close.png'
                              alt='Close Menu'
                              width={24}
                              height={24}
                              unoptimized
                            />
                          </button>
                        </Dialog.Close>
                      </div>

                      <nav className='flex flex-col gap-3xl'>
                        {NAV_LINKS.map((link, i) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                          >
                            <Dialog.Close asChild>
                              <Link
                                href={link.href}
                                className='text-lg text-base-white transition-colors duration-300 hover:text-primary-200'
                              >
                                {link.label}
                              </Link>
                            </Dialog.Close>
                          </motion.div>
                        ))}
                      </nav>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  );
}
