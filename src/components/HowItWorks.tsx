const steps = [
  {
    number: '01',
    title: 'Pick a template',
    description:
      "Browse templates built from real WokSpec products. Each one ships production-ready — AI integrated, Cloudflare deployed, fully owned by you.",
  },
  {
    number: '02',
    title: 'Configure in minutes',
    description:
      'Tell us your brand, your domain, your tone. Dilu handles the rest — no environment variables, no YAML files, no CLI knowledge required.',
  },
  {
    number: '03',
    title: 'Ship and own it',
    description:
      "Your product goes live on your domain, backed by Cloudflare's global network. You get the code, the repo, and full control. No platform lock-in.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            Zero complexity. Real products.
          </h2>
          <p className="text-dilu-muted mt-4 text-lg max-w-xl mx-auto">
            We spent years building WokSpec the hard way. Dilu is the shortcut we wish existed.
          </p>
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
