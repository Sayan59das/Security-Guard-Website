import { company } from '@/content/siteContent';
import { cn } from '@/lib/cn';

/**
 * PLACEHOLDER logo: a simple lookout-peak mark plus the company name as a wordmark.
 * Replace the SVG (and app/icon.svg) with your real logo when you have one.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 21 16 9l8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M8 25h16" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <LogoMark className="h-4 w-4 shrink-0 text-brass-300" />
      <span className="font-heading text-brand font-bold text-paper-100">{company.name}</span>
    </span>
  );
}
