import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TemplateGallery from "@/components/TemplateGallery";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TemplateGallery />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
