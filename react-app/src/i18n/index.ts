import { pl, Translations } from './pl'

export type { Translations }
export type Language = 'pl' | 'en'

const translations: Record<Language, Translations> = {
  pl,
  en: pl, // fallback to Polish until English translations are added
}

let currentLanguage: Language = 'pl'

export function setLanguage(lang: Language): void {
  currentLanguage = lang
}

export function getLanguage(): Language {
  return currentLanguage
}

export function t(): Translations {
  return translations[currentLanguage]
}

export { pl }
