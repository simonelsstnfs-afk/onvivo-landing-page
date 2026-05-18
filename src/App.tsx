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
    <div className="relative min-h-screen cosmic-background">
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
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* Auroras y Nebulosas Flotantes Dinámicas (Efecto Adicional de Profundidad) */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[30%] left-[-10%] w-[900px] h-[900px] bg-[#AD00FF]/8 rounded-full blur-[140px] animate-pulse-medium" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#FF007A]/8 rounded-full blur-[110px] animate-pulse-slow" />

        {/* Polvo Estelar, Constelaciones y Destellos en Cruz (SVG Real de Alta Fidelidad) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.45]" xmlns="http://www.w3.org/2000/svg">
          {/* Estrellas Brillantes */}
          <circle cx="8%" cy="12%" r="1.5" className="fill-white animate-twinkle-slow" />
          <circle cx="88%" cy="8%" r="2" className="fill-white animate-twinkle-fast" />
          <circle cx="48%" cy="22%" r="1.2" className="fill-white animate-twinkle-slow" />
          <circle cx="72%" cy="38%" r="2.5" className="fill-cyan-300 animate-twinkle-medium" />
          <circle cx="28%" cy="52%" r="1.5" className="fill-white animate-twinkle-fast" />
          <circle cx="62%" cy="68%" r="2" className="fill-purple-300 animate-twinkle-slow" />
          <circle cx="92%" cy="62%" r="1.2" className="fill-white animate-twinkle-medium" />
          <circle cx="12%" cy="78%" r="2" className="fill-white animate-twinkle-fast" />
          <circle cx="38%" cy="82%" r="2.5" className="fill-[#FF007A] animate-twinkle-slow" />
          <circle cx="82%" cy="88%" r="1.5" className="fill-white animate-twinkle-medium" />
          
          <circle cx="22%" cy="28%" r="1.2" className="fill-white animate-twinkle-medium" />
          <circle cx="78%" cy="58%" r="1.5" className="fill-cyan-200 animate-twinkle-slow" />
          <circle cx="5%" cy="48%" r="1" className="fill-white animate-twinkle-fast" />
          <circle cx="95%" cy="82%" r="1.8" className="fill-purple-200 animate-twinkle-medium" />
          
          {/* Destellos de Estrella (Cruz de 4 Puntas) */}
          <g transform="translate(180, 140)" className="animate-twinkle-slow">
            <path d="M-8,0 L8,0 M0,-8 L0,8" className="stroke-cyan-400/50 stroke-[0.75]" />
            <circle cx="0" cy="0" r="1.5" className="fill-cyan-400" />
          </g>
          <g transform="translate(1120, 220)" className="animate-twinkle-medium">
            <path d="M-10,0 L10,0 M0,-10 L0,10" className="stroke-white/60 stroke-[0.75]" />
            <circle cx="0" cy="0" r="2" className="fill-white" />
          </g>
          <g transform="translate(320, 680)" className="animate-twinkle-slow">
            <path d="M-8,0 L8,0 M0,-8 L0,8" className="stroke-[#FF007A]/50 stroke-[0.75]" />
            <circle cx="0" cy="0" r="1.5" className="fill-[#FF007A]" />
          </g>
          <g transform="translate(1080, 780)" className="animate-twinkle-fast">
            <path d="M-10,0 L10,0 M0,-10 L0,10" className="stroke-cyan-300/50 stroke-[0.75]" />
            <circle cx="0" cy="0" r="2" className="fill-cyan-300" />
          </g>

          {/* Constelación Fénix (Superior Izquierda) */}
          <path d="M 180,140 L 260,210 L 310,170 L 420,260" className="stroke-white/15 stroke-[0.75] fill-none" strokeDasharray="3 3" />
          <circle cx="260" cy="210" r="1" className="fill-white" />
          <circle cx="310" cy="170" r="1.5" className="fill-white animate-twinkle-fast" />

          {/* Constelación Orión (Superior Derecha) */}
          <path d="M 880,80 L 980,150 L 1120,220 L 1080,310" className="stroke-cyan-400/15 stroke-[0.75] fill-none" strokeDasharray="3 3" />
          <circle cx="980" cy="150" r="1.2" className="fill-cyan-400" />
          <circle cx="1080" cy="310" r="1" className="fill-white animate-twinkle-slow" />

          {/* Constelación Lira (Centro-Izquierda) */}
          <path d="M 80,500 L 160,560 L 210,460 M 160,560 L 320,680" className="stroke-purple-400/15 stroke-[0.75] fill-none" strokeDasharray="3 3" />
          <circle cx="80" cy="500" r="1" className="fill-white" />
          <circle cx="160" cy="560" r="1.2" className="fill-purple-400" />
          <circle cx="210" cy="460" r="1.5" className="fill-white animate-twinkle-fast" />
        </svg>
        
        {/* Rejilla de Datos Holográfica (Sutil - Integrada con Estilo) */}
        <div className="absolute inset-0 dot-grid opacity-[0.025]" />

        {/* Capa de Brillo de Interferencia Atmosférica (Gradiente Lineal Continuo) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/20 to-[#020204]/90" />
      </div>
    </div>
  );
}
