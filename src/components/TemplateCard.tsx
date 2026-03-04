import Link from 'next/link';
import type { Template } from '@/lib/templates';

export default function TemplateCard({ t }: { t: Template }) {
  return (
    <div
      className="group relative flex flex-col rounded-2xl border border-dilu-border bg-dilu-surface hover:border-white/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}80)` }}
      />

      {/* Coming soon badge */}
      {t.status === 'coming-soon' && (
        <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full bg-dilu-bg border border-dilu-border text-dilu-muted">
          Coming soon
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Icon + Name */}
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: `${t.color}20` }}
          >
            {t.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{t.name}</h3>
            <p className="text-sm text-dilu-muted mt-0.5">{t.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-dilu-muted leading-relaxed flex-1">{t.description}</p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {t.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md border border-dilu-border text-dilu-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-dilu-border">
          <Link
            href={`/templates/${t.id}`}
            className="text-xs text-dilu-muted hover:text-white transition-colors flex items-center gap-1"
          >
            <span>View details</span>
            <span>→</span>
          </Link>
          {t.liveUrl && (
            <a
              href={t.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-dilu-muted hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Live demo</span>
              <span>↗</span>
            </a>
          )}
          <Link
            href={t.status === 'available' ? `/start?template=${t.id}` : '#waitlist'}
            className={`ml-auto text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
              t.status === 'available'
                ? 'bg-white/10 hover:bg-white/15 text-white'
                : 'bg-dilu-border text-dilu-muted'
            }`}
          >
            {t.status === 'available' ? 'Use template' : 'Notify me'}
          </Link>
        </div>
      </div>
    </div>
  );
}
