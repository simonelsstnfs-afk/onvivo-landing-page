import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Globe, Mic, Tv, Mail, CheckCircle, ArrowRight, ArrowLeft, Type, 
  AlertTriangle, Terminal, ShieldCheck, Sparkles, HelpCircle 
} from 'lucide-react';

interface CheckoutWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedMovie?: string;
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

export default function CheckoutWizard({ isOpen, onClose, preSelectedMovie }: CheckoutWizardProps) {
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
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generar ID de Orden Alfanumérico Único una sola vez al llegar al paso 5
  useEffect(() => {
    if (step === 5 && !orderId) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = 'ONV-';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setOrderId(result);
    }
  }, [step, orderId]);

  const updatePreference = (key: keyof typeof preferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const finalAudio = preferences.audio === 'Otro' ? preferences.audioCustom : preferences.audio;
  const finalSubtitles = preferences.subtitles === 'Otro' ? preferences.subtitlesCustom : preferences.subtitles;

  // Guardar Orden en Firestore mediante REST API (Ligera y sin dependencias del SDK)
  const saveOrderToFirestore = async (orderIdStr: string, channel: 'whatsapp' | 'telegram') => {
    const url = `https://firestore.googleapis.com/v1/projects/propeller-hub-7/databases/(default)/documents/orders/${orderIdStr}`;
    
    const payload = {
      fields: {
        orderId: { stringValue: orderIdStr },
        customerEmail: { stringValue: preferences.email },
        status: { stringValue: 'RESERVED' },
        channel: { stringValue: channel },
        config_language: { stringValue: preferences.language === 'Español' ? 'es' : 'en' },
        ui_language: { stringValue: preferences.language === 'Español' ? 'es' : 'en' },
        preferences: {
          mapValue: {
            fields: {
              language: { stringValue: preferences.language },
              audio: { stringValue: finalAudio },
              subtitles: { stringValue: finalSubtitles },
              anime: { booleanValue: !!preferences.anime }
            }
          }
        },
        created_at: { stringValue: new Date().toISOString() },
        updated_at: { stringValue: new Date().toISOString() }
      }
    };

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Error al guardar la orden en Firestore');
    }
  };

  const handleChannelCheckout = async (channel: 'whatsapp' | 'telegram') => {
    setIsLoading(true);
    try {
      await saveOrderToFirestore(orderId, channel);
      
      const animeText = preferences.anime ? "Sí" : "No";

      if (channel === 'whatsapp') {
        const text = `¡Hola onvivo! Acabo de configurar mi cine en la web. 🍿\n\n` +
                     `* ID de Orden: ${orderId}\n` +
                     `* Preferencias: Películas, Series y Anime (${animeText})\n` +
                     `* Audio: ${finalAudio} // Subs: ${finalSubtitles}\n` +
                     `* Email de entrega: ${preferences.email}\n\n` +
                     `¿Cómo realizo el pago único de 50€ para activar mi cuenta?`;
        
        const whatsappUrl = `https://wa.me/34600000000?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        const telegramUrl = `https://t.me/onvivo_bot?start=${orderId}`;
        window.open(telegramUrl, '_blank');
      }
      
      setStep(6);
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al registrar tu orden en el sistema. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
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
                  <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-3.5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-2 right-4 text-[9px] font-mono text-[#00F0FF]/50 border border-[#00F0FF]/20 px-2 py-0.5 rounded bg-[#00F0FF]/5 font-bold animate-pulse">
                      {orderId}
                    </div>

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

                  <p className="text-[11px] text-white/40 leading-relaxed text-center max-w-sm mx-auto">
                    Tu configuración está reservada. Elige por cuál de nuestras plataformas oficiales prefieres continuar para realizar el pago de **50€ (pago único)** y recibir tus accesos:
                  </p>

                  <div className="space-y-3">
                    {isLoading ? (
                      <div className="py-6 flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-t-[#00F0FF] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest animate-pulse">Guardando Configuración...</span>
                      </div>
                    ) : (
                      <>
                        {/* Botón Verde: WhatsApp */}
                        <motion.button
                          onClick={() => handleChannelCheckout('whatsapp')}
                          whileHover={{ scale: 1.02, y: -2, boxShadow: '0 0 30px rgba(37, 211, 102, 0.25)' }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full relative inline-flex items-center justify-center py-4 bg-gradient-to-r from-[#25D366]/20 to-[#25D366]/5 hover:from-[#25D366] hover:to-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/35 hover:border-transparent font-extrabold uppercase text-[10px] tracking-[0.2em] rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer font-mono"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.854L.044 23.956l6.242-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.516-5.228-1.415l-.374-.224-3.875.917.977-3.78-.244-.386A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                            </svg>
                            Continuar por WhatsApp
                          </span>
                        </motion.button>

                        {/* Botón Azul: Telegram */}
                        <motion.button
                          onClick={() => handleChannelCheckout('telegram')}
                          whileHover={{ scale: 1.02, y: -2, boxShadow: '0 0 30px rgba(42, 171, 238, 0.25)' }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full relative inline-flex items-center justify-center py-4 bg-gradient-to-r from-[#2AABEE]/20 to-[#2AABEE]/5 hover:from-[#2AABEE] hover:to-[#2AABEE] text-[#2AABEE] hover:text-black border border-[#2AABEE]/35 hover:border-transparent font-extrabold uppercase text-[10px] tracking-[0.2em] rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer font-mono"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                            Continuar por Telegram
                          </span>
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 6: ÉXITO & INSTRUCCIONES DE PAGO */}
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
                        boxShadow: `0 0 40px rgba(0, 255, 133, 0.25)`, 
                        borderColor: `rgba(0, 255, 133, 0.4)` 
                      }} 
                      className="w-16 h-16 rounded-2xl bg-[#00FF85]/10 border flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-[#00FF85]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-xl font-black text-white uppercase tracking-wider">¡Reserva Confirmada!</h2>
                    <p className="text-white/60 text-xs max-w-sm mx-auto leading-relaxed">
                      Tu configuración con ID <strong className="text-[#00F0FF]">{orderId}</strong> se ha guardado en nuestro sistema con éxito.
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-left space-y-3">
                    <div className="text-[10px] font-mono text-[#00FF85] font-bold tracking-widest uppercase">Instrucciones de activación:</div>
                    <p className="text-[11px] text-white/75 leading-relaxed">
                      1. Hemos abierto tu chat de WhatsApp o Telegram para formalizar la entrega.
                    </p>
                    <p className="text-[11px] text-white/75 leading-relaxed">
                      2. Realiza el pago único de <strong>50€</strong> mediante el método acordado en el chat.
                    </p>
                    <p className="text-[11px] text-white/75 leading-relaxed">
                      3. Facilita tu ID de orden <strong className="text-[#00F0FF]">{orderId}</strong> en el concepto y tu cuenta se activará inmediatamente.
                    </p>
                  </div>

                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl text-[10px] text-white/40 leading-relaxed">
                    📧 Hemos enviado una copia del estado de tu solicitud de activación al correo: <strong className="text-white/75">{preferences.email}</strong>
                  </div>

                  <motion.button
                    onClick={() => {
                      onClose();
                      // Reiniciar el wizard al estado inicial tras cerrar
                      setTimeout(() => {
                        setStep(0);
                        setPreferences({
                          language: '',
                          audio: '',
                          audioCustom: '',
                          subtitles: '',
                          subtitlesCustom: '',
                          anime: null,
                          email: '',
                        });
                        setOrderId('');
                      }, 400);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#00F0FF] hover:bg-[#00D0FF] text-black font-extrabold py-3.5 rounded-xl transition-all cursor-pointer font-mono text-xs uppercase tracking-widest shadow-xl"
                  >
                    Entendido y Volver
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
