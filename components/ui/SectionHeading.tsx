import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  /** id of the <h2>, referenced by the parent section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /**
   * `split` (default): title on the left, intro beside it on large screens, so the heading
   * takes little height. `stack`: intro under the title, for narrow columns.
   */
  layout?: 'split' | 'stack';
  className?: string;
}

/** Section label, H2 and optional intro, left aligned. Colours follow the surrounding section tone. */
export function SectionHeading({ id, eyebrow, title, intro, layout = 'split', className }: SectionHeadingProps) {
  const split = layout === 'split' && Boolean(intro);

  return (
    <div data-reveal className={cn(split ? 'grid gap-2 lg:grid-cols-12 lg:items-end lg:gap-8' : 'max-w-prose', className)}>
      <div className={split ? 'lg:col-span-7' : undefined}>
        <p className="mb-1.5 flex items-center gap-1 text-eyebrow text-tone-accent">
          <span aria-hidden="true" className="h-[2px] w-3 bg-brass-500" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-h2 text-tone-fg">
          {title}
        </h2>
      </div>
      {/* Beside the title the intro is set at body size, so it supports the title instead of outweighing it. */}
      {intro ? (
        <p className={cn('text-tone-muted', split ? 'max-w-measure text-lead lg:col-span-5 lg:text-base' : 'mt-2 text-lead')}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
