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
  | 'refresh'
  | 'store'
  | 'warehouse'
  | 'school'
  | 'hospital'
  | 'hard-hat'
  | 'parking'
  | 'users'
  | 'map-pinned'
  | 'landmark'
  | 'route'
  | 'file-check'
  | 'camera'
  | 'bell';

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
  /** Shown larger and in brass. Use it for the one promise that matters most to clients. */
  featured?: boolean;
}

export interface Step {
  title: string;
  description: string;
}

export interface IndustryItem {
  name: string;
  note: string;
  icon: IconName;
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
  /** The number the counter counts up to. */
  value: number;
  /** Shown straight after the number, for example "+". */
  suffix?: string;
  label: string;
  icon: IconName;
  /** While true, the section shows a "Sample figures" note. */
  placeholder: boolean;
}

export interface ClientItem {
  name: string;
  /** What kind of client it is, shown small under the name. */
  kind: string;
  /** While true, the client strip shows a "Placeholder" note. */
  placeholder: boolean;
}

export interface TrustItem {
  label: string;
  icon: IconName;
}

export interface SocialLink {
  label: string;
  /** Leave empty to hide the link. Paste the full page address when the account exists. */
  href: string;
}

export interface PolicySection {
  title: string;
  body: string[];
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

// Links start with "/#" (not just "#") so they also work from other pages, such as the
// privacy policy. On the home page they scroll in place (see components/SmoothAnchors.tsx).
export const nav: NavItem[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Why us', href: '/#why-us' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Industries', href: '/#industries' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export const quoteCta = { label: 'Request a Quote', href: '/#contact' } as const;

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
    // PLACEHOLDER: replace with a real photo of your own guards, at least 1200 x 1200.
    // It is shown in a tall frame beside the headline on large screens and a wide frame on
    // phones, cropped from the centre, so keep the guard near the middle of the picture.
    // Keep the alt text accurate to the photo you use.
    src: '/images/placeholders/hero-guard-at-gate.jpg',
    alt: 'A uniformed security guard checking a visitor’s details at the gate of a residential society',
    width: 1200,
    height: 1200,
  } satisfies ImageContent,
  // REVIEW: the strip under the hero. Each item repeats a promise from "Why choose us" below,
  // so confirm those are true for your company.
  trust: [
    { label: 'Background-checked guards', icon: 'badge-check' },
    { label: 'Supervisor visits on a schedule', icon: 'clipboard-check' },
    { label: 'Replacement if a guard is not right', icon: 'refresh' },
  ] satisfies TrustItem[],
} as const;

/* -------------------------------------------------------------------------- */
/* Impact (animated counters)                                                 */
/* -------------------------------------------------------------------------- */

export const impact = {
  eyebrow: 'Our impact',
  title: 'The size of the job, in numbers.',
  intro: 'A few figures that show how much ground we cover, so you know what stands behind the guard at your gate.',
  // PLACEHOLDER: these are NOT real figures. They are round sample numbers so the counters have
  // something to count to. Replace each with your own true number, then set `placeholder: false`
  // on every one so the "Sample figures" note disappears. Never publish a number you cannot prove.
  stats: [
    { value: 10, suffix: '+', label: 'Years in business', icon: 'calendar', placeholder: true },
    { value: 5, label: 'Branch offices', icon: 'building', placeholder: true },
    { value: 50, suffix: '+', label: 'Clients served', icon: 'users', placeholder: true },
    { value: 100, suffix: '+', label: 'Sites protected', icon: 'map-pinned', placeholder: true },
    { value: 500, suffix: '+', label: 'Trained guards and staff', icon: 'user-check', placeholder: true },
    { value: 3, label: 'Cities covered', icon: 'landmark', placeholder: true },
  ] satisfies Stat[],
} as const;

/* -------------------------------------------------------------------------- */
/* Technology spotlight                                                       */
/* -------------------------------------------------------------------------- */

