import Link from "next/link";
import type { Template } from "@/lib/templates";

export default function TemplateCard({ t }: { t: Template }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-dilu-border bg-dilu-surface hover:border-white/10 transition-all duration-300 overflow-hidden">
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}40)` }}
      />

      {t.status === "coming-soon" && (
        <div className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-dilu-bg border border-dilu-border text-dilu-muted">
          Coming soon
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-bold text-lg leading-tight">{t.name}</h3>
          <p className="text-sm text-dilu-muted mt-1">{t.tagline}</p>
        </div>

        <p className="text-sm text-dilu-muted leading-relaxed flex-1">{t.description}</p>

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

        <div className="flex items-center gap-3 pt-2 border-t border-dilu-border">
          <Link
            href={`/templates/${t.id}`}
            className="text-xs text-dilu-muted hover:text-white transition-colors"
          >
            Details →
          </Link>
          {t.liveUrl && (
            <a
              href={t.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-dilu-muted hover:text-white transition-colors"
            >
              Live ↗
            </a>
          )}
          <Link
            href={t.status === "available" ? `/start?template=${t.id}` : "#waitlist"}
            className={`ml-auto text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
              t.status === "available"
                ? "bg-white/10 hover:bg-white/15 text-white"
                : "bg-dilu-border text-dilu-muted cursor-default"
            }`}
          >
            {t.status === "available" ? "Use template" : "Notify me"}
          </Link>
        </div>
      </div>
    </div>
  );
}
