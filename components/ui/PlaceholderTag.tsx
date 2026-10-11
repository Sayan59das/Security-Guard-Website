/**
 * A small visible marker shown next to sample content (testimonials, stats) while it is
 * still a placeholder. It disappears when the content file sets `placeholder: false`.
 */
export function PlaceholderTag({ label = 'Placeholder' }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded border border-dashed border-tone-accent px-1 py-0.5 font-sans text-eyebrow text-tone-accent">
      {label}
    </span>
  );
}
