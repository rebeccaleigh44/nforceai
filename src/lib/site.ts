/**
 * Global IA. URLs match the current Nuxt site; Phase 1 pages are rebuilt here,
 * the rest stay on their existing URLs until Phases 2 and 3.
 * TODO: confirm use-case and product slugs against the Nuxt router before launch.
 */
export const nav = [
  {
    label: 'Product',
    items: [
      { label: 'Deploy', href: '/product/deploy' },
      { label: 'Operate', href: '/product/operate' },
      { label: 'Measure', href: '/product/measure' },
      { label: 'Optimize', href: '/product/optimize' },
    ],
  },
  {
    label: 'Use cases',
    items: [
      { label: 'Lead Response', href: '/use-cases/lead-response' },
      { label: 'Sales', href: '/use-cases/sales' },
      { label: 'Customer Support', href: '/use-cases/customer-support' },
      { label: 'Appointment Setting', href: '/use-cases/appointment-setting' },
      { label: 'HR and IT Helpdesk', href: '/use-cases/hr-it-helpdesk' },
    ],
  },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Partners', href: '/partners' },
] as const;

export const signInUrl = 'https://platform.nforce.ai';

export const legal = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms of service', href: '/terms-of-service' },
  { label: 'Cookie policy', href: '/cookie-policy' },
  { label: 'DPA', href: '/dpa' },
  { label: 'Sub-processors', href: '/subprocessors' },
];

/** Session key used to carry ROI estimator results into the demo form. */
export const ESTIMATE_KEY = 'nforce:estimate';
