import { notFound } from 'next/navigation';
import Link from 'next/link';
import { templates, getTemplate } from '@/lib/templates';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = getTemplate(id);
  if (!t) return {};
  return {
    title: `${t.name} — Dilu`,
    description: t.tagline,
  };
}

export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTemplate(id);
  if (!t) notFound();

  return (
    <div className="min-h-screen bg-dilu-bg text-white">
      {/* Nav */}
      <nav className="border-b border-dilu-border px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-dilu-muted hover:text-white text-sm transition-colors">
          ← Back
        </Link>
        <span className="text-dilu-border">|</span>
        <Link href="/#templates" className="text-dilu-muted hover:text-white text-sm transition-colors">
          All templates
        </Link>
        <div className="ml-auto">
          <Link
            href={`/start?template=${t.id}`}
            className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-opacity ${
              t.status === 'available'
                ? 'bg-dilu-gradient hover:opacity-90'
                : 'bg-dilu-border text-dilu-muted cursor-not-allowed'
            }`}
          >
            {t.status === 'available' ? 'Use this template' : 'Coming soon'}
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-start gap-6 mb-12">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${t.color}20` }}
          >
            {t.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black">{t.name}</h1>
              {t.status === 'coming-soon' && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-dilu-surface border border-dilu-border text-dilu-muted">
                  Coming soon
                </span>
              )}
            </div>
            <p className="text-xl text-dilu-muted">{t.tagline}</p>
            <div className="flex gap-2 mt-3">
              {t.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-md border border-dilu-border text-dilu-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Color accent bar */}
        <div className="h-px mb-12" style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }} />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-dilu-muted leading-relaxed text-lg">{t.longDescription}</p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-6">What you get</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{ background: `${t.color}20`, color: t.color }}>✓</span>
                    <span className="text-dilu-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Stack */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Tech stack</h2>
              <div className="space-y-3">
                {t.stack.map((s) => (
                  <div key={s.label} className="flex items-center justify-between p-4 rounded-xl bg-dilu-surface border border-dilu-border">
                    <span className="text-sm text-dilu-muted">{s.label}</span>
                    <span className="text-sm font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA card */}
            <div className="p-6 rounded-2xl bg-dilu-surface border border-dilu-border sticky top-8">
              <h3 className="font-bold text-lg mb-2">Build with this template</h3>
              <p className="text-sm text-dilu-muted mb-6">
                {t.status === 'available'
                  ? "Configure it with your brand, connect your domain, and ship. You own the code."
                  : "This template is coming soon. Join the waitlist to get notified first."}
              </p>
              <Link
                href={`/start?template=${t.id}`}
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-opacity ${
                  t.status === 'available'
                    ? 'bg-dilu-gradient hover:opacity-90'
                    : 'bg-dilu-border text-dilu-muted cursor-not-allowed pointer-events-none'
                }`}
              >
                {t.status === 'available' ? 'Start building →' : 'Notify me when ready'}
              </Link>
              {t.liveUrl && (
                <a
                  href={t.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full text-center py-3 rounded-xl font-semibold text-sm border border-dilu-border text-dilu-muted hover:text-white hover:border-white/20 transition-all"
                >
                  View live demo ↗
                </a>
              )}
            </div>

            {/* All templates */}
            <div className="p-6 rounded-2xl bg-dilu-surface border border-dilu-border">
              <h3 className="font-semibold text-sm text-dilu-muted mb-4">Other templates</h3>
              <div className="space-y-2">
                {templates
                  .filter((other) => other.id !== t.id)
                  .map((other) => (
                    <Link
                      key={other.id}
                      href={`/templates/${other.id}`}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-lg">{other.icon}</span>
                      <div>
                        <div className="text-sm font-medium group-hover:text-white transition-colors">{other.name}</div>
                        <div className="text-xs text-dilu-muted">{other.tagline}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
