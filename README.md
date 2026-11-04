# NForce.AI site (Phase 1)

Astro 7 static site with Preact islands. Concept: "mission control" (see the creative brief).

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Structure

- `src/lib/tokens.ts`: design tokens (color, Sora type, scale, spacing, motion). Emitted as CSS custom properties in `Base.astro` and imported directly by islands.
- `src/styles/global.css`: night (navy-to-cobalt) and daylight (lilac) light fields, SVG grain, frosted and reeded glass, buttons, forms.
- `src/content.config.ts` + `src/data/*.json`: content collections for customer results, pricing modules, the platform loop, and Lead Response industries. Copy and numbers live there.
- `src/components/islands/`: OrbitLoop, SpeedRace, RoiEstimator, PricingBuilder, DemoForm. Each hydrates on `client:idle` or `client:visible` and has a reduced-motion state.
- `src/components/HeroSignal.astro`: hero graphic (channels in, agent at the center of the orbit, results out). Static SVG and CSS.
- `src/components/HeroField.astro`: the only WebGL (hero light field). CSS gradient fallback; one still frame under reduced motion; pauses off-screen.
- `src/lib/site.ts`: nav and URLs.

## Pages

- Phase 1: `/`, `/use-cases/lead-response`, `/pricing`, `/demo`, plus `404`.
- Built from the live site's content: `/product/deploy`, `/product/operate`, `/product/measure`, `/product/optimize` (`src/pages/product/[slug].astro` + `src/data/product.json`), `/use-cases/sales`, `/use-cases/customer-support`, `/use-cases/appointment-setting`, `/use-cases/hr-it-helpdesk` (`src/pages/use-cases/[slug].astro` + `src/data/use-cases.json`), and `/partners`.
- Legal: `/privacy-policy`, `/terms-of-service`, `/cookie-policy`, `/dpa` and `/subprocessors` are live from the Markdown files in `src/content/legal/`, rendered by `src/layouts/LegalPage.astro`. Edit the text there; each page file in `src/pages/` just loads its entry.
- Placeholders (`src/layouts/Placeholder.astro`, marked `noindex`): `/enterprise`, `/blog`.
- `/subprocessors` (Annex III to the DPA) is rebuilt from the live page in `src/content/legal/subprocessors.md`. Update that table whenever a sub-processor changes.
- Not built yet: `/customers` and the blog articles (`/blog/*`).
- Product screens are recomposed in HTML from sample data (`src/components/UiCard.astro`), not screenshots.

## Before launch

- Logo: uses the official `logo.png` (1788 x 317) and favicons from nforce.ai, unaltered. Swap in the SVG master when it arrives. The header and footer are light so the violet logo keeps its contrast; a white version for dark backgrounds would need brand sign-off.
- Confirm Nuxt slugs for product and use-case pages in `src/lib/site.ts`; add 301s in `astro.config.mjs` if any change.
- Demo form: set `PUBLIC_DEMO_ENDPOINT` (existing follow-up pipeline) and `PUBLIC_TURNSTILE_SITEKEY`. Without the endpoint the form sends nothing.
- Add `public/brand/og.png` (referenced by the Open Graph tags).
- Use case and partner stats are carried over from the live site as-is. The Partners market stats ($50B+, 73%, 5x) have no source; add one or replace them.
- Featured partner names on `/partners` are text; swap in their logo files. The Deploy integrations list is also text.
- Ethermail figure (300+ hours vs "50s of hours") is flagged in `src/data/customers.json`.
- Language switcher (EN) is a static control; i18n routing is not wired yet.
