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

// --- Logo text split ---
const LOGO_TEXT = 'Edwin Anderson.';
const LOGO_LETTERS = LOGO_TEXT.split('');

// --- Logo letter component ---
function LogoLetters({ className }: { className?: string }) {
  return (
    <span
      className={`overflow-hidden inline-flex leading-none ${className ?? ''}`}
      style={{ textShadow: '0 2.2ex 0 #91FF02', height: '1.2em' }}
    >
      {LOGO_LETTERS.map((char, i) => (
        <span
          key={i}
          className='logo-letter relative inline-block transition-transform duration-500 ease-in-out'
          style={{ transitionDelay: `${i * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Deteksi scroll ke toggle navbar background ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Auto-close mobile menu saat tercapai md ---
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
      className={`sticky top-0 z-50 w-full max-w-360 mx-auto transition-colors duration-300 border-b border-neutral-800  ${
        isScrolled ? ' bg-base-black' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className='flex h-20 items-center justify-between gap-4xl md:gap-sm lg:gap-4xl'>
          <div className='flex items-center w-full'>
            {/* --- Logo --- */}
            <Link
              href='#hero'
              className='logo-link flex w-full items-center gap-2.25 lg:gap-2'
            >
              <span className='h-0 border w-6 border-base-white lg:w-10' />
              <LogoLetters className='text-md font-bold text-primary-200 lg:text-xl lg:pb-2 lg:pt-1.25' />
            </Link>
          </div>

          {/* --- Desktop Nav --- */}
          <nav className='hidden items-center justify-center gap-4xl md:gap-3xl lg:gap-4xl md:flex'>
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  className='flex p-1 lg:p-2 gap-1 lg:gap-2 text-md text-base-white transition-colors duration-300 hover-primary'
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
                className='flex h-8 w-8 items-center justify-center cursor-pointer md:hidden'
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
                      className='fixed right-0 top-0 z-50 flex h-full w-full max-w-full flex-col gap-4xl border-l border-neutral-800 bg-base-black px-xl pt-6 pb-7xl'
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
                        <Dialog.Title asChild>
                          <Link
                            href='#hero'
                            onClick={() => setOpen(false)}
                            className='group flex items-center gap-2 [&:hover_span>span]:[-translate-y-[2.2ex]]'
                          >
                            <span className='h-px w-6 bg-base-white' />
                            <LogoLetters className='text-md font-bold text-primary-200' />
                          </Link>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button
                            type='button'
                            aria-label='Close menu'
                            className='flex h-6 w-6 items-center justify-center cursor-pointer'
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
                                className='text-md text-base-white transition-colors duration-300 hover-primary'
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
