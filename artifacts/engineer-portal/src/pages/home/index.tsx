import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import MediAISection from './MediAISection';
import CapabilitiesSection from './CapabilitiesSection';
import TimelineSection from './TimelineSection';
import ContactSection from './ContactSection';

export default function Home() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <MediAISection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}