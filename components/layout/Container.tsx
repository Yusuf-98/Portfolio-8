import { cn } from '@/lib/utils';

// --- Custom Container ---
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('custom-container', className)}>{children}</div>;
}
