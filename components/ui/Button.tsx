import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AnchorButtonProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

// `transition` covers colour, shadow and transform, so hover fades and the 1px press both glide.
const base =
  'inline-flex select-none items-center justify-center gap-1 whitespace-nowrap rounded border font-semibold leading-none transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0';

const sizes: Record<Size, string> = {
  md: 'min-h-6 px-3 text-base',
  lg: 'min-h-7 px-4 text-base',
};

const variants: Record<Variant, string> = {
  // Brass fill with near-black text: 6.3:1 contrast, works on light and dark sections.
  primary: 'border-brass-500 bg-brass-500 text-ink-950 hover:border-brass-400 hover:bg-brass-400',
  // Outline that follows the section tone.
  secondary: 'border-tone-muted bg-transparent text-tone-fg hover:border-tone-fg hover:bg-tone-fg hover:text-tone-bg',
};

function classesFor(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

/** Renders an <a> when given an href, otherwise a <button>. */
export function Button(props: AnchorButtonProps | NativeButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...anchorProps } = props;
    return (
      <a {...anchorProps} className={classesFor(variant, size, className)}>
        {children}
      </a>
    );
  }

  const { variant, size, className, children, type = 'button', ...buttonProps } = props;
  return (
    <button {...buttonProps} type={type} className={classesFor(variant, size, className)}>
      {children}
    </button>
  );
}
