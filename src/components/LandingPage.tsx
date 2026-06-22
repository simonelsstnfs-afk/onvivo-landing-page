import React from 'react';
import { Navbar } from './landing/navbar';
import { Hero } from './landing/hero';
import { Services } from './landing/services';
import { B2BPanel } from './landing/b2b-panel';
import { Process } from './landing/process';
import { CTA } from './landing/cta';
import { Footer } from './landing/footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <B2BPanel />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