// REVIEW: this section describes how your company works. Keep only what you really provide, and
// delete the rest. The "sample report" card is an illustration, not a real client's report.
export const techSpotlight = {
  eyebrow: 'Technology',
  title: 'A guard you can check on, not just trust.',
  intro:
    'Good guarding leaves a record. Where a site needs it, we back the guard with simple tools so you can see what happened and when, without having to ask.',
  points: [
    {
      title: 'Logged patrol rounds',
      description: 'Rounds are ticked off at fixed checkpoints and written to the log with the time.',
      icon: 'route',
    },
    {
      title: 'Shift reports',
      description: 'A short report of attendance, rounds and visitors after each shift, shared with you.',
      icon: 'file-check',
    },
    {
      title: 'CCTV and alarm support',
      description: 'We watch and respond to the cameras and alarms you already have, or help you plan new ones.',
      icon: 'camera',
    },
    {
      title: 'Incident alerts',
      description: 'Anything out of the ordinary is reported to you and your supervisor straight away.',
      icon: 'bell',
    },
  ] satisfies Array<{ title: string; description: string; icon: IconName }>,
  cta: { label: 'Ask about options', href: '#contact' },
  sample: {
    title: 'Sample shift report',
    note: 'Illustration only. Not a real client.',
    rows: [
      { label: 'Site', value: '[Site name]' },
      { label: 'Shift', value: 'Night, 8:00 pm to 8:00 am' },
      { label: 'Guard on duty', value: '[Guard name], ID checked' },
      { label: 'Attendance', value: 'On time' },
    ],
    rounds: [
      { place: 'Main gate', time: '9:00 pm' },
      { place: 'Parking level', time: '11:00 pm' },
      { place: 'Back lane', time: '1:00 am' },
      { place: 'Main gate', time: '3:00 am' },
    ],
    incidents: 'No incidents. Supervisor check at 12:30 am.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Clients                                                                    */
/* -------------------------------------------------------------------------- */

export const clientsSection = {
  eyebrow: 'Trusted by',
  title: 'Places that rely on us.',
} as const;

// PLACEHOLDER: these are made-up names. Replace each with a real client that has agreed to be
// named (or delete it), then set `placeholder: false`. To show a logo instead of the name, put the
// file in public/images/clients/ and add a `logo` field in components/sections/Clients.tsx.
export const clients: ClientItem[] = [
  { name: '[Client one]', kind: 'Housing society', placeholder: true },
  { name: '[Client two]', kind: 'Retail chain', placeholder: true },
  { name: '[Client three]', kind: 'Manufacturing', placeholder: true },
  { name: '[Client four]', kind: 'School', placeholder: true },
  { name: '[Client five]', kind: 'Hospital', placeholder: true },
  { name: '[Client six]', kind: 'Logistics', placeholder: true },
  { name: '[Client seven]', kind: 'Office park', placeholder: true },
  { name: '[Client eight]', kind: 'Banquet venue', placeholder: true },
];

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export const servicesSection = {
  eyebrow: 'Services',
  title: 'Six kinds of cover, one standard of guard.',
  intro:
    'Tell us what you need to protect and when. We will recommend the number of guards and the shifts that make sense, and leave out the ones that do not.',
  /** Link at the bottom of each service card. It opens the form with that service chosen. */
  cardCta: 'Get a quote',
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
      featured: true,
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
    { name: 'Housing societies and apartments', note: 'Gate entry, visitor logs, deliveries and night rounds.', icon: 'house' },
    { name: 'Shops and showrooms', note: 'A presentable guard at the door and an eye on the floor.', icon: 'store' },
    { name: 'Offices and business centres', note: 'Reception desk, visitor passes and after-hours cover.', icon: 'building' },
    { name: 'Factories and manufacturing units', note: 'Gate control, vehicle checks and shift handovers.', icon: 'factory' },
    { name: 'Warehouses and godowns', note: 'Loading-bay supervision and perimeter rounds.', icon: 'warehouse' },
    { name: 'Schools and colleges', note: 'Campus gates, pick-up times and visitor control.', icon: 'school' },
    { name: 'Hospitals and clinics', note: 'Calm crowd handling and controlled entry points.', icon: 'hospital' },
    { name: 'Construction sites', note: 'Material security and site access after working hours.', icon: 'hard-hat' },
    { name: 'Banquet halls and event venues', note: 'Entry checks, parking and crowd flow.', icon: 'calendar' },
    { name: 'Parking and commercial complexes', note: 'Barrier control, patrols and incident reporting.', icon: 'parking' },
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
  {
    quote:
      'We were nervous about handing the school gate to an outside agency. Parents now say the pick-up queue has never been calmer.',
    name: '[Client name]',
    role: 'Administrator, [School name]',
    placeholder: true,
  },
  {
    quote:
      'For our wedding season they walked the hall with us first and then planned the parking and entry. Nothing went wrong, which is the point.',
    name: '[Client name]',
    role: 'Manager, [Banquet hall name]',
    placeholder: true,
  },
  {
    quote:
      'The shift report arrives every morning. I no longer phone the night guard to ask whether the rounds were done.',
    name: '[Client name]',
    role: 'Facility head, [Office park name]',
    placeholder: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Call-to-action band (between testimonials and FAQ)                         */
/* -------------------------------------------------------------------------- */

export const ctaBand = {
  title: 'Need guards at your site?',
  body: 'Tell us where and when. We will call you back, and you get a written quote after a short call or a site visit.',
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqSection = {
  eyebrow: 'Questions',
  title: 'Things people ask before they call.',
  intro: 'Not here? Call us or send the form and we will answer in plain words.',
  callLabel: 'Prefer to talk it through?',
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
  privacyLinkLabel: 'Read our privacy policy',
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
  // PLACEHOLDER: paste the full address of each page you really have. A link with an empty
  // address is not shown, so nothing points nowhere.
  social: [
    { label: 'Facebook', href: '' },
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'YouTube', href: '' },
    { label: 'X', href: '' },
  ] satisfies SocialLink[],
} as const;

/* -------------------------------------------------------------------------- */
/* Privacy policy page (/privacy-policy)                                      */
/* -------------------------------------------------------------------------- */

// REVIEW: this is a plain-language draft written from what the site actually does (see the
// code in app/api/contact and lib/sendEnquiry.ts). Have it checked against the Digital Personal
// Data Protection Act, 2023 and your own practice by someone qualified before launch, and
// update it whenever you add analytics, cookies or any new way of collecting details.
export const privacyPolicy = {
  title: 'Privacy policy',
  // PLACEHOLDER: the date you publish or last change this page.
  updated: '[Date]',
  intro: `This page explains what ${company.name} does with the details you give us through this website.`,
  sections: [
    {
      title: 'What we collect',
      body: [
        'When you send the quote form we collect the name, phone number, service, location and message you type in, and your email address if you choose to give it.',
        'Our servers also keep short technical records, such as the time of a request, which our hosting provider may store for security and troubleshooting.',
        'This website does not use advertising trackers or analytics cookies.',
      ],
    },
    {
      title: 'How we use it',
      body: [
        'We use your details only to reply to your enquiry, to prepare a quote, and to arrange a site visit if you ask for one.',
        'We do not sell your details, and we do not use them for unrelated marketing.',
      ],
    },
    {
      title: 'Who else handles it',
      body: [
        'Your enquiry is delivered to us by email through an email delivery service, and the website is run on a hosting provider. They handle your details only to provide those services.',
        'If a map is shown on this site, it is provided by Google, which may set its own cookies. We do not control those.',
        'We may also share details where the law requires it.',
      ],
    },
    {
      title: 'How long we keep it',
      body: [
        'We keep an enquiry for as long as it takes to deal with it, and for a reasonable period afterwards in case you come back to us or we need the record. If you become a client, we keep your details under the terms of your contract.',
      ],
    },
    {
      title: 'Your choices',
      body: [
        'You can ask us to show you the details we hold about you, correct them, or delete them. Email or call us using the details below and we will respond.',
      ],
    },
    {
      title: 'How we protect it',
      body: [
        'The site is served over HTTPS, the form is checked and rate-limited to reduce abuse, and enquiries are delivered only to the people who handle them. No system is perfectly secure, so please do not send sensitive information such as bank or identity numbers through the form.',
      ],
    },
    {
      title: 'Contact us about privacy',
      body: ['For any question about this page, use the phone number or email address shown on this website.'],
    },
  ] satisfies PolicySection[],
} as const;
