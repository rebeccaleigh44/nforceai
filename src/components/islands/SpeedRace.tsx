import { useEffect, useRef, useState } from 'preact/hooks';
import './race.css';

type Step = { t: number; who: 'lead' | 'agent' | 'system'; text: string };
type Industry = { id: string; name: string; source: string; lead: string; script: Step[]; booked: string };

const HUMAN_AVG = 47 * 3600; // 47 hours, in seconds
const SPEED = 2; // playback speed; the clocks show simulated time
const fmt = (s: number) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = Math.floor(s % 60);
  return [h, m, x].map((v) => String(v).padStart(2, '0')).join(':');
};
const repNote = (s: number) =>
  s < 6 ? 'Lead lands in the CRM' : s < 14 ? 'Rep is on another call' : s < 22 ? 'Still unassigned' : 'Lead opens a competitor’s site';

export default function SpeedRace({ industries, showSwitcher = false, initial = 'real-estate' }:
  { industries: Industry[]; showSwitcher?: boolean; initial?: string }) {
  const [ind, setInd] = useState(() => industries.find((i) => i.id === initial) ?? industries[0]);
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const [t, setT] = useState(0);
  const raf = useRef(0);
  const end = ind.script[ind.script.length - 1].t;

  const stop = () => cancelAnimationFrame(raf.current);
  useEffect(() => stop, []);

  const start = () => {
    stop();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(end); setPhase('done'); return; }
    setPhase('running'); setT(0);
    const t0 = performance.now();
    const loop = (now: number) => {
      const s = ((now - t0) / 1000) * SPEED;
      if (s >= end) { setT(end); setPhase('done'); return; }
      setT(s); raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  };
  const pick = (i: Industry) => { stop(); setInd(i); setPhase('idle'); setT(0); };

  const shown = phase === 'idle' ? [] : ind.script.filter((s) => s.t <= t);
  const ratio = Math.round(HUMAN_AVG / end);

  return (
    <div class="race">
      {showSwitcher && (
        <div class="race-ind" role="group" aria-label="Industry">
          {industries.map((i) => (
            <button aria-pressed={i.id === ind.id} onClick={() => pick(i)}>{i.name}</button>
          ))}
        </div>
      )}

      <div class="race-lanes">
        <div class="race-lane human">
          <div class="lane-h">
            <p class="label">Typical sales rep</p>
            <p class="race-clock num" role="timer">{fmt(t)}</p>
          </div>
          <div class="lane-b">
            <p class="rep-state"><span class="dot warn" />{phase === 'idle' ? 'Waiting for a lead' : repNote(t)}</p>
            <div class="race-track" aria-hidden="true"><i style={{ width: `${Math.max(0.4, (t / HUMAN_AVG) * 100)}%` }} /></div>
            <p class="track-cap">Average first reply: <span class="num">47h</span>. Progress: <span class="num">{((t / HUMAN_AVG) * 100).toFixed(3)}%</span></p>
          </div>
        </div>

        <div class="race-lane agent frost">
          <div class="lane-h">
            <p class="label">NForce agent</p>
            <p class="race-clock num" role="timer">{fmt(t)}</p>
          </div>
          <p class="race-src">{ind.source} · {ind.lead}</p>
          {phase === 'idle' && <p class="race-idle">Press Start and a new lead arrives here.</p>}
          <ol class="race-lines" aria-live="polite">
            {shown.map((s) => <li class={`rl ${s.who}`}><span>{s.text}</span></li>)}
          </ol>
          {phase === 'done' && <p class="race-booked" role="status"><span class="dot ok" />{ind.booked} <span class="num">· {end}s</span></p>}
        </div>
      </div>

      <div class="race-foot">
        <button class="btn btn-primary" onClick={start} disabled={phase === 'running'}>
          {phase === 'idle' ? 'Start the race' : phase === 'running' ? 'Racing…' : 'Run it again'}
        </button>
        <p class="race-speed">{phase === 'running' ? `Playing at ${SPEED}× speed. Clocks show the lead's real-world wait.` : 'Sample lead. Invented names.'}</p>
      </div>

      {phase === 'done' && (
        <div class="race-scale">
          <p class="scale-h">Same lead, to scale</p>
          <div class="race-sbar"><span class="race-sl">Rep, 47 hours</span><i class="h" /></div>
          <div class="race-sbar"><span class="race-sl">Agent, {end} seconds</span><i class="a" style={{ width: `${Math.max(0.15, (end / HUMAN_AVG) * 100)}%` }} /></div>
          <p class="scale-cap">The agent books the meeting in <span class="num">1/{ratio.toLocaleString('en-US')}</span> of the time a rep takes to send a first reply. The rep's timer hasn't left the first minute.</p>
        </div>
      )}
    </div>
  );
}
