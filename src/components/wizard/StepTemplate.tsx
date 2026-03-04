'use client';

import { templates } from '@/lib/templates';
import type { WizardState } from './WizardShell';

export default function StepTemplate({
  state,
  update,
  onNext,
}: {
  state: WizardState;
  update: (p: Partial<WizardState>) => void;
  onNext: () => void;
}) {
  function select(id: string) {
    update({ templateId: id, config: {} });
    onNext();
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-3">Step 1</p>
        <h2 className="text-4xl font-black">What are you building?</h2>
        <p className="text-dilu-muted mt-2 text-lg">Pick a template. Each one is a real WokSpec product running in production.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => t.status === 'available' ? select(t.id) : null}
            disabled={t.status === 'coming-soon'}
            className={`text-left p-5 rounded-2xl border transition-all group ${
              state.templateId === t.id
                ? 'border-dilu-purple bg-dilu-purple/10'
                : t.status === 'available'
                ? 'border-dilu-border bg-dilu-surface hover:border-white/20'
                : 'border-dilu-border bg-dilu-surface opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${t.color}20` }}>
                {t.icon}
              </div>
              <div>
                <div className="font-bold text-sm">{t.name}</div>
                {t.status === 'coming-soon' && (
                  <span className="text-xs text-dilu-muted">Coming soon</span>
                )}
              </div>
            </div>
            <p className="text-xs text-dilu-muted leading-relaxed">{t.tagline}</p>
            <div className="flex gap-1.5 mt-3">
              {t.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-dilu-bg border border-dilu-border text-dilu-muted">{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
