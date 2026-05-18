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

      {/* Sistema de Fondo Cósmico Espacial de Élite (Unificado & Multicapa) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020204]">
        {/* Nebulosa Superior Derecha (Cian/Azul) */}
        <div className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-[#00F0FF]/12 via-[#7000FF]/4 to-transparent rounded-full blur-[140px] animate-pulse-slow" />
        
        {/* Nebulosa Central Izquierda (Morado/Magenta) */}
        <div className="absolute top-[35%] left-[-20%] w-[1000px] h-[1000px] bg-gradient-to-br from-[#AD00FF]/8 via-[#FF007A]/2 to-transparent rounded-full blur-[160px] animate-pulse-medium" />
        
        {/* Nebulosa Inferior Derecha (Rosa/Violeta) */}
        <div className="absolute bottom-[-10%] right-[-15%] w-[800px] h-[800px] bg-gradient-to-br from-[#FF007A]/10 via-[#7000FF]/3 to-transparent rounded-full blur-[130px] animate-pulse-slow" />

        {/* Polvo Estelar y Constelaciones (Patrón de Estrellas en Múltiples Planos) */}
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
        
        {/* Rejilla de Datos Holográfica (Sutil) */}
        <div className="absolute inset-0 dot-grid opacity-[0.02]" />

        {/* Capa de Brillo de Interferencia Atmosférica (Gradiente Lineal Continuo) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/40 to-[#020204]" />
      </div>
    </div>
  );
}
