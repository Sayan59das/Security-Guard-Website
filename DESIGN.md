# Design direction

> Everything below is implemented in `tailwind.config.ts`, `app/globals.css` and `components/`.
> Version 2: the first version (a centred, ruled "duty logbook" with a serif) read as calm but too plain for a business that needs enquiries. This version keeps its palette and accessibility work and gives the page a clear commercial shape.

1. **Concept: uniform navy and badge brass, built to get a call.** Visitors are housing society secretaries, shop owners, plant managers and event organisers, often worried and often on a phone. Every section either builds trust or offers the next step (call, or request a quote), and the quote form is never more than one click away.
2. **The hero is a clean split where nothing overlaps.** On plain navy: the headline, one supporting line and the two actions (Request a Quote, Call) on the left; the photo in its own frame on the right, with a brass line a constant 8px outside it; a row of three trust figures underneath. On phones the photo follows the buttons. No text or form ever sits on top of the photo. Everything after the hero is deliberately quiet.
3. **Palette:** night navy `#101B27` (ink-900: header, hero, dark sections) · deeper `#0A121B` (ink-950: top bar, footer) · warm paper `#F6F1E7` (page) · sand `#ECE5D5` (alternate sections) · white `#FFFFFF` (cards and form panels) · one accent, brass `#B98E42` (fills, the guarantee panel) / `#775519` (text on light) / `#DDBE80` (text on dark). Navy and brass come from the trade itself: uniforms and badges.
4. **Fonts:** **Archivo** for headings and figures, set slightly wide (`wdth` 108) and semibold, so headings have the solid, stamped feel of lettering on a uniform badge; **Instrument Sans** for body, UI and forms. Body 17px / 1.7. Labels are sentence case (no tracked-out capitals).
5. **Spacing:** strict 8px system. Tailwind spacing is *overridden*: key `1` = 8px, `2` = 16px, `3` = 24px, `4` = 32px, `6` = 48px, `8` = 64px, `12` = 96px, `16` = 128px (only `0.5` = 4px exists, for icon nudges). Sections breathe at 96px (64px on mobile). Content max width 1200px.
6. **Shape follows hierarchy:** radius 4px for buttons and small controls, 6px for form fields and icon tiles, 10px for cards and panels. 1px hairline borders in `#D8CEB9` on paper and `#2A3A4B` on navy. Two shadows only: `panel` under the contact form so it reads as the place to act, and `lift` under the mobile menu and the sticky call bar.
7. **Layout, top of page:** a thin *top bar* (office hours, email, phone; large screens only) above a sticky navy *header* (logo, centred nav, call button, Request a Quote). *Hero* as above, closed by a band of three trust figures. *Services*: a split heading (title left, intro right) over a 3 x 2 grid of white cards, each with a navy icon tile and a "Get a quote" link that opens the form with that service already chosen.
8. **Layout, middle:** *Why us* on navy: five promises in raised panels, with the replacement guarantee spanning two columns in brass as the single highlight. *How it works* on sand: the photo on the left (it stays in view on large screens) and the four steps as a numbered timeline joined by a line, because they really are a sequence. *Industries*: ten compact white tiles with an icon, a name and a one-line note.
9. **Layout, bottom:** *Testimonials* in three white panels with the attribution pinned to the bottom and a visible "Placeholder" tag until real quotes are in. A navy *call-to-action band* with a brass top edge. *FAQ* in two columns: heading and a direct phone line on the left, the accordion in one white panel on the right. *Contact* a 50/50 split: navy details panel with icon tiles and map placeholder, and the full form in a raised white panel. *Footer* in four columns: about and licence, quick links, services, contact.
10. **Motion: smooth, quiet and cheap to render.** The page opens with a staggered hero entrance (label, headline, text, buttons) while the photo fades in and settles. Further down, each section's heading and blocks ease up into place the first time they scroll into view, with cards in a grid starting 90ms apart. The header gains a soft shadow once the page scrolls; service cards lift slightly on hover (the whole card is the link); buttons press 1px; menu and accordion ease open; in-page links glide with an eased scroll. Only opacity and transform are animated, so the browser does the work on the GPU without re-laying out the page (measured: no layout shift, 100% of scroll frames on time at 60fps with the CPU slowed 4x). Everything is off under `prefers-reduced-motion`, and nothing is ever hidden unless the reveal script is running.
11. **Imagery and icons:** `next/image` with clearly named placeholder files in `public/images/placeholders/` (each shows its own filename). The hero photo is cropped from the centre (tall frame on large screens, wide on phones), so its placeholder is square with the label in the middle. One icon set only: lucide-react, 1.5px stroke, never emoji.

