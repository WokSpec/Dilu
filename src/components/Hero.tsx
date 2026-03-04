export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 bg-dilu-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-dilu-purple/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dilu-purple/30 bg-dilu-purple/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-dilu-green animate-pulse-slow" />
          <span className="text-xs font-medium text-dilu-purple">Early access — join the waitlist</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
          Build your vision.
          <br />
          <span className="text-gradient">No code.</span>
          <br />
          No dashboards.
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-dilu-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Dilu is the WokSpec launchpad. Pick a battle-tested template, configure it in minutes,
          and ship a real product — powered by AI, deployed on Cloudflare, owned by you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#templates"
            className="px-8 py-4 rounded-xl bg-dilu-gradient font-semibold text-base hover:opacity-90 transition-opacity glow-purple"
          >
            Browse templates
          </a>
          <a
            href="#waitlist"
            className="px-8 py-4 rounded-xl border border-dilu-border text-dilu-muted hover:text-white hover:border-white/20 transition-all font-semibold text-base"
          >
            Join waitlist →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          {[
            { value: '6', label: 'Templates' },
            { value: '∞', label: 'Free to deploy' },
            { value: '0', label: 'Dashboards to manage' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black text-gradient">{s.value}</div>
              <div className="text-sm text-dilu-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dilu-muted">
        <span className="text-xs">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-dilu-muted to-transparent" />
      </div>
    </section>
  );
}
