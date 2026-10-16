'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { contact, nav, quoteCta, services } from '@/content/siteContent';
import { pickService } from '@/lib/servicePick';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

const MENU_ID = 'mobile-menu';
const SERVICES_MENU_ID = 'services-menu';

/** The nav link whose panel is a dropdown listing every service. */
const DROPDOWN_HREF = '/#services';

/** "/#faq" -> "faq": the id of the section a nav link points to. */
const sectionId = (href: string) => href.replace(/^\/?#/, '');

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

  // Desktop "Services" dropdown: opens on hover (mouse) or on click / Enter / Space, closes on
  // Escape (focus returns to its button), on a click outside, or when focus leaves it.
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!servicesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) setServicesOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [servicesOpen]);

  // Highlight the nav link of the section the visitor is reading. Only on the home page, where
  // those sections exist. A section counts while it crosses a thin band a little above the
  // middle of the screen; between nav sections nothing is highlighted.
  const pathname = usePathname();
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    if (pathname !== '/') {
      setActiveId('');
      return;
    }
    const sections = nav
      .map((item) => document.getElementById(sectionId(item.href)))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0 || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActiveId(id);
          else setActiveId((current) => (current === id ? '' : current));
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // A soft shadow once the page has scrolled, so the header separates from the content
  // passing under it. One passive listener, at most one state change per frame.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // If the window grows to the desktop layout, make sure the mobile menu is not left open.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const linkClass = (active: boolean) =>
    cn(
      'relative inline-flex items-center gap-0.5 py-0.5 text-sm font-medium transition-colors hover:text-tone-fg',
      active ? 'text-tone-fg' : 'text-tone-muted',
    );
  const underline = (active: boolean) => (
    <span
      aria-hidden="true"
      className={cn(
        'absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-brass-300 transition-transform duration-300',
        active ? 'scale-x-100' : 'scale-x-0',
      )}
    />
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        'tone-dark sticky top-0 z-50 border-b border-tone-rule bg-ink-900 text-tone-fg transition-shadow duration-500',
        scrolled && 'shadow-lift',
      )}
    >
      <div className="mx-auto grid h-9 w-full max-w-container grid-cols-[1fr_auto] items-center gap-2 px-2 sm:px-3 lg:grid-cols-[1fr_auto_1fr] lg:px-4">
        <a href="/" className="shrink-0 justify-self-start">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-4">
            {nav.map((item) => {
              const active = activeId === sectionId(item.href);

              if (item.href !== DROPDOWN_HREF) {
                return (
                  <li key={item.href}>
                    <a href={item.href} aria-current={active ? 'location' : undefined} className={linkClass(active)}>
                      {item.label}
                      {underline(active)}
                    </a>
                  </li>
                );
              }

              return (
                <li
                  key={item.href}
                  ref={servicesRef}
                  className="relative"
                  onPointerEnter={(event) => event.pointerType === 'mouse' && setServicesOpen(true)}
                  onPointerLeave={(event) => event.pointerType === 'mouse' && setServicesOpen(false)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
                  }}
                >
                  <button
                    ref={servicesButtonRef}
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls={SERVICES_MENU_ID}
                    // A keyboard press (detail 0) toggles; a mouse or touch click keeps it open, so a
                    // click right after the hover-open does not slam it shut again.
                    onClick={(event) => setServicesOpen((value) => (event.detail === 0 ? !value : true))}
                    aria-current={active ? 'location' : undefined}
                    className={linkClass(active)}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className={cn('h-2 w-2 transition-transform duration-300', servicesOpen && 'rotate-180')}
                    />
                    {underline(active)}
                  </button>

                  {servicesOpen ? (
                    <div
                      id={SERVICES_MENU_ID}
                      className="absolute left-1/2 top-full z-50 w-[24rem] -translate-x-1/2 pt-2 motion-safe:animate-fade-in"
                    >
                      <div className="rounded-lg border border-tone-rule bg-ink-800 p-1 shadow-lift">
                        <p className="px-1.5 pb-0.5 pt-1 text-sm text-tone-muted">Request a quote for:</p>
                        <ul>
                          {services.map((service) => (
                            <li key={service.id}>
                              <a
                                href={quoteCta.href}
                                onClick={() => {
                                  pickService(service.title);
                                  setServicesOpen(false);
                                }}
                                className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium text-tone-fg transition-colors hover:bg-ink-700"
                              >
                                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-tone-rule text-tone-accent">
                                  <Icon name={service.icon} className="h-2 w-2" />
                                </span>
                                {service.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-1 border-t border-tone-rule pt-1">
                          <a
                            href={item.href}
                            onClick={() => setServicesOpen(false)}
                            className="block rounded-md px-1.5 py-1 text-sm font-semibold text-tone-accent transition-colors hover:bg-ink-700"
                          >
                            See all services
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-1.5">
          <a
            href={`tel:${contact.phone.href}`}
            aria-label={`Call ${contact.phone.display}`}
            title={contact.phone.display}
            className="hidden h-6 w-6 items-center justify-center rounded border border-tone-rule text-brass-300 transition-colors hover:border-tone-muted lg:inline-flex"
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
                    className="flex min-h-7 items-center font-heading text-h3 font-semibold text-tone-fg"
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