---

## Tokens in detail

### Colour

| Token | Hex | Used for |
| --- | --- | --- |
| `ink-950` | `#0A121B` | Top bar, footer, hero figures band, text on brass |
| `ink-900` | `#101B27` | Header, hero, dark sections, icon tiles, step numbers, body text on light |
| `ink-800` | `#182635` | Raised panels on navy (Why us) |
| `ink-700` | `#243648` | Hairlines on dark (`line-dark` is `#2A3A4B`) |
| `ink-600` | `#38495C` | Secondary text on sand |
| `ink-500` | `#53657A` | Muted text on paper and white (5.3:1 / 6.0:1) |
| `ink-400` | `#7C8DA0` | Form borders (3.2:1 on white field), dim text on navy |
| `ink-300` | `#A8B5C3` | Muted text on navy (8.3:1) |
| `white` | `#FFFFFF` | Cards, tiles, form panels, FAQ panel |
| `paper-50` | `#FBF9F4` | Form fields |
| `paper-100` | `#F6F1E7` | Page background |
| `paper-200` | `#ECE5D5` | Alternate "sand" sections |
| `paper-300` | `#DDD3BE` | Strong hairlines, the step timeline line |
| `brass-300` | `#DDBE80` | Accent text on navy (9.7:1), focus ring on navy |
| `brass-400` | `#CDA55C` | Button hover |
| `brass-500` | `#B98E42` | Button fill, guarantee panel, hero photo frame, link underlines |
| `brass-700` | `#775519` | Accent text on paper (6.0:1), focus ring on paper |
| `danger` / `success` | `#A63A2A` / `#2E6A4D` | Form states (with `-on-dark` variants) |

The default Tailwind palette (blue, indigo, slate and the rest) is removed from the theme, so it cannot be used by accident.

Contrast checked with a script (WCAG formula): body on paper 15.4:1, body on white 17.4:1, muted on paper 5.3:1, muted on white 6.0:1, muted on sand 4.8:1, accent text on paper 6.0:1, muted on navy 8.3:1, muted on raised navy panel 7.4:1, accent on navy 9.7:1, button text on brass 6.3:1, guarantee text on brass 5.8:1, error on paper 5.7:1.

### Type scale

| Token | Size | Line height | Notes |
| --- | --- | --- | --- |
| `display` | 36 → 60px (fluid) | 1.06 | Hero H1, Archivo 600, tracking -0.025em |
| `h2` | 30 → 44px (fluid) | 1.12 | Section titles, Archivo 600 |
| `h3` | 20px | 1.3 | Card titles, Archivo 600 |
| `h4` | 17px | 1.35 | Industry tiles, FAQ questions, Archivo 600 |
| `stat` | 28 → 40px (fluid) | 1 | Hero figures, Archivo 600, brass |
| `lead` | 18 → 20px | 1.6 | Intro paragraphs, Instrument Sans |
| `base` | 17px | 1.7 | Body |
| `small` | 15px | 1.6 | Captions, notes, legal |
| `eyebrow` | 14px | 1.4 | Section labels, sentence case, 600, brass, with a short brass rule |

All headings use Archivo at width 108 (`font-variation-settings: 'wdth' 108`, set in `globals.css`).

### Spacing (8px system)

`0.5` 4px · `1` 8px · `1.5` 12px · `2` 16px · `3` 24px · `4` 32px · `5` 40px · `6` 48px · `7` 56px · `8` 64px · `9` 72px · `10` 80px · `12` 96px · `16` 128px · `20` 160px.
Page gutters: 16px (mobile), 24px (sm), 32px (lg). Section padding: 64px (mobile), 96px (lg).

