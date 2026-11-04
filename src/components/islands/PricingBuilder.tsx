import { useState } from 'preact/hooks';
import './pricing.css';

type Item = { id: string; name: string; price: number; kind: 'core' | 'module'; summary: string; includes: string[] };

export default function PricingBuilder({ items }: { items: Item[] }) {
  const core = items.find((i) => i.kind === 'core')!;
  const modules = items.filter((i) => i.kind === 'module');
  const [on, setOn] = useState<Record<string, boolean>>({ playbooks: true });
  const total = core.price + modules.reduce((s, m) => s + (on[m.id] ? m.price : 0), 0);
  const count = modules.filter((m) => on[m.id]).length;

  return (
    <div class="pb">
      <div class="pb-core frost">
        <p class="label">Always included</p>
        <div class="pb-ch"><h2>{core.name}</h2><p class="num pb-p">${core.price}<span>/month</span></p></div>
        <p class="pb-s">{core.summary}</p>
        <ul class="pb-inc">{core.includes.map((x) => <li>{x}</li>)}</ul>
      </div>

      <fieldset class="pb-mods">
        <legend class="label">Add modules</legend>
        {modules.map((m) => (
          <label class={`pb-mod ${on[m.id] ? 'on' : ''}`}>
            <input type="checkbox" checked={!!on[m.id]} onChange={() => setOn((o) => ({ ...o, [m.id]: !o[m.id] }))} />
            <span class="sw" aria-hidden="true"><i /></span>
            <span class="pb-mt"><span class="pb-mn">{m.name}</span><span class="pb-ms">{m.summary}</span></span>
            <span class="num pb-mp">+${m.price}</span>
          </label>
        ))}
      </fieldset>

      <div class="pb-total" aria-live="polite">
        <div>
          <p class="label">Your monthly total</p>
          <p class="num pb-t">${total.toLocaleString('en-US')}<span>/month</span></p>
          <p class="pb-tn">Core platform{count ? ` + ${count} module${count > 1 ? 's' : ''}` : ''}. No per-message fees. Your own LLM keys, billed by your provider.</p>
        </div>
        <a class="btn btn-light" href="/demo">Book a demo</a>
      </div>
    </div>
  );
}
