import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Globe, Mic, Tv, Mail, CheckCircle, ArrowRight, ArrowLeft, Type, 
  AlertTriangle, Terminal, ShieldCheck, Sparkles, HelpCircle 
} from 'lucide-react';

interface CheckoutWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGE_OPTIONS = ['Inglés', 'Español', 'Francés', 'Italiano', 'Otro'];

// Configuración de colores temáticos y glows según el paso actual
const STEP_THEMES = [
  { // 0: Idioma de la interfaz (Cian / Turquesa)
    color: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.25)',
    bgGlow: 'from-[#00F0FF]/15 to-[#AD00FF]/5',
    title: 'Idioma de la Interfaz',
    subtitle: 'PASO 01 // 05: INTERFACE_LANG',
    desc: '¿En qué idioma prefieres tu plataforma?'
  },
  { // 1: Audio de película (Morado / Violeta)
    color: '#AD00FF',
    glow: 'rgba(173, 0, 255, 0.25)',
    bgGlow: 'from-[#AD00FF]/15 to-[#FF007A]/5',
    title: 'Audio de Película',
    subtitle: 'PASO 02 // 05: MOVIE_AUDIO',
    desc: '¿En qué idioma prefieres escuchar por defecto?'
  },
  { // 2: Idioma de subtítulos (Rosa / Magenta)
    color: '#FF007A',
    glow: 'rgba(255, 0, 122, 0.25)',
    bgGlow: 'from-[#FF007A]/15 to-[#00F0FF]/5',
    title: 'Idioma de Subtítulos',
    subtitle: 'PASO 03 // 05: SUBTITLES_LANG',
    desc: '¿En qué idioma quieres leer los subtítulos?'
  },
  { // 3: Anime (Naranja / Fuego)
    color: '#FF5500',
    glow: 'rgba(255, 85, 0, 0.25)',
    bgGlow: 'from-[#FF5500]/15 to-[#FF007A]/5',
    title: '¿Eres fan del Anime?',
    subtitle: 'PASO 04 // 05: ANIME_ADDON',
    desc: 'Podemos incluir catálogos especializados de animación japonesa para ti.'
  },
  { // 4: Email (Verde Esmeralda / Cian)
    color: '#00FF85',
    glow: 'rgba(0, 255, 133, 0.25)',
    bgGlow: 'from-[#00FF85]/15 to-[#00F0FF]/5',
    title: 'Tu Email de Entrega',
    subtitle: 'PASO 05 // 05: DELIVERY_EMAIL',
    desc: '¿A qué email enviamos tu guía y credenciales?'
  },
  { // 5: Resumen & Pago (Gradiente Cromático completo)
    color: '#AD00FF',
    glow: 'rgba(0, 240, 255, 0.35)',
    bgGlow: 'from-[#00F0FF]/10 via-[#AD00FF]/10 to-[#FF007A]/10',
    title: 'Revisa tu Configuración',
    subtitle: 'COMPRA SEGURA // ACCESO_INMEDIATO',
    desc: 'Confirma los detalles de tu plan premium y procede al pago.'
  },
  { // 6: Éxito de Simulación (Oro / Cian)
    color: '#FFD700',
    glow: 'rgba(255, 215, 0, 0.35)',
    bgGlow: 'from-[#FFD700]/25 to-[#00F0FF]/10',
    title: '¡Simulación Exitosa!',
    subtitle: 'ONVIVO_SYSTEM // OK',
    desc: 'Has completado la personalización cinemática con éxito.'
  }
];

