'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { contact, nav, quoteCta } from '@/content/siteContent';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

const MENU_ID = 'mobile-menu';

/**
 * Symmetrical by construction: on desktop the header is a three-part grid (1fr / auto / 1fr),
 * so the navigation sits in the exact centre of the page whatever the width of the logo
 * on the left or the buttons on the right.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While the menu is open: Escape closes it (and returns focus to the toggle),
  // and so does a click or tap anywhere outside the header.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  // If the window grows to the desktop layout, make sure the mobile menu is not left open.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  return (
    <header ref={headerRef} className="tone-dark sticky top-0 z-50 border-b border-tone-rule bg-ink-900 text-tone-fg">
      <div className="mx-auto grid h-9 w-full max-w-container grid-cols-[1fr_auto] items-center gap-2 px-2 sm:px-3 lg:grid-cols-[1fr_auto_1fr] lg:px-4">
        <a href="/" className="shrink-0 justify-self-start">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm font-medium text-tone-muted transition-colors hover:text-tone-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-1.5">
          <a
            href={`tel:${contact.phone.href}`}
            aria-label={`Call ${contact.phone.display}`}
            title={contact.phone.display}
            className="hidden h-6 w-6 items-center justify-center rounded border border-tone-rule text-tone-fg transition-colors hover:border-tone-muted lg:inline-flex"
          >
            <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
          </a>
          <Button href={quoteCta.href} className="hidden sm:inline-flex">
            {quoteCta.label}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-6 w-6 items-center justify-center rounded border border-tone-rule text-tone-fg transition-colors hover:border-tone-muted lg:hidden"
          >
            {open ? <X aria-hidden="true" strokeWidth={1.5} className="h-3 w-3" /> : <Menu aria-hidden="true" strokeWidth={1.5} className="h-3 w-3" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu: a `.collapsible` panel (see app/globals.css), so it eases open and shut. */}
      <div
        id={MENU_ID}
        data-open={open}
        aria-hidden={!open}
        className={cn('collapsible absolute inset-x-0 top-full bg-ink-900 shadow-lift lg:hidden', open && 'border-b border-tone-rule')}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="mx-auto max-h-[calc(100dvh-72px)] max-w-container overflow-y-auto px-2 pb-4 pt-1 sm:px-3">
            <ul>
              {nav.map((item) => (
                <li key={item.href} className="border-b border-tone-rule">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-7 items-center font-serif text-h3 text-tone-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-1.5 xs:grid-cols-2">
              <Button href={quoteCta.href} onClick={() => setOpen(false)}>
                {quoteCta.label}
              </Button>
              <Button href={`tel:${contact.phone.href}`} variant="secondary">
                <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
                Call Now
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
