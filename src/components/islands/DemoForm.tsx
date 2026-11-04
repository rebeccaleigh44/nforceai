import { useEffect, useRef, useState } from 'preact/hooks';
import { ESTIMATE_KEY } from '../../lib/site';
import './demo.css';

type Estimate = {
  mode: 'leads' | 'tickets'; volume: number; team: number; responseHours: number;
  minutesPerConversation: number; hourlyCost: number; hoursSaved: number; costSaved: number;
};
type CountryCode = string;
export type Country = { code: CountryCode; name: string; dial: string };

const ENDPOINT = import.meta.env.PUBLIC_DEMO_ENDPOINT as string | undefined;
const TURNSTILE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITEKEY as string | undefined;

function detectCountry(list: Country[]): CountryCode {
  for (const l of navigator.languages ?? [navigator.language]) {
    const region = (() => { try { return new Intl.Locale(l).maximize().region; } catch { return undefined; } })();
    if (region && list.some((c) => c.code === region)) return region as CountryCode;
  }
  return 'US';
}

/** E.164 allows up to 15 digits including the country code. */
const plausiblePhone = (v: string, dial: string) => {
  const d = v.replace(/\D/g, '');
  return d.length >= 6 && d.length + dial.length - 1 <= 15;
};

export default function DemoForm({ countries }: { countries: Country[] }) {
  const [country, setCountry] = useState<CountryCode>('US');
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'offline'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [first, setFirst] = useState('');
  const [useCase, setUseCase] = useState('leads');
  const [volume, setVolume] = useState('');
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setCountry(detectCountry(countries));
    try {
      const raw = sessionStorage.getItem(ESTIMATE_KEY);
      if (raw) {
        const est: Estimate = JSON.parse(raw);
        setEstimate(est);
        setUseCase(est.mode === 'tickets' ? 'support' : 'leads');
        setVolume(est.volume < 1000 ? 'lt1k' : est.volume < 5000 ? '1-5k' : est.volume < 20000 ? '5-20k' : '20k+');
      }
    } catch {}
    if (TURNSTILE_KEY && !document.querySelector('script[data-turnstile]')) {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'; s.async = true; s.defer = true; s.dataset.turnstile = '1';
      document.head.appendChild(s);
    }
  }, []);

  const dialOf = (c: CountryCode) => countries.find((x) => x.code === c)?.dial ?? '';
  const clearEstimate = () => { setEstimate(null); try { sessionStorage.removeItem(ESTIMATE_KEY); } catch {} };

  const submit = async (e: Event) => {
    e.preventDefault();
    const fd = new FormData(form.current!);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) errs.email = 'Enter a work email, like name@company.com.';
    if (!data.company?.trim()) errs.company = 'Enter your company name.';
    if (data.phone?.trim() && !plausiblePhone(data.phone, dialOf(country))) errs.phone = 'Check the number for the selected country.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setFirst(data.name.trim().split(' ')[0]);
    if (!ENDPOINT) { setStatus('offline'); return; }
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, country, dialCode: dialOf(country), estimate }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent'); clearEstimate();
    } catch { setStatus('error'); }
  };

  if (status === 'sent') {
    return (
      <div class="df-done" role="status">
        <h2>Thanks, {first}</h2>
        <p>Your request is in. Our assistant will follow up by email in a few minutes to pick a time.</p>
      </div>
    );
  }

  const err = (k: string) => errors[k] ? <p class="df-err" id={`df-${k}-err`}>{errors[k]}</p> : null;
  const aria = (k: string) => errors[k] ? { 'aria-invalid': true, 'aria-describedby': `df-${k}-err` } : {};

  return (
    <form class="df" ref={form} onSubmit={submit} noValidate>
      {estimate && (
        <div class="df-est">
          <div>
            <p class="label">From your ROI estimate</p>
            <p><span class="num">{estimate.volume.toLocaleString('en-US')}</span> {estimate.mode} a month, team of <span class="num">{estimate.team}</span>.
              About <span class="num">{estimate.hoursSaved.toLocaleString('en-US')}</span> hours and <span class="num">${estimate.costSaved.toLocaleString('en-US')}</span> saved each month.</p>
          </div>
          <button type="button" class="df-x" onClick={clearEstimate}>Remove<span class="sr-only"> estimate from this request</span></button>
        </div>
      )}

      <div class="df-grid">
        <div class="field"><label for="df-name">Full name</label><input id="df-name" name="name" class="input" autocomplete="name" required {...aria('name')} />{err('name')}</div>
        <div class="field"><label for="df-email">Work email</label><input id="df-email" name="email" type="email" class="input" autocomplete="email" required {...aria('email')} />{err('email')}</div>
        <div class="field"><label for="df-company">Company</label><input id="df-company" name="company" class="input" autocomplete="organization" required {...aria('company')} />{err('company')}</div>
        <div class="field">
          <span class="flabel" id="df-phone-l">Phone <span class="opt">(optional)</span></span>
          <div class="df-phone">
            <CountryPicker countries={countries} value={country} onChange={setCountry} />
            <input name="phone" type="tel" class="input" autocomplete="tel-national" aria-labelledby="df-phone-l" {...aria('phone')} />
          </div>
          {err('phone')}
        </div>
        <div class="field">
          <label for="df-team">What should agents handle first?</label>
          <select id="df-team" name="useCase" class="input" value={useCase} onChange={(e) => setUseCase((e.target as HTMLSelectElement).value)}>
            <option value="leads">Lead response</option>
            <option value="sales">Sales conversations</option>
            <option value="support">Customer support</option>
            <option value="appointments">Appointment setting</option>
            <option value="helpdesk">HR and IT helpdesk</option>
          </select>
        </div>
        <div class="field">
          <label for="df-volume">Monthly conversations</label>
          <select id="df-volume" name="volume" class="input" value={volume} onChange={(e) => setVolume((e.target as HTMLSelectElement).value)}>
            <option value="">Select a range</option>
            <option value="lt1k">Under 1,000</option>
            <option value="1-5k">1,000 to 5,000</option>
            <option value="5-20k">5,000 to 20,000</option>
            <option value="20k+">20,000 or more</option>
          </select>
        </div>
        <div class="field full"><label for="df-msg">Anything we should know? <span class="opt">(optional)</span></label><textarea id="df-msg" name="message" class="input" rows={3} /></div>
      </div>
      {estimate && <input type="hidden" name="estimate" value={JSON.stringify(estimate)} />}
      {TURNSTILE_KEY && <div class="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" />}

      <div class="df-foot">
        <button class="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Book my demo'}</button>
        <p class="df-legal">We use your details only to arrange the demo. See our <a href="/privacy-policy">privacy policy</a>.</p>
      </div>
      <div role="status" aria-live="polite">
        {status === 'error' && <p class="df-err">Something went wrong sending your request. Please try again.</p>}
        {status === 'offline' && <p class="df-err">Preview build: the form endpoint isn't connected yet (set PUBLIC_DEMO_ENDPOINT). Nothing was sent.</p>}
      </div>
    </form>
  );
}