### Section rhythm (background sequence)

Top bar deep navy → Header navy → **Hero** navy photo → **Services** paper → **Impact** sand → **Why us** navy → **Technology** paper → **How it works** sand → **Industries** paper → **Clients** paper strip (hairlines above and below) → **Testimonials** sand → **Call-to-action band** navy → **FAQ** paper → **Contact** navy/paper split → **Footer** deep navy.

### Motion tokens

| Token | Value | Where |
| --- | --- | --- |
| `ease-smooth` (and the default easing) | `cubic-bezier(0.22, 1, 0.36, 1)`, quick to start, long gentle settle | Hover colours, menu, accordion, call bar |
| Default transition duration | 300ms | Hover and focus colour changes |
| Panel open/close | 500ms | Mobile menu and FAQ (`.collapsible` in `globals.css`) |
| Hero entrance | 0.9s rise, 0 / 80 / 200 / 320ms stagger | `animate-rise` (CSS, `motion-safe:` only) |
| Hero photo | 1.2s fade and settle from 103% scale, starts at 120ms | `animate-settle` |
| Scroll reveal | 0.9s, `ease-smooth`, 28px rise, starts as a block passes 8% above the bottom of the screen, siblings 90ms apart | `data-reveal` + `<RevealOnScroll>` (`globals.css`, `lib/reveal.ts`) |
| Card hover | 300ms lift of 4px, brass border, soft shadow | Service cards only (they are links) |
| Button press | 1px down while pressed | `<Button>` |
| Header shadow | 500ms fade-in of `shadow-lift` once scrolled | `<Header>` |
| Form states | 0.45s fade | Errors, error banner, thank-you message |
| Counters | 1.6s ease-out count from 0, starts as the figure passes 10% above the bottom of the screen | `<CountUp>` (Impact) |
| Client strip | 48s linear loop of two identical copies, paused by hover or the Pause button | `animate-marquee` (`tailwind.config.ts`), `<ClientMarquee>` |
| Testimonial row | Native snap scrolling; Previous / Next step one card, smooth unless reduced motion | `<TestimonialCarousel>` |
| Anchor scroll | ease-in-out cubic, 500ms + 0.12ms per pixel, capped at 1400ms | `<SmoothAnchors>` |

A hidden panel is `visibility: hidden`, so its contents leave the tab order and the accessibility tree. It becomes visible instantly on open and is hidden only after the closing animation ends.

### Accessibility decisions

- Visible focus on every interactive element: 2px outline, 3px offset, brass-700 on light and brass-300 on dark (`--focus-ring` switches per section).
- Form field ids are prefixed with a per-form id (`useId`), so they never clash with other ids on the page; labels, hints and errors stay correctly linked.
- Mobile menu and FAQ are real buttons with `aria-expanded` / `aria-controls`; Escape closes the menu and returns focus to its button.
- Form errors are linked with `aria-describedby`, announced with `role="alert"`, and the first invalid field is focused on submit.
- "Get a quote" links on service cards carry the service name for screen readers ("Get a quote: Event security").
- The hero entrance, scroll reveals, menu/accordion animations and eased scrolling are all off under `prefers-reduced-motion` (anchor links then jump instantly, and every block is simply there).
- Scroll reveals never hide content on their own: blocks are hidden only after the reveal script has started, and blocks already on screen at that moment are left visible.
- A skip link is the first focusable element.

### What we deliberately avoided

Text or forms layered over photos, glassmorphism, neon, gradient decoration, icons in gradient circles, emoji icons, numbered markers on things that are not a sequence, hover effects on things that cannot be clicked, animating layout properties (height, top, margin) on scroll, scroll-jacking (the wheel always scrolls natively), tracked-out capital labels, stock phrases ("cutting-edge", "seamless", "elevate", "unleash", "your trusted partner", "world-class"), and any invented statistic, licence, certification or rating.
