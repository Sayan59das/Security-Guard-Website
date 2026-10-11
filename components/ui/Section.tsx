import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';

export type Tone = 'light' | 'sand' | 'dark';

interface SectionProps {
  id: string;
  /** Background tone. Sets the colour roles (text-tone-*, border-tone-*) for everything inside. */
  tone?: Tone;
  /** id of the heading that names this section, for screen readers. */
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  /** Set to false when the section needs to run edge to edge (for example the contact split). */
  contained?: boolean;
}

const toneClass: Record<Tone, string> = {
  light: 'tone-light',
  sand: 'tone-sand',
  dark: 'tone-dark',
};

/** A full-width page section with consistent vertical rhythm (64px mobile, 96px desktop). */
export function Section({ id, tone = 'light', labelledBy, children, className, contained = true }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(toneClass[tone], 'bg-tone-bg text-tone-fg', contained && 'py-8 lg:py-12', className)}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