export default function CheckoutWizard({ isOpen, onClose }: CheckoutWizardProps) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    language: '',
    audio: '',
    audioCustom: '',
    subtitles: '',
    subtitlesCustom: '',
    anime: null as boolean | null,
    email: '',
  });

  const updatePreference = (key: keyof typeof preferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Configuración de Lemon Squeezy y estado de pasarela (Forzado a activo para compra directa única web)
  const productUrl = import.meta.env.VITE_LEMON_SQUEEZY_PRODUCT_URL || 'https://onvivo.lemonsqueezy.com/buy/tu-producto-id';

  const finalAudio = preferences.audio === 'Otro' ? preferences.audioCustom : preferences.audio;
  const finalSubtitles = preferences.subtitles === 'Otro' ? preferences.subtitlesCustom : preferences.subtitles;

  const handleCheckout = () => {
    if (window.LemonSqueezy) {
      window.LemonSqueezy.Setup({
        checkoutData: {
          email: preferences.email,
          custom: {
            language: preferences.language,
            audio: finalAudio,
            subtitles: finalSubtitles,
            anime: preferences.anime ? 'yes' : 'no'
          }
        }
      });
      window.LemonSqueezy.Url.Open(productUrl);
    } else {
      window.open(productUrl, '_blank');
    }
  };

  if (!isOpen) return null;

  // Obtener el tema visual del paso actual
  const currentTheme = STEP_THEMES[step] || STEP_THEMES[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{ 
            boxShadow: `0 30px 100px rgba(0, 0, 0, 0.9), 0 0 50px ${currentTheme.glow}30`,
            borderColor: `${currentTheme.color}35`
          }}
          className="relative w-full max-w-lg backdrop-blur-3xl bg-[#07070a]/90 border rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto transition-all duration-500"
        >
          {/* Aurora espacial animada de fondo adaptativa por paso */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gradient-to-b ${currentTheme.bgGlow} rounded-full blur-[100px] transition-all duration-1000 ease-out`} />
            <div className="absolute inset-0 dot-grid opacity-[0.02]" />
          </div>

          {/* Progress Bar Cromática Premium con Shimmer y Brillo Flotante */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] relative"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / 7) * 100}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            >
              {/* Brillo flotante en el extremo activo */}
              <div 
                style={{ boxShadow: `0 0 15px #00F0FF, 0 0 5px #fff` }}
                className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-pulse"
              />
            </motion.div>
          </div>

          {/* Close Button de Cristal */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-full transition-all duration-300 z-10 cursor-pointer shadow-lg active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-8 pt-14">
            {/* Header del Paso Actual */}
            <div className="text-center mb-8 space-y-2">
              {/* Subtítulo Monospace del Sistema */}
              <span 
                style={{ color: currentTheme.color }}
                className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase block transition-colors duration-500"
              >
                {currentTheme.subtitle}
              </span>
              
              {/* Título del Paso */}
              <h2 className="text-2xl font-black text-white uppercase tracking-tight transition-all duration-500">
                {currentTheme.title}
              </h2>
              
              {/* Descripción */}
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm mx-auto">
                {currentTheme.desc}
              </p>
            </div>

            {/* Renderizado de Pasos con Transición de Entrada Lateral Premium */}
            <AnimatePresence mode="wait">
              {/* STEP 0: LANGUAGE */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="space-y-6"
                >
                  {/* Icono animado glowing en cabecera */}
                  <div className="flex justify-center">
                    <div 
                      style={{ 
                        boxShadow: `0 0 30px ${currentTheme.glow}30`, 
                        borderColor: `${currentTheme.color}30` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-white/[0.02] border flex items-center justify-center animate-pulse"
                    >
                      <Globe className="w-8 h-8 text-[#00F0FF]" />
                    </div>
                  </div>

                  {/* Grid de Cartas Elásticas */}
                  <div className="grid grid-cols-2 gap-3">
                    {['Español', 'Inglés', 'Portugués', 'Francés'].map((lang) => {
                      const isSelected = preferences.language === lang;
                      return (
                        <motion.button
                          key={lang}
                          onClick={() => {
                            updatePreference('language', lang);
                            nextStep();
                          }}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 350, damping: 18 }}
                          style={{
                            borderColor: isSelected ? '#00F0FF' : 'rgba(255, 255, 255, 0.05)',
                            boxShadow: isSelected ? '0 0 25px rgba(0, 240, 255, 0.15)' : 'none',
                          }}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-colors duration-300 backdrop-blur-md ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#00F0FF]/15 to-[#AD00FF]/5 text-white font-bold'
                              : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        >
                          <div className="text-xs font-mono text-white/30 mb-1">
                            {lang === 'Español' ? 'LANG_ES' : lang === 'Inglés' ? 'LANG_EN' : lang === 'Portugués' ? 'LANG_PT' : 'LANG_FR'}
                          </div>
                          <div className="text-sm font-bold tracking-wide">{lang}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 1: MOVIE AUDIO */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center">
                    <div 
                      style={{ 
                        boxShadow: `0 0 30px ${currentTheme.glow}30`, 
                        borderColor: `${currentTheme.color}30` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-white/[0.02] border flex items-center justify-center animate-pulse"
                    >
                      <Mic className="w-8 h-8 text-[#AD00FF]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {LANGUAGE_OPTIONS.map((lang) => {
                      const isSelected = preferences.audio === lang;
                      return (
                        <motion.button
                          key={lang}
                          onClick={() => {
                            updatePreference('audio', lang);
                            if (lang !== 'Otro') {
                              updatePreference('audioCustom', '');
                              nextStep();
                            }
                          }}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 350, damping: 18 }}
                          style={{
                            borderColor: isSelected ? '#AD00FF' : 'rgba(255, 255, 255, 0.05)',
                            boxShadow: isSelected ? '0 0 25px rgba(173, 0, 255, 0.15)' : 'none',
                          }}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-colors duration-300 backdrop-blur-md ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#AD00FF]/15 to-[#FF007A]/5 text-white font-bold'
                              : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        >
                          <div className="text-xs font-mono text-white/30 mb-1">
                            {lang === 'Otro' ? 'AUDIO_CUSTOM' : 'AUDIO_PRESET'}
                          </div>
                          <div className="text-sm font-bold tracking-wide">{lang}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  {preferences.audio === 'Otro' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      className="space-y-4 pt-2 relative"
                    >
                      <div className="absolute right-4 top-6 text-[8px] font-mono text-white/20 select-none">INPUT_FIELD</div>
                      <input
                        type="text"
                        value={preferences.audioCustom}
                        onChange={(e) => updatePreference('audioCustom', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && preferences.audioCustom.trim() !== '') {
                            nextStep();
                          }
                        }}
                        placeholder="Escribe tu idioma de audio..."
                        className="w-full bg-black/45 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono tracking-wide placeholder:text-white/25 focus:outline-none focus:border-[#AD00FF] focus:shadow-[0_0_20px_rgba(173,0,255,0.2)] focus:ring-0 transition-all duration-300"
                        autoFocus
                      />
                      <motion.button
                        onClick={nextStep}
                        disabled={preferences.audioCustom.trim() === ''}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-[#AD00FF]/25 to-[#FF007A]/25 text-[#AD00FF] hover:text-white border border-[#AD00FF]/50 font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#AD00FF] hover:to-[#FF007A] hover:shadow-[0_0_20px_rgba(173,0,255,0.3)] transition-all duration-300 cursor-pointer text-xs font-mono uppercase tracking-widest"
                      >
                        Confirmar Idioma
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: SUBTITLES */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center">
                    <div 
                      style={{ 
                        boxShadow: `0 0 30px ${currentTheme.glow}30`, 
                        borderColor: `${currentTheme.color}30` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-white/[0.02] border flex items-center justify-center animate-pulse"
                    >
                      <Type className="w-8 h-8 text-[#FF007A]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {LANGUAGE_OPTIONS.map((lang) => {
                      const isSelected = preferences.subtitles === lang;
                      return (
                        <motion.button
                          key={lang}
                          onClick={() => {
                            updatePreference('subtitles', lang);
                            if (lang !== 'Otro') {
                              updatePreference('subtitlesCustom', '');
                              nextStep();
                            }
                          }}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 350, damping: 18 }}
                          style={{
                            borderColor: isSelected ? '#FF007A' : 'rgba(255, 255, 255, 0.05)',
                            boxShadow: isSelected ? '0 0 25px rgba(255, 0, 122, 0.15)' : 'none',
                          }}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-colors duration-300 backdrop-blur-md ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#FF007A]/15 to-[#00F0FF]/5 text-white font-bold'
                              : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        >
                          <div className="text-xs font-mono text-white/30 mb-1">
                            {lang === 'Otro' ? 'SUB_CUSTOM' : 'SUB_PRESET'}
                          </div>
                          <div className="text-sm font-bold tracking-wide">{lang}</div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {preferences.subtitles === 'Otro' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      className="space-y-4 pt-2 relative"
                    >
                      <div className="absolute right-4 top-6 text-[8px] font-mono text-white/20 select-none">INPUT_FIELD</div>
                      <input
                        type="text"
                        value={preferences.subtitlesCustom}
                        onChange={(e) => updatePreference('subtitlesCustom', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && preferences.subtitlesCustom.trim() !== '') {
                            nextStep();
                          }
                        }}
                        placeholder="Escribe tu idioma de subtítulos..."
                        className="w-full bg-black/45 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono tracking-wide placeholder:text-white/25 focus:outline-none focus:border-[#FF007A] focus:shadow-[0_0_20px_rgba(255,0,122,0.2)] focus:ring-0 transition-all duration-300"
                        autoFocus
                      />
                      <motion.button
                        onClick={nextStep}
                        disabled={preferences.subtitlesCustom.trim() === ''}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-[#FF007A]/25 to-[#00F0FF]/25 text-[#FF007A] hover:text-white border border-[#FF007A]/50 font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#FF007A] hover:to-[#00F0FF] hover:shadow-[0_0_20px_rgba(255,0,122,0.3)] transition-all duration-300 cursor-pointer text-xs font-mono uppercase tracking-widest"
                      >
                        Confirmar Subtítulos
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 3: ANIME */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center">
                    <div 
                      style={{ 
                        boxShadow: `0 0 30px ${currentTheme.glow}30`, 
                        borderColor: `${currentTheme.color}30` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-white/[0.02] border flex items-center justify-center animate-pulse"
                    >
                      <Tv className="w-8 h-8 text-[#FF5500]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <motion.button
                      onClick={() => {
                        updatePreference('anime', true);
                        nextStep();
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 350, damping: 18 }}
                      style={{
                        borderColor: preferences.anime === true ? '#FF5500' : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: preferences.anime === true ? '0 0 25px rgba(255, 85, 0, 0.15)' : 'none',
                      }}
                      className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 backdrop-blur-md flex items-center justify-between ${
                        preferences.anime === true
                          ? 'bg-gradient-to-br from-[#FF5500]/15 to-[#FF007A]/5 text-white'
                          : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] font-mono text-[#FF5500] font-bold tracking-widest mb-1">RECOMMENDED</div>
                        <div className="font-extrabold text-sm uppercase tracking-wide">Sí, incluir Anime Premium</div>
                        <div className="text-[11px] text-white/40 mt-1">Integra catálogos, metadata (Kitsu) y estrenos semanales directos.</div>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-[#FF5500]/40 flex items-center justify-center shrink-0 ml-4">
                        {preferences.anime === true && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5500]" />}
                      </div>
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        updatePreference('anime', false);
                        nextStep();
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 350, damping: 18 }}
                      style={{
                        borderColor: preferences.anime === false ? '#FF5500' : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: preferences.anime === false ? '0 0 25px rgba(255, 85, 0, 0.1)' : 'none',
                      }}
                      className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 backdrop-blur-md flex items-center justify-between ${
                        preferences.anime === false
                          ? 'bg-white/[0.07] text-white'
                          : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] font-mono text-white/20 mb-1">STANDARD_SETUP</div>
                        <div className="font-bold text-sm uppercase tracking-wide">No, omitir contenido Anime</div>
                        <div className="text-[11px] text-white/40 mt-1">Configurar únicamente películas y series occidentales tradicionales.</div>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center shrink-0 ml-4">
                        {preferences.anime === false && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5500]" />}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: EMAIL */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center">
                    <div 
                      style={{ 
                        boxShadow: `0 0 30px ${currentTheme.glow}30`, 
                        borderColor: `${currentTheme.color}30` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-white/[0.02] border flex items-center justify-center animate-pulse"
                    >
                      <Mail className="w-8 h-8 text-[#00FF85]" />
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    <div className="absolute right-4 top-6 text-[8px] font-mono text-white/20 select-none">EMAIL_ADDR</div>
                    <input
                      type="email"
                      value={preferences.email}
                      onChange={(e) => updatePreference('email', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && isValidEmail(preferences.email)) {
                          nextStep();
                        }
                      }}
                      placeholder="ejemplo@correo.com"
                      className="w-full bg-black/45 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono tracking-wide placeholder:text-white/25 focus:outline-none focus:border-[#00FF85] focus:shadow-[0_0_20px_rgba(0,255,133,0.2)] focus:ring-0 transition-all duration-300"
                      autoFocus
                    />
                    <motion.button
                      onClick={nextStep}
                      disabled={!isValidEmail(preferences.email)}
                      whileHover={{ scale: 1.03, y: -2, boxShadow: '0 0 25px rgba(0, 255, 133, 0.35)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#00FF85] to-[#00F0FF] text-black font-extrabold py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:shadow-[0_0_20px_rgba(0,255,133,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-mono text-xs uppercase tracking-widest"
                    >
                      Continuar Proceso <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: SUMMARY & CHECKOUT */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center">
                    <div 
                      style={{ 
                        boxShadow: `0 0 35px rgba(0, 240, 255, 0.25)`, 
                        borderColor: `rgba(0, 240, 255, 0.3)` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-white/[0.02] border flex items-center justify-center animate-pulse"
                    >
                      <CheckCircle className="w-8 h-8 text-[#00F0FF]" />
                    </div>
                  </div>
                  
                  {/* Resumen Satinado Glassmorphic */}
                  <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-3.5 shadow-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/40 font-mono tracking-wider">INTERFACE_LANG:</span>
                      <span className="text-white font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">{preferences.language || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/40 font-mono tracking-wider">AUDIO_TRACK:</span>
                      <span className="text-white font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                        {finalAudio || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/40 font-mono tracking-wider">SUBTITLES:</span>
                      <span className="text-white font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                        {finalSubtitles || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/40 font-mono tracking-wider">ANIME_PACK:</span>
                      <span className="text-[#FF5500] font-mono font-bold bg-[#FF5500]/5 border border-[#FF5500]/25 px-2.5 py-1 rounded-lg">
                        {preferences.anime ? 'SI_INCLUIDO' : 'NO_INCLUIDO'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-3.5 border-t border-white/5 mt-3">
                      <span className="text-white/40 font-mono tracking-wider">DELIVERY_ADDR:</span>
                      <span className="text-[#00F0FF] font-mono font-bold text-right break-all truncate max-w-[200px]">{preferences.email}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Botón Principal: Finalizar y Pagar Shimmer */}
                    <motion.button
                      onClick={handleCheckout}
                      whileHover={{ scale: 1.03, y: -2, boxShadow: '0 0 45px rgba(0, 240, 255, 0.45)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group relative inline-flex items-center justify-center py-4 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF007A] text-white font-extrabold uppercase text-xs tracking-[0.2em] rounded-xl overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.35)] transition-all duration-300 cursor-pointer font-mono"
                    >
                      {/* Destello reflectivo (Shimmer Effect) */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                      <span className="relative z-10 flex items-center gap-2">
                        Finalizar y Pagar <Sparkles size={12} className="animate-spin-slow text-white" />
                      </span>
                    </motion.button>

                    {/* Botón de Simulación para Entorno de Desarrollo */}
                    {import.meta.env.DEV && (
                      <motion.button
                        onClick={() => setStep(6)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white/[0.02] hover:bg-[#00F0FF]/5 border border-white/5 hover:border-[#00F0FF]/30 text-white/50 hover:text-[#00F0FF] font-mono text-[10px] uppercase py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer tracking-wider"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        Simular Pago Exitoso (Dev Mode)
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 6: SIMULATED SUCCESS (Dev Mode Only) */}
              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="space-y-6 text-center"
                >
                  <div className="flex justify-center">
                    <div 
                      style={{ 
                        boxShadow: `0 0 40px rgba(255, 215, 0, 0.35)`, 
                        borderColor: `rgba(255, 215, 0, 0.4)` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 border flex items-center justify-center animate-bounce"
                    >
                      <ShieldCheck className="w-10 h-10 text-[#FFD700]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[#FFD700] uppercase tracking-wider">¡Simulación Exitosa!</h2>
                    <p className="text-white/60 text-xs max-w-sm mx-auto leading-relaxed">
                      Has completado el flujo de configuración. A continuación se detalla el payload enriquecido que sería procesado por el webhook en producción:
                    </p>
                  </div>

                  {/* Terminal de visualización de datos de consola */}
                  <div className="bg-black/95 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-left text-cyan-400 overflow-x-auto max-h-48 shadow-2xl relative">
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-white/30 border-b border-white/5 pb-2 mb-2 flex justify-between items-center select-none">
                      <span>onvivo-system-payload.json</span>
                      <span className="text-[8px] bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded tracking-widest font-bold">LOCAL_MOCK</span>
                    </div>
                    <pre className="leading-tight">{JSON.stringify({
                      email: preferences.email,
                      language: preferences.language,
                      audio: finalAudio,
                      subtitles: finalSubtitles,
                      anime: preferences.anime ? "yes" : "no",
                      status: "PAID",
                      channel: "web_checkout_direct",
                      createdAt: new Date().toISOString(),
                      metadata: {
                        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 30) : 'unknown',
                        environment: 'development'
                      }
                    }, null, 2)}</pre>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[10px] text-white/40 leading-relaxed text-left">
                    💡 **Próximo Paso Backend:** En producción, el webhook de Lemon Squeezy captura el evento `order_created` y escribe este JSON en la colección `orders` de Firestore, lo que activa el *Engineer Agent* de manera autónoma.
                  </div>

                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#FFD700] hover:bg-[#FFE042] text-black font-extrabold py-3.5 rounded-xl transition-all cursor-pointer font-mono text-xs uppercase tracking-widest shadow-xl"
                  >
                    Cerrar y Volver a la Landing
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          {step > 0 && step < 6 && (
            <div className="px-8 pb-8 pt-4 border-t border-white/5 bg-black/[0.1] backdrop-blur-md flex justify-between items-center">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-white/40 hover:text-white hover:translate-x-[-2px] transition-all text-xs font-mono tracking-wider cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> PREV_STEP
              </button>
              
              {/* Indicador de número de pasos en mono */}
              <span className="text-[10px] font-mono text-white/20 select-none">
                STEP_0{step + 1} // 06
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
