const steps = [
  {
    number: "01",
    title: "Pick a template",
    description: "Browse templates built from real WokSpec products — each one already runs in production.",
  },
  {
    number: "02",
    title: "Configure it",
    description: "Set your name, colors, and domain. That is it.",
  },
  {
    number: "03",
    title: "Get the repo",
    description: "A GitHub repo is created in your account and deployed to Cloudflare. You own it.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black">Three steps.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-8 rounded-2xl bg-dilu-surface border border-dilu-border hover:border-dilu-purple/30 transition-colors group"
            >
              <div className="text-5xl font-black text-gradient opacity-30 mb-6 group-hover:opacity-60 transition-opacity">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-dilu-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
