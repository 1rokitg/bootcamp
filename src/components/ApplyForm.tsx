import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertCircle, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TRACKS = [
  { value: 'new', label: 'New to crypto' },
  { value: 'part-time', label: 'Part-time trader' },
  { value: 'full-time', label: 'Full-time trader' },
  { value: 'scaling', label: 'Scaling up' },
];

const CAPITAL = [
  'Under $1k',
  '$1k – $5k',
  '$5k – $25k',
  '$25k – $100k',
  '$100k+',
];

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [track, setTrack] = useState('new');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      track: String(data.get('track') ?? track),
      experience: String(data.get('experience') ?? '').trim(),
      capital: String(data.get('capital') ?? '').trim(),
      goal: String(data.get('goal') ?? '').trim(),
    };

    if (!payload.name || !payload.email) {
      setStatus('error');
      setErrorMsg('Please provide your name and email.');
      return;
    }

    const { error } = await supabase.from('applications').insert(payload);

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong sending your application. Please try again.');
      return;
    }

    setStatus('success');
    form.reset();
    setTrack('new');
  }

  return (
    <section id="apply" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent-500/[0.08] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: what you get */}
          <div id="included" className="reveal">
            <span className="text-xs font-600 uppercase tracking-[0.2em] text-accent-400">
              Included
            </span>
            <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-white sm:text-4xl lg:text-5xl">
              What you get inside the mentorship.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                'Private 1-on-1 mentorship with RokitG',
                'Weekly check-in calls to review your trades',
                'Access to the private Discord desk',
                'Full library of trade breakdowns & playbooks',
                'A repeatable system: entries, risk rules, exits',
                'Capped intake — reviewed by application',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" strokeWidth={2} />
                  <span className="text-base text-ink-200">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-gold-500/20 bg-gold-500/[0.04] p-5">
              <p className="text-sm leading-relaxed text-ink-200">
                Intake is limited and reviewed by application. Investment and terms are discussed
                directly on your call, once we know your situation.
              </p>
              <p className="mt-3 text-sm text-ink-300">
                Applications are reviewed manually. Expect a response within{' '}
                <span className="font-600 text-white">two business days</span>.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal">
            <div className="card-glow rounded-3xl border border-white/[0.07] bg-ink-900/60 p-6 backdrop-blur-xl sm:p-8">
              {status === 'success' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                    <CheckCircle2 className="h-9 w-9" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-700 text-white">
                    Application received.
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-300">
                    Thanks for applying. We review every application by hand — expect a response
                    within two business days.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-full border border-white/10 px-5 py-2.5 text-sm font-500 text-ink-200 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-700 text-white">Apply for mentorship</h3>
                    <p className="mt-1 text-sm text-ink-300">
                      Tell us where you are. We'll take it from there.
                    </p>
                  </div>

                  <Field label="Full name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jordan Rivera"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Which best describes you?" htmlFor="track">
                    <div className="grid grid-cols-2 gap-2">
                      {TRACKS.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setTrack(t.value)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-500 transition-all ${
                            track === t.value
                              ? 'border-accent-400/60 bg-accent-500/[0.1] text-white'
                              : 'border-white/[0.07] bg-white/[0.02] text-ink-300 hover:border-white/15 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="track" value={track} />
                  </Field>

                  <Field label="Trading capital (optional)" htmlFor="capital">
                    <select id="capital" name="capital" className={inputCls} defaultValue="">
                      <option value="" className="bg-ink-900">Select a range…</option>
                      {CAPITAL.map((c) => (
                        <option key={c} value={c} className="bg-ink-900">
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Your experience (optional)" htmlFor="experience">
                    <textarea
                      id="experience"
                      name="experience"
                      rows={3}
                      placeholder="How long have you been trading? What's working, what isn't?"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <Field label="What do you want from this? (optional)" htmlFor="goal">
                    <textarea
                      id="goal"
                      name="goal"
                      rows={2}
                      placeholder="One sentence is fine."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-600 text-ink-950 shadow-lg shadow-accent-500/20 transition-all hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit application
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-ink-400">
                    Educational content only. Nothing here is financial advice.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  'w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-ink-500 transition-colors focus:border-accent-400/60 focus:outline-none focus:ring-2 focus:ring-accent-500/20';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-600 text-ink-200">
        {label}
      </label>
      {children}
    </div>
  );
}
