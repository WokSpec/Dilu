import { templates } from "@/lib/templates";
import TemplateCard from "./TemplateCard";

export default function TemplateGallery() {
  return (
    <section id="templates" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
