# Security guard company website

A single-page marketing site for a private security guard company in India. Its one job is to get a visitor to **request a quote or call**. It is built to feel calm and credible, not flashy, because most visitors are worried or in a hurry.

Sections, in order: sticky header, hero, services, why choose us, how it works, industries, testimonials, FAQ, contact form with details and map, footer.

> **Before you launch:** the company name, phone, email, address, photos, licence number, statistics and testimonials are all **placeholders**. See [Pre-launch checklist](#pre-launch-checklist).

## Tech stack

| Choice | Why |
| --- | --- |
| **Next.js 14** (App Router) + **TypeScript** | Static, fast pages with a built-in API route for the form; types catch content mistakes early. Pinned to 14.2.35 (see [Security notes](#security-notes)). |
| **Tailwind CSS 3** with a custom theme | Design tokens (colours, 8px spacing, type scale) live in one config file; the default blue/indigo palette is removed. |
| **Framer Motion** | One job only: a soft fade-up when a block scrolls into view. Loaded lazily and switched off for `prefers-reduced-motion`. |
| **React Hook Form** + **Zod** | Simple, accessible form state, and one validation schema shared by the browser and the server. |
| **@hookform/resolvers** | The official adapter that lets React Hook Form use a Zod schema. Without it we would hand-write that glue. |
| **Resend** | Simple transactional email with a free tier, used by the `/api/contact` route. |
| **next/font** (Fraunces + Instrument Sans) | Self-hosted fonts with no layout shift and no request to Google from the visitor's browser. |
| **lucide-react** | One consistent icon set (no emoji), tree-shaken so only the icons used are shipped. |
| **ESLint** (`eslint-config-next`) | Catches accessibility and React mistakes at build time. |
| PostCSS + Autoprefixer | Required by Tailwind. |

No other runtime dependencies. A three-line helper (`lib/cn.ts`) replaces `clsx`, and the rate limiter is hand-written (`lib/rateLimit.ts`).

## Folder structure

```
.
├── app/
│   ├── layout.tsx            Fonts, metadata, header/footer, structured data
│   ├── page.tsx              Puts the sections in order
│   ├── globals.css           Tone tokens, focus ring, collapsible panels, reduced-motion rules
│   ├── api/contact/route.ts  Form endpoint: validation, honeypot, rate limit, email
│   ├── sitemap.ts, robots.ts Search engine files
│   └── icon.svg, apple-icon.png   Favicon and touch icon
├── components/
│   ├── sections/             Hero, Services, WhyUs, HowItWorks, Industries, Testimonials, FAQ, Contact
│   ├── layout/               Header (with mobile menu), Footer, MobileActionBar
│   ├── ui/                   Container, Section, SectionHeading, Button, Icon, Reveal, Logo, PlaceholderTag
│   ├── ServiceCard.tsx, FAQItem.tsx, ContactForm.tsx, MapPlaceholder.tsx, JsonLd.tsx
│   └── SmoothAnchors.tsx     Eased scrolling for in-page links
├── content/
│   └── siteContent.ts       ALL editable text and business details (edit this one)
├── lib/
│   ├── contactSchema.ts      Zod schema shared by the form and the API route
│   ├── sendEnquiry.ts        Resend email, with a console fallback for local development
│   ├── rateLimit.ts          Small in-memory rate limiter
│   ├── siteUrl.ts            Resolves the public site URL
│   └── cn.ts                 Class-name helper
├── public/
│   ├── images/placeholders/  Clearly labelled placeholder photos (replace these)
│   └── og-image.png          Social sharing image (placeholder card)
├── DESIGN.md                 Design direction and tokens
├── FEATURES.md               What exists, what is planned, quality targets
├── tailwind.config.ts        Theme tokens
└── .env.example              Every environment variable, explained
```

## Prerequisites

- **Node.js 18.17 or newer** (developed on Node 24) and npm.
- Optional: a free [Resend](https://resend.com) account to receive enquiries by email. Not needed to run locally.

## Getting started

```bash
npm install
cp .env.example .env.local     # optional for local work, see below
npm run dev                    # http://localhost:3000
```

With no environment variables set, everything works locally. Submitting the contact form prints the enquiry in the terminal instead of emailing it.

### Environment variables (`.env.example`)

| Variable | Required? | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Your public address, e.g. `https://www.example.in`, no trailing slash. Used for canonical links, Open Graph tags, the sitemap and structured data. On Vercel it falls back to the project's production URL if unset, but set it once you have your own domain. |
| `RESEND_API_KEY` | Yes, in production | API key from the Resend dashboard. Empty in development: enquiries are logged to the terminal. Empty in production: the form returns an error on purpose, so you never believe leads are arriving when they are not. |
| `CONTACT_TO_EMAIL` | Yes, when a key is set | Where enquiries are delivered. Several addresses can be separated by commas. |
| `CONTACT_FROM_EMAIL` | Recommended | The sender address. It must be on a domain you have verified in Resend. Defaults to `onboarding@resend.dev`, Resend's sandbox sender, which only delivers to the email you signed up to Resend with. |

### Build and run for production

```bash
npm run build
npm run start     # http://localhost:3000
```

## Deployment to Vercel

1. Put the project in a Git repository and push it to GitHub, GitLab or Bitbucket.
2. On [vercel.com](https://vercel.com), choose **Add New, Project**, and import the repository. Vercel detects Next.js; keep the defaults.
3. Under **Settings, Environment Variables**, add `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` for the **Production** environment.
4. In Resend, add and verify your sending domain (it adds a few DNS records), then use an address on that domain for `CONTACT_FROM_EMAIL`.
5. Deploy. Under **Settings, Domains**, add your own domain.
6. **Send a real test enquiry** through the live form and confirm the email arrives. This is the one thing that cannot be checked until your Resend key is in place.

Image optimisation works automatically on Vercel. If you self-host with `next start` instead, run `npm install sharp` for fast image processing.

## How to edit content

Open **`content/siteContent.ts`**. It holds the company name, contact details, nav, hero text and figures, the six services, why-us points, process steps, industries, testimonials, FAQs, form wording and SEO text. No component needs to change.

Two tags mark work still to do. List them all with:

```bash
grep -n -E "PLACEHOLDER|REVIEW" content/siteContent.ts
```

- `PLACEHOLDER`: a made-up value so the page has something to show. Replace it.
- `REVIEW`: copy describing how the business works (training, checks, policies). Confirm it is true for your company or change it.

To use a real map, paste the `src` from Google Maps, Share, Embed a map into `contact.mapEmbedUrl`.

## Pre-launch checklist

- [ ] Company name, service area, phone, email, address and opening hours in `content/siteContent.ts`
- [ ] Licence or registration number in the footer (only if you hold one; leave nothing invented)
- [ ] Hero figures: set real numbers and `placeholder: false` (the "Sample figures" note then disappears)
- [ ] Testimonials: replace all three with real quotes, with permission, then `placeholder: false`
- [ ] Every item tagged `REVIEW` confirmed as true for your company
- [ ] Photos: replace the two files in `public/images/placeholders/` (keep the filenames, or update the paths and `alt` text in the content file)
- [ ] Logo: replace `components/ui/Logo.tsx` and `app/icon.svg` / `app/apple-icon.png`
- [ ] Social image: replace `public/og-image.png` (1200 x 630)
- [ ] Environment variables set in Vercel, and one live test enquiry received
- [ ] `NEXT_PUBLIC_SITE_URL` set to your real domain

## Design system summary

Calm and ruled, like a well-kept duty logbook. Full detail, with reasoning, is in **[DESIGN.md](./DESIGN.md)**.

- **Colour:** night navy `#101B27`, warm paper `#F6F1E7`, sand `#ECE5D5`, one muted brass accent `#B98E42` (text variants `#775519` on light, `#DDBE80` on dark). All text pairs meet WCAG AA.
- **Fonts:** Fraunces (serif, headings and numerals) with Instrument Sans (body and UI).
- **Spacing:** strict 8px system. In this project's Tailwind theme, `p-2` is **16px** and `py-12` is **96px** (the key is the number of 8px steps). Max content width 1200px.
- **Shape:** 4px radius, 1px hairline borders, one soft shadow used only on the mobile menu and call bar.
- **Layout:** symmetrical, with every section centred on one vertical axis and equal-width columns either side.
- **Motion:** one easing curve for everything, a soft fade-up on scroll, a staggered hero entrance and eased in-page scrolling, all off under `prefers-reduced-motion`.

## Scripts reference

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server at http://localhost:3000 |
| `npm run build` | Create the production build (also type-checks and lints) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run check` | Typecheck, lint and build in one go |

## Security notes

- **Form protection:** server-side Zod validation, a hidden honeypot field, a per-IP rate limit (5 requests per 10 minutes), a 10 KB body limit, a same-origin check, and HTML-escaped email bodies.
- **The rate limiter is in memory.** On Vercel each server instance keeps its own counter, so it stops casual spam and double-submits but not a determined attacker. If spam becomes a problem, swap `lib/rateLimit.ts` for a shared store such as Upstash Redis, or add a CAPTCHA such as Cloudflare Turnstile.
- **Security headers** are set in `next.config.mjs`. A Content-Security-Policy is not set, because it needs per-request nonces to coexist with Next's inline scripts.
- **Known advisories in Next.js 14.** `npm audit` reports advisories against `next@14.2.35`, the last 14.x release. They are fixed only in Next 15.5.21+ or 16.x. Reviewed against this project: it uses no Server Actions, no rewrites or redirects, no server-side `fetch` with request bodies, no Edge runtime, and no remote or user-supplied images, and it deploys to Linux on Vercel, so the reported issues do not apply to how the site is built. As defence in depth, AVIF image output is switched off (`next.config.mjs`). Plan an upgrade to Next 15.5 or newer when you are free to leave 14, and read the migration notes and re-run `npm run check` when you do.
- `npm audit` also lists PostCSS inside Next's own build tooling. That runs only at build time on this project's own CSS.
