# Features

A box is ticked only if the feature exists in the code and was checked. Anything that still depends on you (real photos, real numbers, a live email key) is called out.

## Implemented

### Whole site
- [x] Single page with anchor-linked sections in the agreed order
- [x] All editable content in one file, `content/siteContent.ts`, with `PLACEHOLDER` and `REVIEW` tags
- [x] Custom Tailwind theme: own palette (default blue/indigo removed), 8px spacing scale, radius by hierarchy (4 / 6 / 10px), type scale
- [x] Archivo (headings, set slightly wide) + Instrument Sans (body) through `next/font`
- [x] One icon set (lucide-react), no emoji
- [x] Business layout: left-aligned split section headings, white cards on paper, one brass highlight (see DESIGN.md)
- [x] Smooth motion with no animation library: staggered hero entrance with the photo fading in, scroll reveals that ease each section's blocks into place (staggered in grids), header shadow on scroll, card hover lift, button press; GPU-only (opacity and transform)
- [x] Eased in-page scrolling that takes longer for longer distances, stops when the visitor scrolls, updates the URL and moves focus to the target; "Back to top" returns to the very top
- [x] All motion off under `prefers-reduced-motion` (anchor links then jump instantly)
- [x] Skip-to-content link and visible focus ring on every interactive element
- [x] Mobile-first layout, checked at 390px, 768px and 1440px with no horizontal overflow
- [x] Extra: slim Call / Request a Quote bar pinned to the bottom on phones (hides over the hero and the contact form)

### Header
- [x] Top bar on large screens with office hours, email and phone
- [x] Sticky header with logo, six anchor links centred on the page, a call button and a "Request a Quote" button
- [x] "Services" dropdown (hover, click or Enter): pick a service and the quote form opens with it already chosen; Escape closes it
- [x] The link for the section being read is highlighted (home page only)
- [x] Mobile menu that eases open and shut: opens with Enter or Space, Tab moves straight into the links, Escape closes it and returns focus, a link choice or outside click closes it

### Hero
- [x] Clean split with nothing overlapping: headline, one supporting sentence and two CTAs (Request a Quote, Call) on the left, the photo in a brass-edged frame on the right (below the buttons on phones)
- [x] A strip of three promises under the hero (background-checked guards, supervisor visits, replacement), taken from "Why choose us"
- [ ] Real photo (placeholder file in use; at least 1200 x 1200, guard near the centre)
- [ ] Owner has confirmed the three promises in the strip are true (`REVIEW` tag)

### Services
- [x] Six services with icon, title and short description: residential, commercial/office, event, industrial/warehouse, night patrol and gatekeeping, personal/VIP
- [x] White cards with a navy icon tile
- [x] "Get a quote" on each card jumps to the form with that service already chosen

### Impact
- [x] Six figures (years, branches, clients, sites, trained guards, cities) in white tiles, each with an icon and a number that counts up the first time it scrolls into view
- [x] The final number is in the server-rendered HTML, so it shows without JavaScript and for visitors who prefer reduced motion; screen readers hear the final number once
- [x] Clearly marked "Sample figures" until `placeholder: false`
- [ ] Real figures (round sample numbers in use)

### Why choose us
- [x] Five points: verified guards, training and uniforms, fast deployment, supervisor visits, replacement guarantee (shown as the brass highlight)
- [ ] Owner has confirmed each point is true for the business (`REVIEW` tags)

### Technology spotlight
- [x] Pitch and four points (logged patrol rounds, shift reports, CCTV and alarm support, incident alerts) beside a "sample shift report" card, labelled as an illustration
- [ ] Owner has confirmed which of these they really provide (`REVIEW` tag)

### How it works
- [x] Four steps as a numbered timeline beside the photo (the photo stays in view on large screens)
- [ ] Real photo (placeholder file in use)

### Industries
- [x] Ten industries as tiles, each with an icon and a one-line note

### Clients
- [x] Slow endless strip of client tiles with a visible Pause / Play button (WCAG 2.2.2), also pausing on hover; a still, wrapped grid for visitors who prefer reduced motion
- [ ] Real client names, with permission (placeholders in use; logos can be added later)

### Testimonials
- [x] Six sample testimonials in a sideways-scrolling row (swipe, trackpad, keyboard, or Previous / Next buttons): three visible on a wide screen, one on a phone, each with a visible "Placeholder" tag until `placeholder: false`
- [ ] Real testimonials, with permission

### Call-to-action band
- [x] Navy band before the FAQ with one sentence, Request a Quote and Call buttons

### FAQ
- [x] Seven questions: pricing, training, replacement, minimum contract, armed vs unarmed, emergency deployment, areas covered
- [x] Two columns: heading and a direct phone line on the left, the questions on the right
- [x] Accessible accordion that eases open and shut: real buttons, `aria-expanded` / `aria-controls`, Enter and Space, collapsed answers removed from the tab order
- [ ] Owner has confirmed the answers match company policy (`REVIEW` tags)

