import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TermIcon, CheckCircle2 } from 'lucide-react'

const STEPS = [
  { text: 'Iniciando Engine: Playwright (Chromium Headless)...', type: 'system', delay: 500 },
  { text: 'Conectando a la pasarela de Stremio API...', type: 'system', delay: 1500 },
  { text: 'Rellenando formulario de registro con credenciales de cliente...', type: 'system', delay: 3000 },
  { text: 'Aceptando términos y política de privacidad...', type: 'system', delay: 4000 },
  { text: 'Cuenta creada. Extrayendo cookie de sesión authKey...', type: 'success', delay: 5500 },
  { text: 'Descargando manifiestos del pack B2B (9 Addons Premium)...', type: 'system', delay: 7000 },
  { text: 'Inyectando Addons en la cuenta...', type: 'system', delay: 8500 },
  { text: 'Validando catálogos y resoluciones 1080p...', type: 'system', delay: 10000 },
  { text: 'Setup automatizado finalizado con éxito (Tiempo: 12.4s).', type: 'success', delay: 11500 },
]

export function PlaywrightTerminal() {
  const [lines, setLines] = useState<{ text: string; type: string; time: string }[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []
    
    const runSequence = () => {
      setLines([])
      setIsFinished(false)
      
      STEPS.forEach((step, index) => {
        const timeout = setTimeout(() => {
          const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' })
          setLines(prev => [...prev, { text: step.text, type: step.type, time }])
          
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
          }
          
          if (index === STEPS.length - 1) {
            setIsFinished(true)
            timeouts.push(setTimeout(() => {
              runSequence()
            }, 5000))
          }
        }, step.delay)
        
        timeouts.push(timeout)
      })
    }

    runSequence()

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl bg-[#0a0a0f]/90 z-10">
      {/* Header */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2">
          <TermIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">
            Terminal Playwright
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
      </div>

      {/* Console Area */}
      <div 
        ref={containerRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-2.5 scrollbar-thin scrollbar-thumb-white/10"
      >
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3"
            >
              <span className="text-slate-500 shrink-0 select-none mt-0.5">
                {line.time}
              </span>
              
              {line.type === 'system' ? (
                <span className="text-cyan-400/90 leading-relaxed break-words">
                  <span className="text-cyan-500/50 mr-2">›</span>
                  {line.text}
                </span>
              ) : (
                <span className="text-emerald-400 font-medium leading-relaxed break-words flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  {line.text}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {!isFinished && (
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-cyan-400/50 ml-16 mt-2"
          />
        )}
      </div>
    </div>
  )
}
