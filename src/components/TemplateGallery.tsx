import { templates } from '@/lib/templates';
import TemplateCard from './TemplateCard';

export default function TemplateGallery() {
  return (
    <section id="templates" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-dilu-purple font-semibold text-sm uppercase tracking-widest mb-4">
            Templates
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            Build with what works.
          </h2>
          <p className="text-dilu-muted mt-4 text-lg max-w-2xl mx-auto">
            Every template is a real WokSpec product — battle-tested, AI-integrated, and live in production.
            Take it, make it yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-dilu-muted text-sm">
            More templates in progress —{' '}
            <a href="#waitlist" className="text-dilu-purple hover:underline">
              join the waitlist
            </a>{' '}
            to get notified when new ones drop.
          </p>
        </div>
      </div>
    </section>
  );
}
