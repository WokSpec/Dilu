import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import TemplateGallery from '@/components/TemplateGallery';
import Features from '@/components/Features';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <TemplateGallery />
        <Features />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
