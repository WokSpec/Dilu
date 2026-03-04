'use client';

import type { WizardState } from './WizardShell';

export default function StepDomain({
  state,
  update,
  onNext,
  onBack,
}: {
  state: WizardState;
  update: (p: Partial<WizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const domainOk = state.domain.includes('.');

  return (
    <div>
      <div className="mb-10">
        <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-3">Step 3</p>
        <h2 className="text-4xl font-black">Your domain</h2>
        <p className="text-dilu-muted mt-2 text-lg">
          Your product will live at your domain. You own it completely.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Domain name</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dilu-muted text-sm">🌐</span>
            <input
              type="text"
              value={state.domain}
              onChange={(e) => update({ domain: e.target.value })}
              placeholder="yourbrand.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-dilu-surface border border-dilu-border focus:border-dilu-purple focus:outline-none text-white placeholder:text-dilu-muted text-sm"
            />
          </div>
          <p className="text-xs text-dilu-muted mt-2">
            Don't have one yet? No problem — we'll walk you through getting one. Or use a free subdomain to start.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-dilu-surface border border-dilu-border">
          <h4 className="font-semibold text-sm mb-3">What happens next</h4>
          <ul className="space-y-2 text-sm text-dilu-muted">
            <li className="flex items-start gap-2">
              <span className="text-dilu-purple mt-0.5">→</span>
              We set up the Cloudflare project linked to your GitHub
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dilu-purple mt-0.5">→</span>
              You get a DNS record to add (takes 2 minutes)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dilu-purple mt-0.5">→</span>
              Your product goes live at your domain
            </li>
          </ul>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Your email</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="you@yourbrand.com"
            className="w-full px-4 py-3 rounded-xl bg-dilu-surface border border-dilu-border focus:border-dilu-purple focus:outline-none text-white placeholder:text-dilu-muted text-sm"
          />
          <p className="text-xs text-dilu-muted mt-2">We'll send your project setup instructions here.</p>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="px-6 py-3 rounded-xl border border-dilu-border text-dilu-muted hover:text-white hover:border-white/20 transition-all text-sm font-semibold">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!domainOk || !state.email.includes('@')}
          className="flex-1 py-3 rounded-xl bg-dilu-gradient font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review →
        </button>
      </div>
    </div>
  );
}
