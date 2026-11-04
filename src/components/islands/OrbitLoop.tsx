import { useEffect, useRef, useState } from 'preact/hooks';
import './orbit.css';

type Stop = { id: string; name: string; verb: string; line: string; url: string };

const R = 200; // main ring radius in the 500x500 viewBox

function Deploy() {
  return (
    <div class="vg vg-deploy">
      <div class="vg-row"><span class="o-k">Agent name</span><span class="o-v">Nova</span></div>
      <div class="vg-row"><span class="o-k">Role</span><span class="o-v">Lead qualification and booking</span></div>
      <div class="vg-row"><span class="o-k">Channels</span>
        <span class="toggles">
          {['WhatsApp', 'Phone', 'Email', 'Web chat'].map((c, i) => (
            <span class={`tg ${i === 2 ? 'late' : ''}`}><i />{c}</span>
          ))}
        </span>
      </div>
      <div class="vg-row"><span class="o-k">Tone</span><span class="o-v o-tone"><span>Warm</span><b><i /></b><span>Direct</span></span></div>
      <div class="vg-row last"><span class="o-k">Status</span><span class="o-v o-golive"><span class="dot ok" /> Live on 4 channels</span></div>
    </div>
  );
}
function Operate() {
  const rows = [
    ['Jess W.', 'Pricing question', 'ok', 'Resolved by Astra'],
    ['Karim S.', 'Demo request', 'ok', 'Meeting booked'],
    ['Lena F.', 'Refund over limit', 'alert', 'Escalated to you'],
    ['Ravi P.', 'Shipping update', 'agent', 'Nova replying'],
  ];
  return (
    <div class="vg vg-operate">
      {rows.map(([n, t, d, s], i) => (
        <div class="op" style={{ transitionDelay: `${i * 90}ms` }}>
          <span class="opn">{n}<small>{t}</small></span>
          <span class="ops"><span class={`dot ${d}`} />{s}</span>
          {d === 'alert' && <span class="optake">Take over</span>}
        </div>
      ))}
    </div>
  );
}
function Measure() {
  const kpis: [string, string, number][] = [
    ['Meetings booked', '142', 0.72],
    ['Tickets closed', '1,906', 0.9],
    ['Cost saved', '$38,400', 0.58],
    ['Median first reply', '4s', 0.12],
  ];
  return (
    <div class="vg vg-measure">
      {kpis.map(([k, v, w], i) => (
        <div class="o-kpi">
          <div class="o-kpi-h"><span>{k}</span><span class="num">{v}</span></div>
          <div class="o-bar"><i style={{ '--w': w, transitionDelay: `${i * 110}ms` } as any} /></div>
        </div>
      ))}
      <p class="vg-note">This month, sample workspace</p>
    </div>
  );
}
function Optimize() {
  return (
    <div class="vg vg-opt">
      <p class="vg-sub">Reply test: first message to new leads</p>
      <div class="ab"><span class="abk">A</span><span class="abt">"Thanks for reaching out! How can I help?"</span><span class="num abv">18%</span></div>
      <div class="ab win"><span class="abk">B</span><span class="abt">"Hi Sam, want to see it this week? I have Thu or Fri."</span><span class="num abv">27%</span></div>
      <div class="sug"><span>Nova suggests switching the playbook to B.</span><span class="appr">Approve</span></div>
    </div>
  );
}
const vignettes: Record<string, () => preact.JSX.Element> = { deploy: Deploy, operate: Operate, measure: Measure, optimize: Optimize };

export default function OrbitLoop({ stops }: { stops: Stop[] }) {
  const sec = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const n = stops.length;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sec.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const span = el.offsetHeight - innerHeight;
        setP(Math.min(1, Math.max(0, -r.top / span)));
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const active = Math.min(n - 1, Math.floor(p * n * 0.999));
  // Stop i sits at angle i*(360/n); rotate so the active stop lands at 3 o'clock, facing the copy.
  const rot = -Math.min(n - 1, Math.max(0, p * n - 0.5)) * (360 / n);

  const goTo = (i: number) => {
    const el = sec.current; if (!el) return;
    const span = el.offsetHeight - innerHeight;
    const top = el.getBoundingClientRect().top + scrollY + span * ((i + 0.5) / n);
    scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <div class="orbit" ref={sec} style={{ '--n': n } as any}>
      <div class="orbit-stick">
        <div class="orbit-ring" aria-hidden="true">
          <svg viewBox="0 0 500 500">
            {[110, 150, 250, 290].map((r, i) => (
              <circle cx="250" cy="250" r={r} class="o-faint" stroke-dasharray={`${r * 5.6} ${r * 0.68}`} transform={`rotate(${i * 70} 250 250)`} />
            ))}
            <g style={{ transform: `rotate(${rot}deg)`, transformOrigin: '250px 250px' }} class="o-rot">
              <circle cx="250" cy="250" r={R} class="o-main" stroke-dasharray={`${R * 5.9} ${R * 0.38}`} />
              {stops.map((_, i) => {
                const a = (i * 2 * Math.PI) / n;
                const x = 250 + R * Math.cos(a), y = 250 + R * Math.sin(a);
                return <circle cx={x} cy={y} r={i === active ? 9 : 5} class={`o-node ${i === active ? 'on' : ''}`} />;
              })}
            </g>
            <g class="o-agents">
              {[0, 1, 2].map((i) => <circle cx="250" cy={250 - 110} r="3.5" class="o-agent" style={{ animationDelay: `${i * -4}s` }} />)}
            </g>
            <circle cx="250" cy="250" r="44" class="o-core" />
          </svg>
          <span class="o-count num">0{active + 1}</span>
        </div>

        <div class="orbit-copy">
          <ol class="o-tabs">
            {stops.map((s, i) => (
              <li><button class={i === active ? 'on' : ''} aria-current={i === active ? 'step' : undefined} onClick={() => goTo(i)}>{s.name}</button></li>
            ))}
          </ol>
          <div class="o-panels">
            {stops.map((s, i) => {
              const V = vignettes[s.id];
              return (
                <section class={`o-panel ${i === active ? 'on' : 'off'}`} aria-labelledby={`o-h-${s.id}`}>
                  <h3 id={`o-h-${s.id}`}><span class="o-verb">{s.verb}.</span> {s.line}</h3>
                  <div class="frost o-ui">{V && <V />}</div>
                  <a class="o-link" href={s.url}>More on {s.name} <span aria-hidden="true">→</span></a>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
