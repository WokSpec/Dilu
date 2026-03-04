'use client';

import { useState } from 'react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="waitlist" className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-dilu-purple/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-4">
            Early access
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Be the first to build.
          </h2>
          <p className="text-dilu-muted text-lg mb-10 max-w-lg mx-auto">
            Dilu is in early development. Join the waitlist to get first access when templates
            go live — and help shape what gets built next.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-dilu-green/10 border border-dilu-green/30 text-dilu-green font-semibold">
              <span>✓</span>
              <span>You&apos;re on the list. We&apos;ll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-dilu-surface border border-dilu-border focus:border-dilu-purple focus:outline-none text-white placeholder:text-dilu-muted text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl bg-dilu-gradient font-semibold text-sm whitespace-nowrap hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === 'loading' ? 'Joining…' : 'Join waitlist'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-sm mt-3">Something went wrong. Try again.</p>
          )}

          <p className="text-dilu-muted text-xs mt-4">No spam. Just launch updates.</p>
        </div>
      </div>
    </section>
  );
}
