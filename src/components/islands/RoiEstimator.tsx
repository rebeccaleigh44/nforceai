import { useMemo, useState } from 'preact/hooks';
import { ESTIMATE_KEY } from '../../lib/site';
import './roi.css';

/** Assumptions are shown to the visitor; keep them in sync with the note below the results. */
const AUTOMATION = 0.7; // share of conversations agents handle end to end
const HOURS_PER_FTE = 140; // productive hours per person per month
const CORE = 300;

type Mode = 'leads' | 'tickets';
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const int = (n: number) => Math.round(n).toLocaleString('en-US');

export default function RoiEstimator() {
  const [mode, setMode] = useState<Mode>('leads');
  const [volume, setVolume] = useState(2000);
  const [team, setTeam] = useState(6);
  const [resp, setResp] = useState(47);
  const [mins, setMins] = useState(8);
  const [rate, setRate] = useState(35);

  const r = useMemo(() => {
    const hours = volume * AUTOMATION * (mins / 60);
    const saved = hours * rate;
    const capacity = Math.min(100, (hours / (team * HOURS_PER_FTE)) * 100);
    return { hours, saved, net: saved - CORE, capacity };
  }, [volume, team, mins, rate]);

  const unit = mode === 'leads' ? 'leads' : 'tickets';

  const toDemo = () => {
    const summary = {
      mode, volume, team, responseHours: resp, minutesPerConversation: mins, hourlyCost: rate,
      hoursSaved: Math.round(r.hours), costSaved: Math.round(r.saved), createdAt: new Date().toISOString(),
    };
    try { sessionStorage.setItem(ESTIMATE_KEY, JSON.stringify(summary)); } catch {}
    location.href = '/demo';
  };

  return (
    <div class="roi">
      <form class="roi-in" onSubmit={(e) => e.preventDefault()} aria-label="ROI estimator inputs">
        <div class="roi-mode" role="group" aria-label="What your team handles">
          {(['leads', 'tickets'] as Mode[]).map((m) => (
            <button type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === 'leads' ? 'Inbound leads' : 'Support tickets'}
            </button>
          ))}
        </div>

        <Range id="vol" label={`Monthly ${unit}`} value={volume} min={100} max={20000} step={100} onInput={setVolume} display={int(volume)} />
        <Range id="team" label="People handling them" value={team} min={1} max={100} step={1} onInput={setTeam} display={int(team)} />
        <Range id="resp" label="Current first response" value={resp} min={1} max={72} step={1} onInput={setResp} display={`${resp}h`} />

        <details class="roi-adv">
          <summary>Adjust assumptions</summary>
          <Range id="mins" label="Minutes of work per conversation" value={mins} min={2} max={30} step={1} onInput={setMins} display={`${mins} min`} />
          <Range id="rate" label="Loaded hourly cost" value={rate} min={15} max={120} step={1} onInput={setRate} display={money(rate)} />
        </details>
      </form>

      <div class="roi-out" aria-live="polite">
        <p class="label">Estimated each month</p>
        <div class="roi-big">
          <p class="num roi-bn">{int(r.hours)}<span class="roi-u">h</span></p>
          <p class="roi-bl">hours back for your team</p>
        </div>
        <dl class="roi-kv">
          <div><dt>Cost saved</dt><dd class="num">{money(r.saved)}</dd></div>
          <div><dt>Net of the $300 core platform</dt><dd class="num">{money(r.net)}</dd></div>
          <div><dt>Team capacity freed</dt><dd class="num">{int(r.capacity)}%</dd></div>
          <div><dt>First response</dt><dd><span class="num roi-was">{resp}h</span> <span aria-hidden="true">→</span><span class="sr-only">becomes</span> <span class="num">under 30s</span></dd></div>
        </dl>
        <button class="btn btn-light" onClick={toDemo}>Book a demo with these numbers</button>
        <p class="roi-note">Estimate only. Assumes agents fully handle {Math.round(AUTOMATION * 100)}% of {unit} at {mins} minutes of work each, and {HOURS_PER_FTE} working hours per person per month.</p>
      </div>
    </div>
  );
}

function Range({ id, label, value, min, max, step, onInput, display }: {
  id: string; label: string; value: number; min: number; max: number; step: number; onInput: (n: number) => void; display: string;
}) {
  return (
    <div class="field roi-f">
      <div class="roi-fh"><label for={`roi-${id}`}>{label}</label><output for={`roi-${id}`} class="num">{display}</output></div>
      <input id={`roi-${id}`} type="range" min={min} max={max} step={step} value={value}
        aria-valuetext={display}
        onInput={(e) => onInput(Number((e.target as HTMLInputElement).value))} />
    </div>
  );
}
