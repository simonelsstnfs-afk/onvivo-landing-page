export interface LanguageConfig {
  name: string; // Nombre en español para mostrar y validar (ej. "Alemán")
  aliases: string[]; // Variaciones comunes para la validación (ej. ["aleman", "deutsch", "german", "de"])
  iso3: string; // Código ISO 639-2 de 3 letras para Stremio Interface lang (ej. "deu")
  torrentio: string; // Parámetro de idioma de Torrentio (ej. "german")
  subsense: string; // Código ISO 639-1 de 2 letras para Subsense (ej. "de")
  opensubtitles: string; // Nombre del idioma en inglés para OpenSubtitles Pro (ej. "german")
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { name: 'Español', aliases: ['espanol', 'spanish', 'es', 'castellano', 'latino', 'spa'], iso3: 'spa', torrentio: 'latino,spanish', subsense: 'es', opensubtitles: 'spanish' },
  { name: 'Inglés', aliases: ['ingles', 'english', 'en', 'eng'], iso3: 'eng', torrentio: 'english', subsense: 'en', opensubtitles: 'english' },
  { name: 'Francés', aliases: ['frances', 'french', 'fr', 'fra', 'fre'], iso3: 'fra', torrentio: 'french', subsense: 'fr', opensubtitles: 'french' },
  { name: 'Italiano', aliases: ['italiano', 'italian', 'it', 'ita'], iso3: 'ita', torrentio: 'italian', subsense: 'it', opensubtitles: 'italian' },
  { name: 'Alemán', aliases: ['aleman', 'german', 'de', 'deu', 'deutsch'], iso3: 'deu', torrentio: 'german', subsense: 'de', opensubtitles: 'german' },
  { name: 'Portugués', aliases: ['portugues', 'portuguese', 'pt', 'por', 'brazilian', 'portugues-br'], iso3: 'por', torrentio: 'portuguese', subsense: 'pt', opensubtitles: 'portuguese' },
  { name: 'Ruso', aliases: ['ruso', 'russian', 'ru', 'rus'], iso3: 'rus', torrentio: 'russian', subsense: 'ru', opensubtitles: 'russian' },
  { name: 'Japonés', aliases: ['japones', 'japanese', 'ja', 'jpn', 'jp'], iso3: 'jpn', torrentio: 'japanese', subsense: 'ja', opensubtitles: 'japanese' },
  { name: 'Chino', aliases: ['chino', 'chinese', 'zh', 'zho', 'cn'], iso3: 'zho', torrentio: 'chinese', subsense: 'zh', opensubtitles: 'chinese' },
  { name: 'Polaco', aliases: ['polaco', 'polish', 'pl', 'pol'], iso3: 'pol', torrentio: 'polish', subsense: 'pl', opensubtitles: 'polish' },
  { name: 'Holandés', aliases: ['holandes', 'dutch', 'nl', 'nld', 'netherlands'], iso3: 'nld', torrentio: 'dutch', subsense: 'nl', opensubtitles: 'dutch' },
  { name: 'Turco', aliases: ['turco', 'turkish', 'tr', 'tur'], iso3: 'tur', torrentio: 'turkish', subsense: 'tr', opensubtitles: 'turkish' },
  { name: 'Árabe', aliases: ['arabe', 'arabic', 'ar', 'ara'], iso3: 'ara', torrentio: 'arabic', subsense: 'ar', opensubtitles: 'arabic' },
  { name: 'Griego', aliases: ['griego', 'greek', 'el', 'ell', 'gr'], iso3: 'ell', torrentio: 'greek', subsense: 'el', opensubtitles: 'greek' },
  { name: 'Sueco', aliases: ['sueco', 'swedish', 'sv', 'swe'], iso3: 'swe', torrentio: 'swedish', subsense: 'sv', opensubtitles: 'swedish' }
];

export function findLanguage(input: string): LanguageConfig | null {
  if (!input) return null;
  const normalized = input.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalized) {
      return lang;
    }
    for (const alias of lang.aliases) {
      if (alias.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalized) {
        return lang;
      }
    }
  }
  return null;
}
