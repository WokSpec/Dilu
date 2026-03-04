const features = [
  {
    icon: "⚡",
    title: "Cloudflare",
    description: "Pages, Workers, KV, D1. No server to manage. Free tier handles real traffic.",
  },
  {
    icon: "🤖",
    title: "Eral included",
    description: "AI chat and memory on every template. Powered by the Eral worker.",
  },
  {
    icon: "🔑",
    title: "Your repo",
    description: "GitHub repo in your account. Fork it, change it, delete it — your call.",
  },
  {
    icon: "🆓",
    title: "Free to start",
    description: "Most products never leave the free tier.",
  },
  {
    icon: "🔧",
    title: "From live products",
    description: "Templates come from WokPost, WokTool, and Eral running in production now.",
  },
  {
    icon: "🚀",
    title: "Minutes, not days",
    description: "Pick, configure, deploy.",
  },
];

export default function Features() {
  return (
    <section className="py-32 px-6 border-t border-dilu-border">
      <div className="max-w-5xl mx-auto">
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
