# Design direction

> Decided before any code was written. Everything below is implemented in `tailwind.config.ts`, `app/globals.css` and `components/`.

1. **Concept: "the duty logbook", on one axis.** Calm, ruled, ledger-like, and symmetrical: every section is centred on the same vertical line, with equal-width columns either side of it. Sober like a well-kept guard register, not a tech product. No gradients, no glow, no stock-photo-and-shield look.
2. **Palette:** night navy `#101B27` (ink-900, base) · deeper `#0A121B` (ink-950, footer) · warm paper `#F6F1E7` (page) · sand `#ECE5D5` (alternate sections) · one accent, muted brass `#B98E42` (fills) / `#775519` (text on light) / `#DDBE80` (text on dark). Muted text `#53657A` on paper, `#A8B5C3` on navy. Error `#A63A2A`, success `#2E6A4D`. All text pairs pass WCAG AA (checked, see below).
3. **Fonts:** **Fraunces** (characterful serif, optical-size axis on, "wonk" off so it stays sober) for headings and numerals; **Instrument Sans** for body, UI and forms. Body 17px / 1.7 line height; headings 1.05–1.2.
4. **Spacing:** strict 8px system. Tailwind spacing is *overridden*: key `1` = 8px, `2` = 16px, `3` = 24px, `4` = 32px, `6` = 48px, `8` = 64px, `12` = 96px, `16` = 128px (only `0.5` = 4px exists, for icon nudges). Sections breathe at 96px (64px on mobile). Content max width 1200px.
5. **Radius / border / shadow:** radius 4px everywhere (6px for form fields and the image frame, never more; `full` only for status dots). Borders are 1px hairlines in a warm `#D8CEB9` on paper and `#2A3A4B` on navy. No shadows except one soft `lift` used on the mobile menu and the sticky call bar.
6. **Layout, top of page:** *Header* dark and continuous with the hero, a three-part grid (1fr / auto / 1fr) so the nav sits in the exact centre. *Hero* fully centred: eyebrow with a rule either side, serif headline, one line of support, two buttons, then a wide photo in an even double frame (brass line a constant 8px outside it on every side) and three equal trust figures divided by hairlines. *Services* a centred heading over an open ruled 3 x 2 grid (hairlines between cells, no floating cards).
7. **Layout, middle:** *Why us* on navy as a spec sheet: centred heading, then five ruled rows in a centred block (label left, explanation right). *How it works* a centred heading and photo, then four equal columns, each with a big serif numeral under a hairline. *Industries* pure typography: a two-column ruled list, five rows a side, no boxes.
8. **Layout, bottom:** *Testimonials* three equal columns with the attributions pinned to the same baseline and a visible "Placeholder" tag until real quotes are in. *FAQ* one centred reading-width column. *Contact* a true 50/50 split: navy panel (details and map placeholder) mirrored by the paper form, each running to its screen edge. *Footer* deep navy, three equal columns.
9. **Motion:** soft and consistent. One easing curve and one 300-500ms duration for every hover, menu and accordion change; a gentle fade-up on scroll reveal that starts 48px before a block arrives and staggers siblings; a staggered CSS entrance for the hero text; in-page links glide with an eased scroll that takes longer for longer distances. Everything is switched off under `prefers-reduced-motion`.
10. **Imagery and icons:** `next/image` with clearly named placeholder files in `public/images/placeholders/` (each shows its own filename). One icon set only: lucide-react, 1.5px stroke, never inside gradient circles, never emoji.

---

## Tokens in detail

### Colour

| Token | Hex | Used for |
| --- | --- | --- |
| `ink-950` | `#0A121B` | Footer, deepest surfaces, text on brass buttons |
| `ink-900` | `#101B27` | Header, hero, dark sections, body text on paper |
| `ink-800` | `#182635` | Raised areas on dark (form inputs on dark, stat strip) |
| `ink-700` | `#243648` | Hairlines on dark (`line-dark` is `#2A3A4B`) |
| `ink-600` | `#38495C` | Secondary text on sand |
| `ink-500` | `#53657A` | Muted text on paper (5.3:1) |
| `ink-400` | `#7C8DA0` | Form borders (3.2:1 on white field), dim text on navy |
| `ink-300` | `#A8B5C3` | Muted text on navy (8.3:1) |
| `paper-50` | `#FBF9F4` | Form fields, FAQ panel |
| `paper-100` | `#F6F1E7` | Page background |
| `paper-200` | `#ECE5D5` | Alternate "sand" sections |
| `paper-300` | `#DDD3BE` | Strong hairlines |
| `brass-300` | `#DDBE80` | Accent text on navy (9.7:1), focus ring on navy |
| `brass-400` | `#CDA55C` | Button hover |
| `brass-500` | `#B98E42` | Button fill, accent rules |
| `brass-700` | `#775519` | Accent text on paper (6.0:1), focus ring on paper |
| `danger` / `success` | `#A63A2A` / `#2E6A4D` | Form states (with `-on-dark` variants) |

