import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centres content at a max width of 1200px with responsive side gutters (16 / 24 / 32px). */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-container px-2 sm:px-3 lg:px-4', className)}>{children}</div>;
}
