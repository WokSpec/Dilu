'use client';

import type { Template } from '@/lib/templates';
import type { WizardState } from './WizardShell';

export default function StepConfigure({
  state,
  update,
  template,
  onNext,
  onBack,
}: {
  state: WizardState;
  update: (p: Partial<WizardState>) => void;
  template: Template;
  onNext: () => void;
  onBack: () => void;
}) {
  const allFilled = template.configFields.every(
    (f) => state.config[f.id]?.trim()
  );

  function setField(id: string, value: string) {
    update({ config: { ...state.config, [id]: value } });
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-3">Step 2</p>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{template.icon}</span>
          <h2 className="text-4xl font-black">Configure {template.name}</h2>
        </div>
        <p className="text-dilu-muted mt-2 text-lg">Make it yours. These settings define your product's brand and behavior.</p>
      </div>

      <div className="space-y-5">
        {template.configFields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-semibold mb-2">{field.label}</label>
            {field.type === 'select' ? (
              <select
                value={state.config[field.id] ?? ''}
                onChange={(e) => setField(field.id, e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dilu-surface border border-dilu-border focus:border-dilu-purple focus:outline-none text-white text-sm"
              >
                <option value="" disabled>Select…</option>
                {field.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : field.type === 'color' ? (
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={state.config[field.id] ?? field.placeholder}
                  onChange={(e) => setField(field.id, e.target.value)}
                  className="w-12 h-12 rounded-xl border border-dilu-border bg-dilu-surface cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={state.config[field.id] ?? ''}
                  onChange={(e) => setField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 px-4 py-3 rounded-xl bg-dilu-surface border border-dilu-border focus:border-dilu-purple focus:outline-none text-white placeholder:text-dilu-muted text-sm"
                />
              </div>
            ) : (
              <input
                type="text"
                value={state.config[field.id] ?? ''}
                onChange={(e) => setField(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-dilu-surface border border-dilu-border focus:border-dilu-purple focus:outline-none text-white placeholder:text-dilu-muted text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="px-6 py-3 rounded-xl border border-dilu-border text-dilu-muted hover:text-white hover:border-white/20 transition-all text-sm font-semibold">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!allFilled}
          className="flex-1 py-3 rounded-xl bg-dilu-gradient font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
