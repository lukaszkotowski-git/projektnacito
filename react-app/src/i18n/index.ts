import { pl, Translations } from './pl'
import { getConsultationRateString, fetchAndCacheConsultationRates } from '../api/rates'

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

// Initialize consultation rate from cache synchronously so components get a correct value on first render.
// Then fetch fresh rates in background and update the in-memory translation object for subsequent calls.
try {
  pl.consult.rate = getConsultationRateString(pl.consult.rate)
} catch {
  // ignore
}

// Start background refresh; when it completes we'll update the in-memory value for next renders
void fetchAndCacheConsultationRates().then(() => {
  try {
    pl.consult.rate = getConsultationRateString(pl.consult.rate)
  } catch {
    // ignore
  }
})
