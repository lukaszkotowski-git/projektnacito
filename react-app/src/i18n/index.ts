import { pl, Translations } from './pl'
import { getConsultationRateString, getConsultationRateAmountString, fetchAndCacheConsultationRates } from '../api/rates'

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
  const tr = translations[currentLanguage]

  try {
    // Ensure consult.rate placeholder is replaced at render time so UI never
    // displays the raw template. This keeps t() synchronous while handling
    // the known dynamic key without introducing providers/hooks.
    if (tr && (tr as any).consult && typeof (tr as any).consult.rate === 'string') {
      const r = (tr as any).consult.rate as string
      if (r.includes('{{consultationRate}}')) {
        try {
          const amount = getConsultationRateAmountString(r)
          ;(tr as any).consult.rate = r.replace('{{consultationRate}}', amount)
        } catch {
          // ignore
        }
      }
    }
  } catch {
    // ignore
  }

  return tr
}

export { pl }

// Initialize consultation rate from cache synchronously so components get a correct value on first render.
// Then fetch fresh rates in background and update the in-memory translation object for subsequent calls.
function substituteString(template: string): string {
  if (!template || typeof template !== 'string') return template

  // If template contains explicit placeholder - replace only that fragment.
  if (template.includes('{{consultationRate}}')) {
    try {
      const amount = getConsultationRateAmountString(template)
      return template.replace('{{consultationRate}}', amount)
    } catch {
      return template
    }
  }

  // If string looks like a rate (starts with "Koszt:"), keep previous behaviour
  // and allow replacing whole value with the cached/formatted rate string.
  if (template.trim().startsWith('Koszt:')) {
    return getConsultationRateString(template)
  }

  return template
}

function substituteInObject(obj: any): any {
  if (typeof obj === 'string') return substituteString(obj)
  if (Array.isArray(obj)) return obj.map(substituteInObject)
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      try {
        obj[k] = substituteInObject(obj[k])
      } catch {
        // ignore individual failures
      }
    }
    return obj
  }
  return obj
}

try {
  // Apply substitution across the Polish translations object so any placeholder
  // coming from local fallback or (if present) from remote translations is
  // replaced synchronously at module init.
  substituteInObject(pl)
} catch {
  // ignore
}

// Start background refresh; when it completes we'll update the in-memory value for next renders
void fetchAndCacheConsultationRates().then(() => {
  try {
    substituteInObject(pl)
  } catch {
    // ignore
  }
})
