/**
 * ALL editable business content lives in this one file.
 *
 * You do not need to touch any component to change names, numbers, services,
 * FAQs, testimonials or contact details.
 *
 * Two tags are used throughout so you can find work that is still to do:
 *
 *   PLACEHOLDER  a value I made up so the page has something to show. Replace it.
 *   REVIEW       copy that describes how the business works (training, checks,
 *                policies). I wrote it as a sensible draft. Confirm every REVIEW
 *                item is actually true for your company, or change it.
 *
 * Find everything with:   grep -n -E "PLACEHOLDER|REVIEW" content/siteContent.ts
 *
 * Nothing here states a licence, certification, award or statistic as fact.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** Icons available to the content below. Add new ones in components/ui/Icon.tsx. */
export type IconName =
  | 'house'
  | 'building'
  | 'calendar'
  | 'factory'
  | 'moon'
  | 'user-check'
  | 'badge-check'
  | 'graduation-cap'
  | 'timer'
  | 'clipboard-check'
  | 'refresh';

export interface NavItem {
  label: string;
  href: string;
}

export interface ImageContent {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Point {
  title: string;
  description: string;
  icon: IconName;
}

export interface Step {
  title: string;
  description: string;
}

export interface IndustryItem {
  name: string;
  note: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** While true, a visible "Placeholder" tag is shown next to the quote. */
  placeholder: boolean;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
  /** While true, the hero shows a small "sample figures" note. */
  placeholder: boolean;
}

/* -------------------------------------------------------------------------- */
/* Company and contact details                                                */
/* -------------------------------------------------------------------------- */

export const company = {
  // PLACEHOLDER: your company name. It appears in the header, footer, page title,
  // email subject lines and structured data.
  name: '[COMPANY NAME]',

  // PLACEHOLDER: the city or region you actually serve. Used in the FAQ and search data.
  serviceArea: '[CITY / REGION]',

  shortDescription:
    'Verified, trained security guards for homes, shops, offices, factories and events.',

  // PLACEHOLDER: licence or registration shown in the footer. In India, private
  // security agencies normally need a licence under the PSARA Act (2005) from the
  // state licensing authority. Put your own number here ONLY if you hold one.
  licence: {
    label: 'Licence / registration no.',
    value: '[LICENCE NUMBER]',
  },
} as const;

export const contact = {
  // PLACEHOLDER: replace both. `href` is digits only with country code, no spaces.
  phone: {
    display: '+91 00000 00000',
    href: '+910000000000',
  },
  // PLACEHOLDER
  email: 'hello@yourcompany.example',
  // PLACEHOLDER: structured so search engines can read it. Keep every field filled.
  address: {
    street: '[Street address]',
    locality: '[City]',
    region: '[State]',
    postalCode: '[PIN code]',
    country: 'IN',
  },
  // PLACEHOLDER: opening hours. Keep them honest, they are shown next to the form.
  hours: [
    { label: 'Office', value: '[Mon to Sat, 9:00 am to 7:00 pm]' },
    { label: 'Urgent calls', value: '[Add your out-of-hours arrangement]' },
  ],
  // Optional: paste the `src` from Google Maps > Share > Embed a map to replace
  // the map placeholder with a real map. Leave empty to keep the placeholder.
  mapEmbedUrl: '',
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const nav: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Why us', href: '#why-us' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const quoteCta = { label: 'Request a Quote', href: '#contact' } as const;

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

export const seo = {
  title: `Security Guard Services for Homes, Businesses and Events | ${company.name}`,
  description:
    'Verified, trained and supervised security guards for homes, shops, offices, factories and events. Request a quote or call us.',
  keywords: [
    'security guard services',
    'security guards for hire',
    'residential security guards',
    'office security guards',
    'event security',
    'factory security guards',
    'night patrol guards',
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Private security guard services',
  headline: 'Verified, trained security guards for your home, shop, factory or event.',
  supporting:
    'Every guard is background-checked, trained and supervised, and we replace anyone who is not right for your site.',
  primaryCta: { label: 'Request a Quote', href: '#contact' },
  secondaryCta: { label: 'Call Now' },
  image: {
    // PLACEHOLDER: replace with a real photo of your own guards (wide, about 21:9, works best).
    // Keep the alt text accurate to the photo you use.
    src: '/images/placeholders/hero-guard-at-gate.jpg',
    alt: 'A uniformed security guard checking a visitor’s details at the gate of a residential society',
    width: 1920,
    height: 823,
  } satisfies ImageContent,
  // PLACEHOLDER: these are NOT real figures. Replace with your own true numbers,
  // then set `placeholder: false` on each so the sample-figures note disappears.
  stats: [
    { value: '00+', label: 'Guards deployed', placeholder: true },
    { value: '00', label: 'Sites protected', placeholder: true },
    { value: '00', label: 'Years in business', placeholder: true },
  ] satisfies Stat[],
} as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export const servicesSection = {
  eyebrow: 'Services',
  title: 'Six kinds of cover, one standard of guard.',
  intro:
    'Tell us what you need to protect and when. We will recommend the number of guards and the shifts that make sense, and leave out the ones that do not.',
} as const;

export const services: Service[] = [
  {
    id: 'residential',
    title: 'Residential guards',
    description:
      'A guard at the gate of your house, apartment block or society. Logs visitors and deliveries, watches the entry points and knows who lives there.',
    icon: 'house',
  },
  {
    id: 'commercial',
    title: 'Commercial and office security',
    description:
      'Entrance and reception guards for shops, offices and clinics. Presentable and polite, and trained to handle visitors without making anyone feel watched.',
    icon: 'building',
  },
  {
    id: 'event',
    title: 'Event security',
    description:
      'Entry checks, crowd handling and parking control for weddings, exhibitions and corporate events. We see the venue first, then plan numbers and positions.',
    icon: 'calendar',
  },
  {
    id: 'industrial',
    title: 'Industrial and warehouse security',
    description:
      'Gate control, vehicle and material checks, and perimeter rounds for factories, godowns and building sites. Registers kept and handed over at every shift.',
    icon: 'factory',
  },
  {
    id: 'night-patrol',
    title: 'Night patrol and gatekeeping',
    description:
      'Guards on foot or at the gate for the hours when a place is empty or a lane goes quiet. Rounds run at fixed times and go in the log.',
    icon: 'moon',
  },
  {
    id: 'personal',
    title: 'Personal and VIP protection',
    description:
      'Discreet escort and close protection for individuals and families, planned after a proper talk about your routine, your routes and your worries.',
    icon: 'user-check',
  },
];

/* -------------------------------------------------------------------------- */
/* Why choose us                                                              */
/* -------------------------------------------------------------------------- */

export const whyUs = {
  eyebrow: 'Why choose us',
  title: 'The basics, done properly.',
  intro:
    'Most problems with security guards come down to a few things: someone who was never checked, never trained, did not turn up, or was never supervised. We built the service around fixing those.',
  // REVIEW: every point below describes how your company works. Confirm each is true.
  points: [
    {
      title: 'Verified guards',
      description:
        'We check each guard’s identity, address and background before posting them. Ask, and we will show you the file for the person at your gate.',
      icon: 'badge-check',
    },
    {
      title: 'Training and uniforms',
      description:
        'Guards complete our induction before their first shift: entry control, visitor handling, fire safety, basic first aid and writing up incidents. They arrive in a clean uniform, with ID.',
      icon: 'graduation-cap',
    },
    {
      title: 'Fast deployment',
      description:
        'Once the site visit is done and terms are agreed, we put guards in place quickly. If you need cover sooner than usual, call us and we will say plainly what is possible.',
      icon: 'timer',
    },
    {
      title: 'Supervisor visits',
      description:
        'A supervisor visits every site on a set schedule, checks attendance and the log book, and talks to you directly. Standards stay where they were on day one.',
      icon: 'clipboard-check',
    },
    {
      title: 'Replacement guarantee',
      description:
        'If a guard is absent, late, or just not the right fit for your premises, tell us and we send a replacement. You should never be left with an empty post.',
      icon: 'refresh',
    },
  ] satisfies Point[],
} as const;

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'From first call to a guard at your gate.',
  intro: 'Four steps. All you have to do is make the first call.',
  image: {
    // PLACEHOLDER: replace with a real photo, for example a supervisor walking a site with a client.
    src: '/images/placeholders/process-site-assessment.jpg',
    alt: 'A security supervisor walking a client through the entrances of a commercial building during a site assessment',
    width: 1600,
    height: 800,
  } satisfies ImageContent,
  steps: [
    {
      title: 'Enquiry',
      description:
        'Call us or send the form. Tell us what you want to protect, where it is and when you need cover. We call you back to talk it through.',
    },
    {
      title: 'Site assessment',
      description:
        'A supervisor visits, walks the premises and notes the entry points, blind spots and busy hours. You get a plain recommendation: how many guards, which shifts, and what it will cost.',
    },
    {
      title: 'Deployment',
      description:
        'Once you agree, we confirm everything in writing and post uniformed guards after a briefing on your site’s rules: who to let in, who to call, what goes in the log.',
    },
    {
      title: 'Ongoing support',
      description:
        'A supervisor keeps visiting, you have one phone number for any problem, and we replace a guard if things are not working. We review the arrangement with you as your needs change.',
    },
  ] satisfies Step[],
} as const;

/* -------------------------------------------------------------------------- */
/* Industries                                                                 */
/* -------------------------------------------------------------------------- */

export const industries = {
  eyebrow: 'Industries we serve',
  title: 'Places we guard, big and small.',
  intro: 'From a single gate to a whole campus. If it has an entrance, we can staff it.',
  items: [
    { name: 'Housing societies and apartments', note: 'Gate entry, visitor logs, deliveries and night rounds.' },
    { name: 'Shops and showrooms', note: 'A presentable guard at the door and an eye on the floor.' },
    { name: 'Offices and business centres', note: 'Reception desk, visitor passes and after-hours cover.' },
    { name: 'Factories and manufacturing units', note: 'Gate control, vehicle checks and shift handovers.' },
    { name: 'Warehouses and godowns', note: 'Loading-bay supervision and perimeter rounds.' },
    { name: 'Schools and colleges', note: 'Campus gates, pick-up times and visitor control.' },
    { name: 'Hospitals and clinics', note: 'Calm crowd handling and controlled entry points.' },
    { name: 'Construction sites', note: 'Material security and site access after working hours.' },
    { name: 'Banquet halls and event venues', note: 'Entry checks, parking and crowd flow.' },
    { name: 'Parking and commercial complexes', note: 'Barrier control, patrols and incident reporting.' },
  ] satisfies IndustryItem[],
} as const;

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

export const testimonialsSection = {
  eyebrow: 'Client feedback',
  title: 'What clients say.',
} as const;

// PLACEHOLDER: all three testimonials below are invented sample text. Do NOT publish
// them as real. Replace each one with a genuine quote, with the client’s permission,
// then set `placeholder: false`. Publishing made-up reviews can break consumer
// protection rules in India.
export const testimonials: Testimonial[] = [
  {
    quote:
      'The guard knows every resident by name now. Visitors are logged, couriers are stopped at the gate, and the committee has stopped getting complaints.',
    name: '[Client name]',
    role: 'Secretary, [Housing society name]',
    placeholder: true,
  },
  {
    quote:
      'When our regular guard fell ill, someone else was at the shop before we opened. We did not have to chase anybody.',
    name: '[Client name]',
    role: 'Owner, [Shop name]',
    placeholder: true,
  },
  {
    quote:
      'The supervisor turns up without being asked, checks the register and talks to us. That was the difference from our last agency.',
    name: '[Client name]',
    role: 'Plant manager, [Factory name]',
    placeholder: true,
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqSection = {
  eyebrow: 'Questions',
  title: 'Things people ask before they call.',
  intro: 'Not here? Call us or send the form and we will answer in plain words.',
} as const;

// REVIEW: these answers describe your policies. Confirm each one before launch.
export const faqs: FaqEntry[] = [
  {
    question: 'How is pricing worked out?',
    answer:
      'The price depends on how many guards you need, how long each shift is (8 or 12 hours), how many days a week, and the type of site. We give a written quote after a short call or a site visit, so you pay for the cover you actually need. Ask what the quote includes before you compare it with anyone else’s.',
  },
  {
    question: 'What training do your guards get?',
    answer:
      'Before their first posting, every guard goes through our induction: controlling entry and exit, handling visitors politely, basic fire safety, first-aid awareness and writing up incidents in the log. Guards posted to factories, events or other specialised sites also get a briefing on that site’s rules before they start.',
  },
  {
    question: 'What if a guard does not turn up or is not right for my site?',
    answer:
      'Call us. If a guard is absent, late or simply not the right fit, we arrange a replacement. You should not have to run after anyone to get one. Tell us what went wrong so that it does not happen again.',
  },
  {
    question: 'Is there a minimum contract period?',
    answer:
      'Regular guard posts are usually arranged on a monthly, renewable basis, and we agree the minimum period with you in writing before anyone is posted. Events and one-off jobs are quoted per event.',
  },
  {
    question: 'Are your guards armed or unarmed?',
    answer:
      'Our standard guards are unarmed. For most homes, shops, offices and factories, a trained and alert unarmed guard, backed by a supervisor, is what the job needs. If you think your site needs an armed guard, tell us and we will explain plainly what the rules allow and what we can arrange.',
  },
  {
    question: 'Can you place a guard in an emergency?',
    answer: `Call us on ${contact.phone.display}. Whether we can post a guard the same day depends on the site and on who is available near you. We would rather tell you honestly what we can do than promise a time we cannot keep.`,
  },
  {
    question: 'Which areas do you cover?',
    answer: `We currently place guards in ${company.serviceArea} and nearby areas. If you are outside it, send us the location and we will tell you honestly whether we can help.`,
  },
];

/* -------------------------------------------------------------------------- */
/* Contact section and form                                                   */
/* -------------------------------------------------------------------------- */

export const contactSection = {
  eyebrow: 'Request a quote',
  title: 'Tell us what you need to protect.',
  intro:
    'Fill in the form and we will call you back to talk it through. If it cannot wait, call us now.',
  formTitle: 'Your details',
  formNote: 'We only use your details to reply to this enquiry.',
  submitLabel: 'Send my request',
  successTitle: 'Thank you, we have your request.',
  successBody: 'We will call you on the number you gave us. If it is urgent, please call us directly.',
  errorTitle: 'We could not send your request.',
  errorBody: 'Please try again in a moment, or call us directly.',
} as const;

/** The options shown in the "Service needed" dropdown. Built from the services above. */
export const serviceOptions: string[] = [
  ...services.map((s) => s.title),
  'Not sure yet, I need advice',
];

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const footer = {
  about: `${company.name} supplies trained, verified security guards to homes, businesses, factories and events.`,
} as const;
