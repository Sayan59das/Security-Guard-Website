import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  /** id of the <h2>, referenced by the parent section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Centred by default so every section sits on the same vertical axis. */
  align?: 'center' | 'left';
  className?: string;
}

/** Eyebrow label, serif H2 and optional intro. Colours follow the surrounding section tone. */
export function SectionHeading({ id, eyebrow, title, intro, align = 'center', className }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered ? 'mx-auto max-w-reading text-center' : 'max-w-prose', className)}>
      <p className={cn('mb-2 flex items-center gap-1.5 text-eyebrow uppercase text-tone-accent', centered && 'justify-center')}>
        <span aria-hidden="true" className="h-px w-5 bg-tone-accent" />
        {eyebrow}
        {/* Mirrored rule on centred headings so the label is symmetrical. */}
        {centered ? <span aria-hidden="true" className="h-px w-5 bg-tone-accent" /> : null}
      </p>
      <h2 id={id} className="text-h2 text-tone-fg">
        {title}
      </h2>
      {intro ? (
        <p className={cn('mt-2 text-lead text-tone-muted', centered && 'mx-auto max-w-measure')}>{intro}</p>
      ) : null}
    </div>
  );
}
