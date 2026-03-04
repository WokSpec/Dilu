export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-dilu-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-dilu-purple/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
          Pick a template.
          <br />
          <span className="text-gradient">Ship it.</span>
        </h1>

        <p className="text-lg md:text-xl text-dilu-muted max-w-xl mx-auto mb-10 leading-relaxed">
          Templates built from real WokSpec products. Add your brand and domain. Get a working codebase deployed on Cloudflare.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#templates"
            className="px-8 py-4 rounded-xl bg-dilu-gradient font-semibold text-base hover:opacity-90 transition-opacity glow-purple"
          >
            See templates
          </a>
          <a
            href="#waitlist"
            className="px-8 py-4 rounded-xl border border-dilu-border text-dilu-muted hover:text-white hover:border-white/20 transition-all font-semibold text-base"
          >
            Get early access
          </a>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          {[
            { value: "6", label: "Templates" },
            { value: "CF", label: "Free tier" },
            { value: "Git", label: "Your repo" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black text-gradient">{s.value}</div>
              <div className="text-sm text-dilu-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dilu-muted">
        <span className="text-xs">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-dilu-muted to-transparent" />
      </div>
    </section>
  );
}
