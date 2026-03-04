const features = [
  {
    icon: '⚡',
    title: 'Deploy to Cloudflare',
    description: "Everything runs on Cloudflare's edge — Pages, Workers, KV, D1. Zero server management, global by default.",
  },
  {
    icon: '🤖',
    title: 'Eral AI built in',
    description: "Every template ships with Eral — WokSpec's AI layer. Memory, context, and smart suggestions from day one.",
  },
  {
    icon: '🔑',
    title: 'You own the code',
    description: 'Your project. Your GitHub repo. Your domain. No platform lock-in. Fork it, extend it, keep it forever.',
  },
  {
    icon: '🆓',
    title: 'Free to launch',
    description: "Cloudflare's free tier handles real traffic. Most products never need to pay anything to scale.",
  },
  {
    icon: '🔧',
    title: 'Production-tested',
    description: "These aren't starter kits. They're live products — WokPost, WokTool, Eral — running in production right now.",
  },
  {
    icon: '🚀',
    title: 'Ship in minutes',
    description: 'Configure your product, connect your domain, and go live — the whole thing measured in minutes, not days.',
  },
];

export default function Features() {
  return (
    <section className="py-32 px-6 border-t border-dilu-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-4">
            Why Dilu
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            Built the way WokSpec builds.
          </h2>
          <p className="text-dilu-muted mt-4 text-lg max-w-xl mx-auto">
            Every decision we made building WokSpec is baked into every template.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-dilu-surface border border-dilu-border hover:border-dilu-purple/20 transition-colors"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-dilu-muted leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
