import { type InputHTMLAttributes } from 'react';

// --- Input Field ---
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, ...props }: InputFieldProps) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      {/* Label */}
      <label className='text-sm tracking-t-none font-semibold text-neutral-25 lg:text-md'>
        {label}
      </label>

      {/* Input */}
      <input
        {...props}
        className={`
          w-full bg-base-black border
          rounded-xl lg:rounded-2xl
          px-4 py-2
          h-12 lg:h-14
          text-sm lg:text-md tracking-t-none text-neutral-25
          placeholder:text-neutral-400
          outline-none focus:border-primary-200
          transition-colors duration-200
          ${error ? 'border-red-500' : 'border-neutral-800'}
        `}
      />

      {/* Error */}
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}
