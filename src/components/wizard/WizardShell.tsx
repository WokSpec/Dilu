'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { templates } from '@/lib/templates';
import StepTemplate from './StepTemplate';
import StepConfigure from './StepConfigure';
import StepDomain from './StepDomain';
import StepReview from './StepReview';

export type WizardState = {
  templateId: string;
  config: Record<string, string>;
  domain: string;
  email: string;
};

const STEPS = ['Template', 'Configure', 'Domain', 'Review'];

export default function WizardShell() {
  const params = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    templateId: params.get('template') ?? '',
    config: {},
    domain: '',
    email: '',
  });

  // If template pre-selected, skip step 0
  useEffect(() => {
    if (params.get('template')) setStep(1);
  }, [params]);

  function update(patch: Partial<WizardState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function next() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  const template = templates.find((t) => t.id === state.templateId);

  return (
    <div className="min-h-screen bg-dilu-bg text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-dilu-border px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.push('/')} className="text-dilu-muted hover:text-white text-sm transition-colors">
          ← Dilu
        </button>
        <div className="ml-auto flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                  i === step
                    ? 'bg-dilu-purple/20 text-dilu-purple border border-dilu-purple/30'
                    : i < step
                    ? 'text-dilu-green'
                    : 'text-dilu-muted'
                }`}
              >
                {i < step ? '✓ ' : `${i + 1}. `}{label}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px ${i < step ? 'bg-dilu-green/40' : 'bg-dilu-border'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          {step === 0 && (
            <StepTemplate state={state} update={update} onNext={next} />
          )}
          {step === 1 && template && (
            <StepConfigure state={state} update={update} template={template} onNext={next} onBack={back} />
          )}
          {step === 2 && (
            <StepDomain state={state} update={update} onNext={next} onBack={back} />
          )}
          {step === 3 && template && (
            <StepReview state={state} template={template} onBack={back} />
          )}
        </div>
      </div>
    </div>
  );
}
