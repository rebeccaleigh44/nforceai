import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Named customer results. Approval for display-size use is an open question in the brief. */
const customers = defineCollection({
  loader: file('src/data/customers.json'),
  schema: z.object({
    order: z.number(),
    company: z.string(),
    value: z.number(),
    prefix: z.string().default(''),
    suffix: z.string().default(''),
    label: z.string(),
    team: z.string(),
    note: z.string().optional(),
  }),
});

/** Core platform plus add-on modules. */
const pricing = defineCollection({
  loader: file('src/data/pricing.json'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    price: z.number(),
    kind: z.enum(['core', 'module']),
    summary: z.string(),
    includes: z.array(z.string()),
  }),
});

/** Deploy, Operate, Measure, Optimize: the orbit loop. */
const platform = defineCollection({
  loader: file('src/data/platform.json'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    verb: z.string(),
    line: z.string(),
    url: z.string(),
  }),
});

/** Lead Response industries; each carries a sample (invented) lead for the race. */
const industries = defineCollection({
  loader: file('src/data/industries.json'),
  schema: z.object({
    name: z.string(),
    source: z.string(),
    lead: z.string(),
    script: z.array(z.object({ t: z.number(), who: z.enum(['lead', 'agent', 'system']), text: z.string() })),
    booked: z.string(),
  }),
});

const stat = z.object({ value: z.string(), label: z.string() });
const card = z.object({
  title: z.string(),
  kind: z.enum(['kv', 'rows', 'bars', 'chips', 'chat', 'versions', 'tests', 'stages', 'flow', 'table']),
  items: z.array(z.record(z.string(), z.any())),
  note: z.string().optional(),
  banner: z.string().optional(),
  cols: z.array(z.string()).optional(),
});
const bullet = z.object({ t: z.string(), d: z.string() });

/** Use case pages (Lead Response has its own page). Copy and stats carried over from the live site. */
const useCases = defineCollection({
  loader: file('src/data/use-cases.json'),
  schema: z.object({
    order: z.number(), name: z.string(), eyebrow: z.string(),
    metaTitle: z.string(), metaDescription: z.string(),
    title: z.string(), lede: z.string(),
    problem: z.object({ title: z.string(), body: z.string(), stats: z.array(stat) }),
    features: z.object({ title: z.string(), items: z.array(z.object({ title: z.string(), body: z.string() })) }),
    impact: z.object({ title: z.string(), stats: z.array(stat) }),
    sample: z.object({
      channel: z.enum(['whatsapp', 'phone', 'email', 'chat']), contact: z.string(), company: z.string(),
      agent: z.string(), outcome: z.string(),
      lines: z.array(z.object({ who: z.enum(['contact', 'agent']), text: z.string() })),
    }),
  }),
});

/** Product pages: Deploy, Operate, Measure, Optimize. */
const productPages = defineCollection({
  loader: file('src/data/product.json'),
  schema: z.object({
    metaTitle: z.string(), metaDescription: z.string(), title: z.string(), lede: z.string(),
    heroCard: card,
    channels: z.object({ label: z.string(), title: z.string(), body: z.string(),
      items: z.array(z.object({ icon: z.enum(['whatsapp', 'phone', 'email', 'chat']), title: z.string(), body: z.string() })) }).optional(),
    intro: z.object({ label: z.string(), title: z.string(), body: z.string() }).optional(),
    sections: z.array(z.object({
      label: z.string(), tag: z.string().optional(), title: z.string(), body: z.string(),
      bullets: z.array(bullet), card,
    })),
    integrations: z.object({ label: z.string(), title: z.string(), body: z.string(), items: z.array(z.string()) }).optional(),
  }),
});

/** Legal documents (Markdown). Text is supplied by NForce and published verbatim. */
const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({ title: z.string(), description: z.string(), effective: z.string(), dateLabel: z.string().default('Effective date') }),
});

export const collections = { customers, pricing, platform, industries, useCases, productPages, legal };
