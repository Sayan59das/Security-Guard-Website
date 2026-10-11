import { MapPin } from 'lucide-react';
import { contact } from '@/content/siteContent';
import { cn } from '@/lib/cn';

/**
 * Shows a real Google Map when `contact.mapEmbedUrl` is set in content/siteContent.ts.
 * Until then it shows a clearly labelled placeholder (a faint street grid with a pin).
 */
export function MapPlaceholder({ className }: { className?: string }) {
  const frame = 'relative aspect-[16/10] overflow-hidden rounded-md border border-tone-rule bg-tone-surface';

  if (contact.mapEmbedUrl) {
    return (
      <div className={cn(frame, className)}>
        <iframe
          title="Map showing our office location"
          src={contact.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className={cn(frame, className)}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-tone-rule" preserveAspectRatio="none" viewBox="0 0 320 200">
        <g stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M0 140 L120 120 L200 150 L320 100" />
          <path d="M60 0 L90 200" />
          <path d="M200 0 L180 200" />
          <path d="M250 0 L270 200" />
          <path d="M0 50 L320 70" />
          <path d="M0 185 L320 170" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
        <MapPin aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 text-tone-accent" />
        <p className="text-eyebrow uppercase text-tone-accent">Map placeholder</p>
        <p className="max-w-narrow text-sm text-tone-muted">
          Add a Google Maps embed link as <code className="text-tone-fg">mapEmbedUrl</code> in
          content/siteContent.ts to show your location here.
        </p>
      </div>
    </div>
  );
}
