'use client';

import { Suspense } from 'react';
import WizardShell from '@/components/wizard/WizardShell';

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dilu-bg flex items-center justify-center text-dilu-muted">Loading…</div>}>
      <WizardShell />
    </Suspense>
  );
}