The default Tailwind palette (blue, indigo, slate and the rest) is removed from the theme, so it cannot be used by accident.

Contrast checked with a script (WCAG formula): body on paper 15.4:1, muted on paper 5.3:1, muted on sand 4.8:1, accent text on paper 6.0:1, muted on navy 8.3:1, accent on navy 9.7:1, button text on brass 6.3:1, error on paper 5.7:1.

### Type scale

| Token | Size | Line height | Notes |
| --- | --- | --- | --- |
| `display` | 40 → 72px (fluid) | 1.04 | Hero H1, Fraunces 500, tracking -0.02em |
| `h2` | 32 → 48px (fluid) | 1.1 | Section titles, Fraunces 500 |
| `h3` | 22px | 1.3 | Card/row titles, Fraunces 500 |
| `lead` | 18 → 21px | 1.6 | Intro paragraphs, Instrument Sans |
| `base` | 17px | 1.7 | Body |
| `small` | 15px | 1.6 | Captions, legal |
| `eyebrow` | 13px | 1.4 | Uppercase, +0.14em tracking, 600, brass |

### Spacing (8px system)

`0.5` 4px · `1` 8px · `2` 16px · `3` 24px · `4` 32px · `5` 40px · `6` 48px · `8` 64px · `10` 80px · `12` 96px · `16` 128px · `20` 160px.
Page gutters: 16px (mobile), 24px (sm), 32px (lg). Section padding: 64px (mobile), 96px (lg).

### Section rhythm (background sequence)

Header navy → **Hero** navy → **Services** paper → **Why us** navy → **How it works** sand → **Industries** paper → **Testimonials** sand → **FAQ** paper → **Contact** navy/paper split → **Footer** deep navy. Dark and light alternate, but never twice the same layout.

### Motion tokens

| Token | Value | Where |
| --- | --- | --- |
| `ease-smooth` (and the default easing) | `cubic-bezier(0.22, 1, 0.36, 1)`, quick to start, long gentle settle | Hover colours, menu, accordion, call bar |
| Default transition duration | 300ms | Hover and focus colour changes |
| Panel open/close | 500ms | Mobile menu and FAQ (`.collapsible` in `globals.css`) |
| Scroll reveal | 0.9s, `cubic-bezier(0.25, 0.1, 0.25, 1)`, 16px rise, starts 48px early, sibling stagger 80-120ms | `<Reveal>` |
| Hero entrance | 0.9s rise, 0 / 80 / 200 / 320ms stagger | `animate-rise` (CSS, `motion-safe:` only) |
| Anchor scroll | ease-in-out cubic, 500ms + 0.12ms per pixel, capped at 1400ms | `<SmoothAnchors>` |

A hidden panel is `visibility: hidden`, so its contents leave the tab order and the accessibility tree. It becomes visible instantly on open and is hidden only after the closing animation ends.

### Accessibility decisions

- Visible focus on every interactive element: 2px outline, 3px offset, brass-700 on light and brass-300 on dark (`--focus-ring` switches per section).
- Mobile menu and FAQ are real buttons with `aria-expanded` / `aria-controls`; Escape closes the menu and returns focus to its button.
- Form errors are linked with `aria-describedby`, announced with `role="alert"`, and the first invalid field is focused on submit.
- Eased scrolling, the hero entrance, scroll reveals, and the menu/accordion animations are all off under `prefers-reduced-motion` (anchor links then jump instantly).
- A skip link is the first focusable element.

### What we deliberately avoided

Gradients, glassmorphism, neon, identical rounded cards with gradient icon circles, emoji icons, stock phrases ("cutting-edge", "seamless", "elevate", "unleash", "your trusted partner", "world-class"), and any invented statistic, licence or certification.
