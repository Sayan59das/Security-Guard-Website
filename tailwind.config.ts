import type { Config } from 'tailwindcss';

/**
 * Theme tokens for the site. The reasoning behind every value is in DESIGN.md.
 *
 * Two deliberate departures from Tailwind defaults:
 *  1. `colors` is replaced, not extended, so the default blue/indigo/slate palettes
 *     cannot be used by accident.
 *  2. `spacing` is replaced with a strict 8px scale. Key N means N x 8px, so
 *     `p-2` = 16px and `py-12` = 96px. The only sub-8 step is `0.5` (4px).
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Cards and form panels on the paper background.
      white: '#FFFFFF',
      ink: {
        950: '#0A121B',
        900: '#101B27',
        800: '#182635',
        700: '#243648',
        600: '#38495C',
        500: '#53657A',
        400: '#7C8DA0',
        300: '#A8B5C3',
        200: '#CDD5DD',
      },
      paper: {
        50: '#FBF9F4',
        100: '#F6F1E7',
        200: '#ECE5D5',
        300: '#DDD3BE',
      },
      brass: {
        300: '#DDBE80',
        400: '#CDA55C',
        500: '#B98E42',
        600: '#97702A',
        700: '#775519',
      },
      line: {
        DEFAULT: '#D8CEB9',
        dark: '#2A3A4B',
      },
      danger: {
        DEFAULT: '#A63A2A',
        'on-dark': '#F0A596',
      },
      success: {
        DEFAULT: '#2E6A4D',
        'on-dark': '#8FD0AE',
      },
      // Tone tokens. Their values switch per section via .tone-light / .tone-sand /
      // .tone-dark in app/globals.css, so one set of classes works on every background.
      tone: {
        bg: 'var(--tone-bg)',
        fg: 'var(--tone-fg)',
        muted: 'var(--tone-muted)',
        accent: 'var(--tone-accent)',
        rule: 'var(--tone-rule)',
        surface: 'var(--tone-surface)',
      },
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '4px',
      1: '8px',
      1.5: '12px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      12: '96px',
      16: '128px',
      20: '160px',
    },
    // Three steps of rounding that follow hierarchy: controls 4px, fields 6px, cards and panels 10px.
    borderRadius: {
      none: '0px',
      DEFAULT: '4px',
      md: '6px',
      lg: '10px',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
      lift: '0 1px 2px rgba(16, 27, 39, 0.08), 0 16px 32px -20px rgba(16, 27, 39, 0.45)',
      // Only for the contact form panel, so it reads as the place to act.
      panel: '0 2px 4px rgba(10, 18, 27, 0.08), 0 24px 48px -24px rgba(10, 18, 27, 0.55)',
    },
    fontFamily: {
      heading: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      sans: ['var(--font-instrument)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      brand: ['1.125rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      eyebrow: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '600' }],
      sm: ['0.9375rem', { lineHeight: '1.6' }],
      base: ['1.0625rem', { lineHeight: '1.7' }],
      lead: ['clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)', { lineHeight: '1.6' }],
      h4: ['1.0625rem', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
      h3: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      h2: ['clamp(1.875rem, 1.35rem + 1.9vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      stat: ['clamp(1.75rem, 1.4rem + 1.3vw, 2.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      display: ['clamp(2.25rem, 1.5rem + 2.9vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
    },
    maxWidth: {
      none: 'none',
      full: '100%',
      container: '75rem', // 1200px
      prose: '38rem',
      measure: '34rem',
      narrow: '26rem',
      reading: '46rem', // centred headings and the FAQ column
      wide: '64rem', // centred blocks that should not run the full 1200px
    },
    extend: {
      screens: {
        xs: '480px',
      },
      // One easing and one duration for every hover, menu and accordion change, so the
      // whole site moves the same way: quick to start, long gentle settle.
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      // Used with `motion-safe:` so they never run for visitors who ask for less motion.
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // The hero photo: fades in while settling from very slightly larger, like a lens focusing.
        settle: {
          from: { opacity: '0', transform: 'scale(1.03)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.45s ease-out both',
        settle: 'settle 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