/** Searchable country-code combobox (ARIA 1.2 combobox with listbox popup). */
function CountryPicker({ countries, value, onChange }: { countries: Country[]; value: CountryCode; onChange: (c: CountryCode) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const cur = countries.find((c) => c.code === value)!;
  const qq = q.trim().toLowerCase().replace(/^\+/, '');
  const shown = qq
    ? countries.filter((c) => c.name.toLowerCase().includes(qq) || c.dial.slice(1).startsWith(qq) || c.code.toLowerCase() === qq)
    : countries;

  useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }); }, [hi, open]);

  const choose = (c: Country) => { onChange(c.code); setOpen(false); setQ(''); input.current?.focus(); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setHi((h) => Math.min(shown.length - 1, h + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(0, h - 1)); }
    else if (e.key === 'Enter' && open) { e.preventDefault(); if (shown[hi]) choose(shown[hi]); }
    else if (e.key === 'Escape') { setOpen(false); setQ(''); }
  };

  return (
    <div class="cp">
      <input
        ref={input} class="input cp-in" role="combobox" aria-expanded={open} aria-controls="cp-list" aria-autocomplete="list"
        aria-label={`Country code, ${cur.name} ${cur.dial}`} autocomplete="off"
        aria-activedescendant={open && shown[hi] ? `cp-${shown[hi].code}` : undefined}
        value={open ? q : `${cur.code} ${cur.dial}`}
        placeholder="Search"
        onFocus={() => { setOpen(true); setHi(Math.max(0, countries.findIndex((c) => c.code === value))); }}
        onBlur={() => setTimeout(() => { setOpen(false); setQ(''); }, 120)}
        onInput={(e) => { setQ((e.target as HTMLInputElement).value); setHi(0); setOpen(true); }}
        onKeyDown={onKey}
      />
      {open && (
        <ul id="cp-list" role="listbox" class="cp-list" ref={list} aria-label="Countries">
          {shown.length ? shown.map((c, i) => (
            <li id={`cp-${c.code}`} role="option" aria-selected={i === hi} class={c.code === value ? 'cur' : ''}
              onMouseDown={(e) => { e.preventDefault(); choose(c); }} onMouseEnter={() => setHi(i)}>
              <span>{c.name}</span><span class="num">{c.dial}</span>
            </li>
          )) : <li class="cp-none" role="option" aria-disabled="true" aria-selected={false}>No match</li>}
        </ul>
      )}
    </div>
  );
}
