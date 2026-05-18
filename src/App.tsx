/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import CheckoutWizard from "./components/CheckoutWizard";

export default function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] z-[60] origin-left shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        style={{ scaleX }}
      />

      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />
      
      <main>
        <Hero onOpenWizard={() => setIsWizardOpen(true)} />
        <Features onOpenWizard={() => setIsWizardOpen(true)} />
        <HowItWorks />
        <FAQ />
        <FinalCTA onOpenWizard={() => setIsWizardOpen(true)} />
      </main>

      <Footer />

      <CheckoutWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />

      {/* Decorative Grid and Accents */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.03]" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-secondary/15 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}
