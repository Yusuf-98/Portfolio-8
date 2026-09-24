'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import type { Project } from '@/lib/data/projects';

const FILL_TOLERANCE = 1.2;
const INSET = 0.94;
const MAX_STAGE_VH = 70;

// --- Project detail ---
interface ProjectDetailProps {
  project: Project;
  prevTitle: string;
  nextTitle: string;
  onPrev: () => void;
  onNext: () => void;
}

function ProjectDetail({
  project,
  prevTitle,
  nextTitle,
  onPrev,
  onNext,
}: ProjectDetailProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const current = project.gallery[imageIndex];
  const ratio = project.frameRatio;
  const imageRatio = current.width / current.height;
  const fills =
    current.fit !== 'contain' &&
    imageRatio >= ratio / FILL_TOLERANCE &&
    imageRatio <= ratio * FILL_TOLERANCE;
  const fitBox =
    imageRatio > ratio
      ? {
          width: `${INSET * 100}%`,
          height: `${(ratio / imageRatio) * INSET * 100}%`,
        }
      : {
          width: `${(imageRatio / ratio) * INSET * 100}%`,
          height: `${INSET * 100}%`,
        };

  return (
    <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12'>
      {/* Gallery */}
      <div className='flex min-w-0 flex-col gap-4'>
        <div
          className='mx-auto w-full'
          style={{ maxWidth: `${(ratio * MAX_STAGE_VH).toFixed(1)}vh` }}
        >
          <div
            className='relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950'
            style={{ aspectRatio: ratio }}
          >
            {fills ? (
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes='(min-width: 1024px) 60vw, 100vw'
                className='object-cover object-top'
              />
            ) : (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div
                  className='relative overflow-hidden rounded-xl'
                  style={fitBox}
                >
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes='(min-width: 1024px) 60vw, 100vw'
                    className='object-cover'
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        <ul className='flex gap-3 overflow-x-auto pb-1'>
          {project.gallery.map((image, i) => (
            <li key={image.src} className='shrink-0'>
              <button
                type='button'
                onClick={() => setImageIndex(i)}
                aria-label={`Show screenshot ${i + 1} of ${project.gallery.length}`}
                aria-current={i === imageIndex}
                className={`relative block h-14 w-24 overflow-hidden rounded-lg border bg-neutral-950 transition-opacity md:h-16 md:w-28 ${
                  i === imageIndex
                    ? 'border-primary-200'
                    : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.src}
                  alt=''
                  fill
                  sizes='112px'
                  className='object-cover'
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Info */}
      <div className='flex flex-col gap-6'>
        <Dialog.Description className='text-md text-neutral-400'>
          {project.description}
        </Dialog.Description>

        {/* Features */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-sm font-semibold uppercase tracking-widest text-primary-200'>
            Key features
          </h3>
          <ul className='flex flex-col gap-2 text-sm text-neutral-25 md:text-md'>
            {project.highlights.map((item) => (
              <li key={item} className='flex gap-3'>
                <span
                  aria-hidden
                  className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-200'
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-sm font-semibold uppercase tracking-widest text-primary-200'>
            Tech stack
          </h3>
          <ul className='flex flex-wrap gap-2'>
            {project.stack.map((tech) => (
              <li
                key={tech}
                className='rounded-full border border-neutral-800 px-3 py-1 text-xs font-medium text-neutral-25 md:text-sm'
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className='flex flex-wrap gap-3'>
          <a
            href={project.liveUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex h-12 items-center justify-center rounded-full bg-primary-200 px-6 text-sm font-bold text-neutral-950 transition-opacity hover:opacity-90'
          >
            Live demo ↗
          </a>
          <a
            href={project.repoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex h-12 items-center justify-center rounded-full border border-neutral-800 px-6 text-sm font-bold text-neutral-25 transition-colors hover:border-neutral-25'
          >
            GitHub ↗
          </a>
        </div>

        {/* Project navigation */}
        <nav
          aria-label='Project navigation'
          className='mt-2 grid grid-cols-2 gap-3 border-t border-neutral-800 pt-6'
        >
          <button
            type='button'
            onClick={onPrev}
            className='flex flex-col items-start gap-1 rounded-xl border border-neutral-800 p-3 text-left transition-colors hover:border-neutral-25'
          >
            <span className='text-xs text-neutral-400'>← Previous</span>
            <span className='text-sm font-semibold text-neutral-25'>
              {prevTitle}
            </span>
          </button>
          <button
            type='button'
            onClick={onNext}
            className='flex flex-col items-end gap-1 rounded-xl border border-neutral-800 p-3 text-right transition-colors hover:border-neutral-25'
          >
            <span className='text-xs text-neutral-400'>Next →</span>
            <span className='text-sm font-semibold text-neutral-25'>
              {nextTitle}
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}

// --- Project modal ---
interface ProjectModalProps {
  projects: Project[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export default function ProjectModal({
  projects,
  index,
  onIndexChange,
}: ProjectModalProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const project = index === null ? null : projects[index];
  const total = projects.length;

  const goTo = (target: number) => onIndexChange((target + total) % total);

  return (
    <Dialog.Root
      open={index !== null}
      onOpenChange={(open) => {
        if (!open) onIndexChange(null);
      }}
    >
      <AnimatePresence>
        {project && index !== null && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className='fixed inset-0 z-60 bg-base-black'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={() => {
                triggerRef.current = document.activeElement as HTMLElement;
              }}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                triggerRef.current?.focus();
              }}
            >
              <motion.div
                className='fixed inset-0 z-60 overflow-y-auto bg-base-black'
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className='mx-auto flex min-h-full w-full max-w-360 flex-col gap-6 px-4 py-6 md:gap-8 md:px-[clamp(1rem,6vw,6rem)] md:py-10'>
                  {/* Header */}
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex flex-col gap-1'>
                      <span className='text-sm font-medium text-primary-200'>
                        {String(index + 1).padStart(2, '0')} /{' '}
                        {String(total).padStart(2, '0')}
                      </span>
                      <Dialog.Title className='text-display-md font-extrabold text-neutral-25 md:text-sec-title'>
                        {project.title}
                      </Dialog.Title>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type='button'
                        aria-label='Close project details'
                        className='flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-800 text-neutral-25 outline-none transition-colors hover:border-neutral-25 focus:outline-none focus-visible:outline-none'
                      >
                        <svg
                          width='20'
                          height='20'
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

                  {/* Detail */}
                  <ProjectDetail
                    key={project.id}
                    project={project}
                    prevTitle={projects[(index - 1 + total) % total].title}
                    nextTitle={projects[(index + 1) % total].title}
                    onPrev={() => goTo(index - 1)}
                    onNext={() => goTo(index + 1)}
                  />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
