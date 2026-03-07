// Shared helpers to fetch application data and extract catalogue ID

export async function fetchApplicationData(baseUrl: string | undefined, id: string, email: string): Promise<any> {
  if (!baseUrl) throw new Error('Konfiguracja: VITE_API_URL nie jest ustawione.')

  const params = new URLSearchParams({ id, email })
  const baseUrlStr = baseUrl.replace(/\/+$/,'') + '/application'
  let url: string
  try {
    const u = new URL(baseUrlStr, window.location.href)
    params.forEach((value, key) => u.searchParams.set(key, value))
    url = u.toString()
  } catch (e) {
    url = `${baseUrlStr}${baseUrlStr.includes('?') ? '&' : '?'}${params.toString()}`
  }

  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  const raw = await res.text()
  if (!res.ok) {
    let extra = ''
    try {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        if ((parsed as any).message) extra = `: ${(parsed as any).message}`
        else extra = `: ${JSON.stringify(parsed)}`
      }
    } catch (_e) {
      if (raw) extra = `: ${raw}`
    }
    throw new Error(`HTTP ${res.status} ${res.statusText}${extra}`)
  }

  let data: any
  try {
    data = raw ? JSON.parse(raw) : null
  } catch (e) {
    throw new Error('Nie można sparsować odpowiedzi serwera (niepoprawny JSON).')
  }
  return data
}

export function extractCatalogId(obj: any): string | null {
  if (!obj || typeof obj !== 'object') return null
  // direct key matches
  const directKeys = Object.keys(obj)
  for (const k of directKeys) {
    const lk = k.toLowerCase()
    if (lk.includes('katalog') && lk.includes('id')) {
      const v = obj[k]
      if (typeof v === 'string' || typeof v === 'number') return String(v)
    }
  }

  // nested object with id
  for (const k of directKeys) {
    const v = obj[k]
    if (v && typeof v === 'object') {
      for (const nk of Object.keys(v)) {
        if (nk.toLowerCase().includes('id')) {
          const nv = v[nk]
          if (typeof nv === 'string' || typeof nv === 'number') return String(nv)
        }
      }
    }
  }

  // recursive search for keys containing 'katalog' or 'catalog'
  function recurse(o: any): string | null {
    if (!o || typeof o !== 'object') return null
    for (const key in o) {
      const lower = key.toLowerCase()
      if (lower.includes('katalog') || lower.includes('catalog')) {
        const val = o[key]
        if (typeof val === 'string' || typeof val === 'number') return String(val)
        if (val && typeof val === 'object') {
          for (const nk in val) {
            if (nk.toLowerCase().includes('id')) {
              const nv = val[nk]
              if (typeof nv === 'string' || typeof nv === 'number') return String(nv)
            }
          }
        }
      }
    }
    for (const key in o) {
      const val = o[key]
      if (val && typeof val === 'object') {
        const found = recurse(val)
        if (found) return found
      }
    }
    return null
  }

  return recurse(obj)
}
