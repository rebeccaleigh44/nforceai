/**
 * Design tokens: single source of truth for CSS (emitted as custom
 * properties by <Tokens />) and for island components (imported directly).
 * Values come from the Brand guardrails section of the creative brief.
 */
export const color = {
  primary: '#452FF4', // primary violet; the "agent" color in all motion
  heading: '#10008C', // heading navy (default on light sections)
  body: '#4C4585', // body violet-slate (default on light sections)
  ink: '#1A1A2E', // darkest stop of night sections
  slate: '#3F404D',
  slate2: '#4A4A68',
  tint: '#F3F2FF', // also body text on dark sections
  tint2: '#E9EDFF',
  tint3: '#F8F7FB',
  white: '#FFFFFF',
  // Night field stops (navy to cobalt)
  night0: '#07061F',
  night1: '#0E0A4A',
  night2: '#1B12A6',
  cobalt: '#2F3BFF',
  periwinkle: '#9C9CFF',
  lilac: '#D9D6FF',
  // Signal gradient: cyan and coral are small highlights only
  cyan: '#04B6D4',
  coral: '#FB4141',
  // Status: meaning only, never decoration
  ok: '#00CA4B',
  warn: '#FCAA1E',
  alert: '#FB4141',
} as const;

/**
 * Line and panel roles: the only colors for rules, borders and inset panels.
 * Day roles are solid. Night roles stay translucent on purpose: they sit on a
 * moving light field and frosted glass, where a solid line would read as a
 * dark stripe over the cobalt glow.
 */
export const role = {
  'line-day': '#D5D2F0',
  'line-day-strong': '#B8B3E3',
  'panel-day': '#ECEAFB',
  'line-night': 'rgb(255 255 255 / .15)',
  'line-night-strong': 'rgb(255 255 255 / .32)',
  'panel-night': 'rgb(255 255 255 / .08)',
} as const;

export const type = {
  family: "'Sora Variable', 'Sora', system-ui, sans-serif",
  heading: { weight: 600, lineHeight: 'normal', letterSpacing: '0.005rem' },
  body: { weight: 300, lineHeight: '139.444%', size: '1.0625rem' },
  // Fluid type scale (min, preferred, max)
  scale: {
    xs: '0.8125rem',
    sm: '0.9375rem',
    md: '1.0625rem',
    lg: 'clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)',
    // Secondary text under headings (hero subline, section ledes, CTA copy)
    lede: 'clamp(1.125rem, 1.02rem + 0.45vw, 1.375rem)',
    xl: 'clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem)',
    '2xl': 'clamp(2rem, 1.4rem + 2.4vw, 3.25rem)',
    '3xl': 'clamp(2.5rem, 1.6rem + 3.8vw, 4.75rem)',
    display: 'clamp(6rem, 3rem + 14vw, 17rem)',
  },
} as const;

export const space = {
  '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem', '5': '1.5rem',
  '6': '2rem', '7': '3rem', '8': '4rem', '9': '6rem', '10': '9rem',
} as const;

export const radius = { sm: '6px', md: '12px', lg: '20px', pill: '999px' } as const;

export const motion = {
  instant: 120, // interactions respond in under 200ms
  quick: 180,
  settle: 420,
  ambientMin: 6000, // ambient loops: 6 to 12 seconds
  ambientMax: 12000,
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export const layout = { max: '1320px', gutter: 'clamp(1.25rem, 4vw, 3rem)' } as const;

/** Flatten tokens to CSS custom properties. */
export function cssVars(): string {
  const out: string[] = [];
  for (const [k, v] of Object.entries(color)) out.push(`--c-${k}:${v}`);
  for (const [k, v] of Object.entries(role)) out.push(`--${k}:${v}`);
  for (const [k, v] of Object.entries(type.scale)) out.push(`--fs-${k}:${v}`);
  for (const [k, v] of Object.entries(space)) out.push(`--s-${k}:${v}`);
  for (const [k, v] of Object.entries(radius)) out.push(`--r-${k}:${v}`);
  out.push(
    `--font:${type.family}`,
    `--h-weight:${type.heading.weight}`,
    `--h-lh:${type.heading.lineHeight}`,
    `--h-ls:${type.heading.letterSpacing}`,
    `--b-weight:${type.body.weight}`,
    `--b-lh:${type.body.lineHeight}`,
    `--b-size:${type.body.size}`,
    `--t-instant:${motion.instant}ms`,
    `--t-quick:${motion.quick}ms`,
    `--t-settle:${motion.settle}ms`,
    `--ease:${motion.ease}`,
    `--max:${layout.max}`,
    `--gutter:${layout.gutter}`,
    `--signal:linear-gradient(90deg, ${color.cyan} 0%, ${color.primary} 22%, ${color.primary} 78%, ${color.coral} 100%)`,
  );
  return `:root{${out.join(';')}}`;
}
