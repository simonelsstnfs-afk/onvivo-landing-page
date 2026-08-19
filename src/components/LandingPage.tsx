import React from 'react';
import { Navbar } from './landing/navbar';
import { Hero } from './landing/hero';
import { BentoFeatures } from './landing/BentoFeatures';
import { ConsoleShowcase } from './landing/ConsoleShowcase';
import { ComparisonTable } from './landing/ComparisonTable';
import { Testimonials } from './landing/Testimonials';
import { PricingCard } from './landing/PricingCard';
import { SetupWizard } from './landing/SetupWizard';
import { FAQ } from './landing/faq';
import { Footer } from './landing/footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0B0F19] text-[#E2E8FF] selection:bg-[#00F0FF]/30 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BentoFeatures />
        <ConsoleShowcase />
        <ComparisonTable />
        <Testimonials />
        <PricingCard />
        <SetupWizard />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
