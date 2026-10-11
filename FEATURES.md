# Features

A box is ticked only if the feature exists in the code and was checked. Anything that still depends on you (real photos, real numbers, a live email key) is called out.

## Implemented

### Whole site
- [x] Single page with anchor-linked sections in the agreed order
- [x] All editable content in one file, `content/siteContent.ts`, with `PLACEHOLDER` and `REVIEW` tags
- [x] Custom Tailwind theme: own palette (default blue/indigo removed), 8px spacing scale, 4px radius, type scale
- [x] Fraunces + Instrument Sans through `next/font`
- [x] One icon set (lucide-react), no emoji
- [x] Symmetrical layout: every section centred on one axis, equal-width columns, header nav in the true centre
- [x] Smooth motion: one shared easing curve, soft scroll reveals with staggering (Framer Motion, lazy-loaded), staggered hero entrance, eased menu and accordion
- [x] Eased in-page scrolling that takes longer for longer distances, stops when the visitor scrolls, updates the URL and moves focus to the target
- [x] All motion off under `prefers-reduced-motion` (anchor links then jump instantly)
- [x] Skip-to-content link and visible focus ring on every interactive element
- [x] Mobile-first layout, checked at 360px, 768px and 1280px with no horizontal overflow
- [x] Extra: slim Call / Request a Quote bar pinned to the bottom on phones (hides over the hero and the contact form)

### Header
- [x] Sticky header with logo, six anchor links centred on the page, a call icon and a "Request a Quote" button
- [x] Mobile menu that eases open and shut: opens with Enter or Space, Tab moves straight into the links, Escape closes it and returns focus, a link choice or outside click closes it

### Hero
- [x] Centred layout with a specific headline, one supporting sentence and two CTAs (Request a Quote, Call Now)
- [x] Three trust figures, clearly marked as sample figures until replaced
- [x] Wide photo in an even double frame, using `next/image` (priority loaded)
- [ ] Real photo (placeholder file in use)
- [ ] Real trust figures (placeholders in use)

### Services
- [x] Six services with icon, title and short description: residential, commercial/office, event, industrial/warehouse, night patrol and gatekeeping, personal/VIP
- [x] Open ruled grid layout (not repeated rounded cards)

### Why choose us
- [x] Five points: verified guards, training and uniforms, fast deployment, supervisor visits, replacement guarantee
- [ ] Owner has confirmed each point is true for the business (`REVIEW` tags)

### How it works
- [x] Four numbered steps in equal columns: enquiry, site assessment, deployment, ongoing support, under a wide photo
- [ ] Real photo (placeholder file in use)

### Industries
- [x] Ten industries, each with a one-line note, as a typographic two-column list

### Testimonials
- [x] Three sample testimonials in equal columns, each with a visible "Placeholder" tag until `placeholder: false`
- [ ] Real testimonials, with permission

### FAQ
- [x] Seven questions: pricing, training, replacement, minimum contract, armed vs unarmed, emergency deployment, areas covered
- [x] Accessible accordion that eases open and shut: real buttons, `aria-expanded` / `aria-controls`, Enter and Space, collapsed answers removed from the tab order
- [ ] Owner has confirmed the answers match company policy (`REVIEW` tags)

### Contact
- [x] Form with name, phone, email (optional), service, location and message
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
- [x] About line, quick links, contact details, copyright and a licence / registration placeholder

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

- [ ] Clicking a service pre-selects it in the form
- [ ] Highlight the current section in the header navigation
- [ ] Shared rate-limit store (Upstash Redis) and a CAPTCHA if spam appears
- [ ] Automated end-to-end tests (Playwright) for the form and menu
- [ ] Content-Security-Policy with nonces

## Non-functional requirements

Measured on a local production build (`next build` then `next start`), Lighthouse mobile profile with simulated slow 4G, on the build that contains placeholder images. Re-measure after real photos go in.

### Performance
- Target: Lighthouse performance 90 or higher, layout shift under 0.1, no long main-thread blocking
- Measured: performance **99**, cumulative layout shift **0**, total blocking time **0 ms**, first contentful paint 0.9 s, largest contentful paint 2.1 s
- First-load JavaScript for the page: 139 kB; Framer Motion loads afterwards as a separate chunk
- Fonts are self-hosted through `next/font` with `display: swap`; images are served as WebP through `next/image` with explicit sizes
- Open: these figures use placeholder images. Real photos will change the largest contentful paint, so measure again once they are in (keep each photo well under about 200 KB after optimisation).

### Accessibility
- Target: WCAG 2.2 AA
- Measured: Lighthouse accessibility **100**; axe-core reports **0 violations** at 360, 768 and 1280px (it could not auto-check text over the map placeholder's faint lines; those colours were computed by hand and pass at 7:1 or better)
- Colour pairs checked with the WCAG contrast formula (see DESIGN.md); body text 15:1, muted text on paper 5.3:1, accent text on paper 6.0:1
- Keyboard: the mobile menu, FAQ accordion, eased scrolling and every form state were exercised with scripted browser tests (Tab, Enter, Space, Escape, wheel interruption)
- Semantic landmarks, one `h1`, ordered headings, labelled form controls with errors announced
- Reduced motion respected (anchor links jump, no reveal, no hero entrance, no menu or accordion animation)
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
