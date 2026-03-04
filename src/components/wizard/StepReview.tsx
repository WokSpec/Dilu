'use client';

import { useState } from 'react';
import type { Template } from '@/lib/templates';
import type { WizardState } from './WizardShell';

export default function StepReview({
  state,
  template,
  onBack,
}: {
  state: WizardState;
  template: Template;
  onBack: () => void;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function submit() {
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.email,
          templateId: state.templateId,
          config: { ...state.config, domain: state.domain },
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🚀</div>
        <h2 className="text-4xl font-black mb-4">You're in.</h2>
        <p className="text-dilu-muted text-lg max-w-md mx-auto mb-8">
          We've got your config for <strong className="text-white">{template.name}</strong> on{' '}
          <strong className="text-white">{state.domain}</strong>.
          We'll reach out at <strong className="text-white">{state.email}</strong> with next steps.
        </p>
        <div className="p-6 rounded-2xl bg-dilu-surface border border-dilu-border text-left max-w-md mx-auto">
          <h4 className="font-semibold text-sm text-dilu-muted mb-3">While you wait</h4>
          <ul className="space-y-2 text-sm text-dilu-muted">
            <li className="flex items-center gap-2">
              <span>→</span>
              <a href="https://wokspec.org" className="text-dilu-purple hover:underline" target="_blank" rel="noopener noreferrer">
                Explore WokSpec
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>→</span>
              <a href={`/templates/${template.id}`} className="text-dilu-purple hover:underline">
                Read full {template.name} docs
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>→</span>
              <a href="/" className="text-dilu-purple hover:underline">
                Browse other templates
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-3">Step 4</p>
        <h2 className="text-4xl font-black">Review & submit</h2>
        <p className="text-dilu-muted mt-2 text-lg">Looks good? We'll set everything up and send you the details.</p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Template */}
        <div className="p-5 rounded-xl bg-dilu-surface border border-dilu-border">
          <div className="text-xs text-dilu-muted uppercase tracking-widest mb-3">Template</div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{template.icon}</span>
            <div>
              <div className="font-bold">{template.name}</div>
              <div className="text-sm text-dilu-muted">{template.tagline}</div>
            </div>
          </div>
        </div>

        {/* Config */}
        <div className="p-5 rounded-xl bg-dilu-surface border border-dilu-border">
          <div className="text-xs text-dilu-muted uppercase tracking-widest mb-3">Configuration</div>
          <div className="space-y-2">
            {template.configFields.map((field) => (
              <div key={field.id} className="flex items-center justify-between text-sm">
                <span className="text-dilu-muted">{field.label}</span>
                <span className="font-medium flex items-center gap-2">
                  {field.type === 'color' && (
                    <span
                      className="w-4 h-4 rounded-full border border-white/10"
                      style={{ background: state.config[field.id] }}
                    />
                  )}
                  {state.config[field.id] || '—'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain + email */}
        <div className="p-5 rounded-xl bg-dilu-surface border border-dilu-border">
          <div className="text-xs text-dilu-muted uppercase tracking-widest mb-3">Delivery</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-dilu-muted">Domain</span>
              <span className="font-medium">{state.domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dilu-muted">Email</span>
              <span className="font-medium">{state.email}</span>
            </div>
          </div>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm mb-4">Something went wrong. Try again.</p>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="px-6 py-3 rounded-xl border border-dilu-border text-dilu-muted hover:text-white hover:border-white/20 transition-all text-sm font-semibold">
          ← Back
        </button>
        <button
          onClick={submit}
          disabled={status === 'loading'}
          className="flex-1 py-3 rounded-xl bg-dilu-gradient font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting…' : "Let's build it →"}
        </button>
      </div>

      <p className="text-xs text-dilu-muted text-center mt-4">
        Dilu is in early access. We'll be in touch within 48 hours.
      </p>
    </div>
  );
}
