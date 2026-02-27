import { pl, Translations } from './pl'
import { buildTranslations, DirectusSection } from './buildTranslations'

export type { Translations }
export type Language = 'pl' | 'en'
export { pl }

const CACHE_KEY = 'translations_pl'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in ms

let currentLanguage: Language = 'pl'
let currentTranslations: Translations = pl

// On module load: check cache, then kick off background fetch
;(function init() {
  // 1. Try to load from valid cache
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      const cached = JSON.parse(raw) as { timestamp: number; sections: DirectusSection[] }
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        currentTranslations = buildTranslations(cached.sections)
      }
    }
  } catch {
    // corrupt cache — ignore, keep pl fallback
  }

  // 2. Always kick off background fetch to refresh
  fetchTranslations()
})()

function fetchTranslations(): void {
  const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/translations?filter[language][_eq]=${currentLanguage}&limit=100`
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<{ data: DirectusSection[] }>
    })
    .then(json => {
      const sections = json.data
      currentTranslations = buildTranslations(sections)
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), sections }))
      } catch {
        // quota exceeded — ignore
      }
    })
    .catch(() => {
      // Network error or bad response — silently keep current translations
    })
}

export function setLanguage(lang: Language): void {
  currentLanguage = lang
}

export function getLanguage(): Language {
  return currentLanguage
}

export function t(): Translations {
  return currentTranslations
}
