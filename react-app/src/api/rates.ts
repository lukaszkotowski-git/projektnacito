// Small rates loader for consultation rates stored in Directus
// - Fetches consultation_rates items from Directus and caches them in localStorage
// - Exposes a synchronous getter that returns a formatted rate string falling back to translations

export type ConsultationRate = {
  id?: number
  service_type?: string
  hourly_rate?: number
  fixed_fee?: number
  min_hours?: number
  notes?: string
}

const STORAGE_KEY = 'consultation_rates_cache'
const TTL = 60 * 60 * 1000 // 1 hour

type Cache = {
  timestamp: number
  items: ConsultationRate[]
}

function readCache(): Cache | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Cache
    if (!parsed || typeof parsed.timestamp !== 'number' || !Array.isArray(parsed.items)) return null
    if (Date.now() - parsed.timestamp > TTL) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(items: ConsultationRate[]) {
  try {
    const payload: Cache = { timestamp: Date.now(), items }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore quota errors
  }
}

export function getCachedConsultationRate(): ConsultationRate | null {
  const cache = readCache()
  if (!cache || cache.items.length === 0) return null
  return cache.items[0]
}

export function getConsultationRateString(fallback = 'Koszt: 250 zł / h'): string {
  const item = getCachedConsultationRate()
  if (!item) return fallback
  if (typeof item.hourly_rate === 'number') return `Koszt: ${item.hourly_rate} zł / h`
  if (typeof item.fixed_fee === 'number') return `Koszt: ${item.fixed_fee} zł`
  return fallback
}

export async function fetchAndCacheConsultationRates(): Promise<void> {
  try {
    const base = (import.meta.env as any).VITE_DIRECTUS_URL as string
    if (!base) return
    const url = `${base.replace(/\/$/, '')}/items/consultation_rates?limit=100`
    const res = await fetch(url)
    if (!res.ok) return
    const body = await res.json()
    const items = Array.isArray(body?.data) ? (body.data as ConsultationRate[]) : []
    writeCache(items)
  } catch {
    // swallow errors; fallback will be used
  }
}

export function loadRatesInBackground(): void {
  // fire-and-forget
  void fetchAndCacheConsultationRates()
}
