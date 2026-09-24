'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import type { Project } from '@/lib/data/projects';

// --- Project list modal ---
interface ProjectListModalProps {
  projects: Project[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (index: number) => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}

export default function ProjectListModal({
  projects,
  open,
  onOpenChange,
  onSelect,
  returnFocusRef,
}: ProjectListModalProps) {
  const selectingRef = useRef(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className='fixed inset-0 z-60 bg-base-black/80 backdrop-blur-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </Dialog.Overlay>

            <div className='pointer-events-none fixed inset-0 z-60 flex items-center justify-center p-4'>
              <Dialog.Content
                asChild
                forceMount
                onCloseAutoFocus={(e) => {
                  e.preventDefault();
                  if (!selectingRef.current) returnFocusRef.current?.focus();
                  selectingRef.current = false;
                }}
              >
                <motion.div
                  className='pointer-events-auto flex max-h-[85vh] w-full max-w-[42rem] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-base-black'
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* Header */}
                  <div className='flex items-start justify-between gap-4 border-b border-neutral-800 p-5 md:p-6'>
                    <div className='flex flex-col gap-1'>
                      <Dialog.Title className='text-xl font-extrabold text-neutral-25 md:text-2xl'>
                        All projects
                      </Dialog.Title>
                      <Dialog.Description className='text-sm text-neutral-400'>
                        Open a project for details, or jump straight to the live
                        demo or source code.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type='button'
                        aria-label='Close project list'
                        className='flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-800 text-neutral-25 outline-none transition-colors hover:border-neutral-25 focus:outline-none focus-visible:outline-none'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          aria-hidden
                        >
                          <path d='M6 6l12 12M18 6L6 18' />
                        </svg>
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* List */}
                  <ul className='overflow-y-auto'>
                    {projects.map((project, i) => (
                      <li
                        key={project.id}
                        className='border-b border-neutral-800 last:border-b-0'
                      >
                        <div className='flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-4 md:p-5'>
                          <button
                            type='button'
                            onClick={() => {
                              selectingRef.current = true;
                              onSelect(i);
                            }}
                            aria-label={`View ${project.title} details`}
                            className='flex min-w-0 flex-1 cursor-pointer items-center gap-4 text-left'
                          >
                            <span className='relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-800'>
                              <Image
                                src={project.image}
                                alt=''
                                fill
                                sizes='64px'
                                className='object-cover'
                              />
                            </span>
                            <span className='flex min-w-0 flex-col gap-1'>
                              <span className='font-bold text-neutral-25'>
                                {project.title}
                              </span>
                              <span className='line-clamp-2 text-sm text-neutral-400'>
                                {project.description}
                              </span>
                            </span>
                          </button>

                          <div className='flex shrink-0 gap-2'>
                            <a
                              href={project.liveUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label={`${project.title} live demo`}
                              className='inline-flex h-9 items-center rounded-full bg-primary-200 px-4 text-xs font-bold text-neutral-950 transition-opacity hover:opacity-90'
                            >
                              Live demo ↗
                            </a>
                            <a
                              href={project.repoUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label={`${project.title} source code on GitHub`}
                              className='inline-flex h-9 items-center rounded-full border border-neutral-800 px-4 text-xs font-bold text-neutral-25 transition-colors hover:border-neutral-25'
                            >
                              GitHub ↗
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
