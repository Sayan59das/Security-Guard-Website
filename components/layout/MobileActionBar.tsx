'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { contact, quoteCta } from '@/content/siteContent';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * A slim Call / Request a Quote bar pinned to the bottom of the screen on phones.
 * It stays out of the way: hidden while the hero (which has the same two buttons) or the
 * contact form is on screen, and never shown from the md breakpoint up.
 */
export function MobileActionBar() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const contactSection = document.getElementById('contact');
    if (!hero || !contactSection) return;

    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(Boolean(entry?.isIntersecting)));
    const contactObserver = new IntersectionObserver(([entry]) => setContactVisible(Boolean(entry?.isIntersecting)));
    heroObserver.observe(hero);
    contactObserver.observe(contactSection);

    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  const visible = !heroVisible && !contactVisible;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'tone-dark fixed inset-x-0 bottom-0 z-40 border-t border-tone-rule bg-ink-900 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-1 shadow-lift transition-[transform,visibility] duration-500 motion-reduce:transition-none md:hidden',
        visible ? 'translate-y-0' : 'invisible translate-y-full',
      )}
    >
      <div className="grid grid-cols-2 gap-1">
        <Button href={`tel:${contact.phone.href}`} variant="secondary">
          <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
          Call Now
        </Button>
        <Button href={quoteCta.href}>{quoteCta.label}</Button>
      </div>
    </div>
  );
}