### Contact
- [x] Form with name, phone, email (optional), service, location and message, in a raised white panel
- [x] Validation in the browser and again on the server, from one shared Zod schema; Indian mobile numbers accepted with or without +91
- [x] Inline errors linked to fields, first invalid field gets focus
- [x] Loading, success and error states, with focus moved to the outcome message
- [x] Server field errors mapped back onto the matching fields
- [x] Spam protection: honeypot field, per-IP rate limit, 10 KB body limit, same-origin check
- [x] Email delivery through Resend with environment-variable credentials; with no key it logs to the console in development and fails visibly in production
- [ ] Verified end to end with a live Resend key (needs your key and domain; see README)
- [x] Contact details (phone, email, address, hours) beside the form
- [x] Map placeholder, with support for a real Google Maps embed through `contact.mapEmbedUrl`

### Footer
- [x] Four columns: about line, licence / registration placeholder and social links, quick links with a Policy group, services, contact details; copyright and "Back to top"
- [x] Social links appear only for addresses filled in `footer.social`, so no link points nowhere

### Privacy policy
- [x] `/privacy-policy` page, written from what the site actually does (form fields, email delivery, hosting, no analytics or ad cookies), linked from the footer and under the quote form, and listed in the sitemap
- [ ] Date added and text checked by someone qualified (`REVIEW` tag)

### SEO and sharing
- [x] Page title, description, canonical URL
- [x] Open Graph and Twitter card tags
- [x] LocalBusiness JSON-LD generated from the content file
- [x] `sitemap.xml` and `robots.txt`
- [x] Favicon (SVG) and Apple touch icon
- [ ] Designed social sharing image (a placeholder card is in `public/og-image.png`)

## Planned

- [ ] Online quote calculator (number of guards, shifts, duration)
- [ ] Guard booking request with date and time
- [ ] WhatsApp click-to-chat
- [ ] Client login and portal
- [ ] Admin dashboard to view enquiries (FastAPI + database)
- [ ] English / Hindi language support
- [ ] Blog or safety tips
- [ ] Google Reviews integration
- [ ] Live chat

Smaller ideas worth considering:

- [ ] Shared rate-limit store (Upstash Redis) and a CAPTCHA if spam appears
- [ ] Automated end-to-end tests (Playwright) for the form and menu
- [ ] Content-Security-Policy with nonces

## Non-functional requirements

Measured on a local production build (`next build` then `next start`), Lighthouse mobile profile with simulated slow 4G, on the build that contains placeholder images. Re-measure after real photos go in.

### Performance
- Target: Lighthouse performance 90 or higher, layout shift under 0.1, no long main-thread blocking
- Measured: performance **99**, cumulative layout shift **0**, total blocking time **0 ms**, first contentful paint 0.9 s, largest contentful paint 2.1 s
- First-load JavaScript for the page: 135 kB (no animation library; all motion is CSS plus small IntersectionObserver scripts). It was 124 kB before the impact counters, client strip, carousel and Services dropdown were added; the Lighthouse figures below pre-date that change.
- Smoothness, measured on the current design in headless Chrome with the CPU slowed 4x: layout shift **0** at 1440px and 390px, **100%** of frames on time (60fps) while scrolling the whole page, 7 ms of main-thread blocking on the phone profile
- The Lighthouse figures above were taken on the first version of the design; run Lighthouse again before launch
- Fonts are self-hosted through `next/font` with `display: swap`; images are served as WebP through `next/image` with explicit sizes
- Open: these figures use placeholder images. Real photos will change the largest contentful paint, so measure again once they are in (keep each photo well under about 200 KB after optimisation).

### Accessibility
- Target: WCAG 2.2 AA
- Measured: Lighthouse accessibility **100**; axe-core reports **0 violations** at 360, 768 and 1280px (it could not auto-check text over the map placeholder's faint lines; those colours were computed by hand and pass at 7:1 or better)
- Colour pairs checked with the WCAG contrast formula (see DESIGN.md); body text 15:1, muted text on paper 5.3:1, accent text on paper 6.0:1
- Keyboard: the mobile menu, FAQ accordion, eased scrolling and every form state were exercised with scripted browser tests (Tab, Enter, Space, Escape, wheel interruption)
- Semantic landmarks, one `h1`, ordered headings, labelled form controls with errors announced
- Reduced motion respected (anchor links jump, no scroll reveal, no hero entrance, no menu or accordion animation), checked with a scripted browser test
- Not yet done: a manual pass with a screen reader (VoiceOver or NVDA) and testing on real phones

### SEO
- Target: complete metadata and structured data
- Measured: Lighthouse SEO **100**; one `h1`; every image has alt text; JSON-LD parses; sitemap and robots served
- Open: structured data and the page title still contain the placeholder company name, address and phone until you replace them

### Security
- Target: no trivially abusable endpoint, no secrets in the browser
- Done: server-side validation of every field, honeypot, rate limiting, body size limit, same-origin check, escaped email content, no email header injection, security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS), secrets only in server environment variables
- Limits, stated plainly: the rate limiter is per server instance (not shared); there is no CAPTCHA and no Content-Security-Policy
- Open: `npm audit` lists advisories against Next.js 14.2.35 that are fixed only in Next 15.5+ / 16. They were reviewed against the features this site uses and do not apply (details in README, "Security notes"), but an upgrade should be planned.
