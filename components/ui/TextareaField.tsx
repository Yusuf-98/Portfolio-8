import { type TextareaHTMLAttributes } from 'react';

// --- Textarea Field ---
interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextareaField({ label, error, ...props }: TextareaFieldProps) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      {/* Label */}
      <label className='text-sm font-semibold text-neutral-25 lg:text-md'>
        {label}
      </label>

      {/* Textarea */}
      <textarea
        {...props}
        className={`
          w-full bg-base-black border
          rounded-xl lg:rounded-2xl
          px-4 py-2
          h-30 lg:h-45
          text-sm lg:text-md text-neutral-25
          placeholder:text-neutral-400
          outline-none focus:border-primary-200
          transition-colors duration-200
          resize-none
          ${error ? 'border-red-500' : 'border-neutral-800'}
        `}
      />

      {/* Error */}
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}
