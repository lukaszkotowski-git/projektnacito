import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ApplicationDetails from './ApplicationDetails'

export default function Application() {
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [autoMode, setAutoMode] = useState(false)
  const location = useLocation()
  const autoFetchedRef = useRef(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [touchedEmail, setTouchedEmail] = useState(false)
  const [touchedId, setTouchedId] = useState(false)

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [files, setFiles] = useState<Record<string, unknown>[] | null>(null)
  const [filesLoading, setFilesLoading] = useState(false)
  const [filesError, setFilesError] = useState<string | null>(null)
  const filesFetchedRef = useRef(false)
  const [catalogId, setCatalogId] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)
  const [uploading, setUploading] = useState(false)
  type UploadStatus = { name: string; status: 'pending' | 'uploading' | 'done' | 'error'; message?: string }
  const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([])

  const handleFetch = async (overrideId?: string, overrideEmail?: string) => {
    setError(null)
    setResult(null)

    const idToUse = overrideId ?? id
    const emailToUse = overrideEmail ?? email

    // Basic client-side validation before starting fetch
    if (!idToUse || !idToUse.trim()) {
      setError('ID wniosku jest wymagane.')
      return
    }
    if (!emailToUse || !EMAIL_REGEX.test(emailToUse)) {
      setError('Podaj poprawny adres e-mail.')
      return
    }

    const baseUrl = import.meta.env.VITE_API_URL
    if (!baseUrl) {
      setError('Konfiguracja: VITE_API_URL nie jest ustawione.')
      return
    }

    setLoading(true)
    try {
      const params = new URLSearchParams({ id: idToUse, email: emailToUse })
      const baseUrlStr = baseUrl.replace(/\/+$/,'') + '/application'

      // Build final URL robustly (handle absolute and relative base URLs)
      let url: string
      try {
        const u = new URL(baseUrlStr, window.location.href)
        // merge query params (overwriting any existing ones)
        params.forEach((value, key) => u.searchParams.set(key, value))
        url = u.toString()
      } catch (e) {
        // If URL parsing fails, fallback to simple concatenation
        url = `${baseUrlStr}${baseUrlStr.includes('?') ? '&' : '?'}${params.toString()}`
      }

      const res = await fetch(url, { headers: { Accept: 'application/json' } })

      // Read response body as text so we can produce better error messages when JSON is invalid
      const raw = await res.text()
      if (!res.ok) {
        // try to extract message from JSON if present
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

      setResult(data)
      // After successfully obtaining application data, try to extract catalog ID and fetch files
      try {
      const catalogId = extractCatalogId(data)
        if (catalogId) {
          setCatalogId(catalogId)
          // reset files state before fetching
          setFiles(null)
          setFilesError(null)
          filesFetchedRef.current = false
          void handleFetchFiles(catalogId)
        }
      } catch (e) {
        // non-fatal: if extraction fails, we just don't fetch files
        // keep errors scoped to filesError when file fetch is attempted
      }
    } catch (err: any) {
      // Map common errors to friendlier messages
      const msg = err?.message ?? String(err)
      if (/Failed to fetch|NetworkError|network/i.test(msg)) {
        setError('Błąd sieciowy: nie można połączyć się z serwerem. Sprawdź połączenie lub CORS.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  function extractCatalogId(obj: any): string | null {
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

  function normalizeFilesResponse(data: any): Record<string, unknown>[] | null {
    if (!data) return null
    if (Array.isArray(data)) return data as Record<string, unknown>[]
    if (data.files && Array.isArray(data.files)) return data.files as Record<string, unknown>[]
    if (data.data && Array.isArray(data.data)) return data.data as Record<string, unknown>[]
    // find first array value
    if (typeof data === 'object') {
      const obj = data as Record<string, unknown>
      for (const k of Object.keys(obj)) {
        const v = obj[k]
        if (Array.isArray(v)) return v as Record<string, unknown>[]
      }
      // if object values are arrays of objects, return them
      const values = Object.values(obj)
      if (values.length && values.every(v => v && typeof v === 'object')) {
        return values as Record<string, unknown>[]
      }
    }
    return null
  }

  async function handleFetchFiles(catalogId: string) {
    if (!catalogId) return
    setFilesError(null)
    setFiles(null)
    setFilesLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_API_URL
      if (!baseUrl) throw new Error('Konfiguracja: VITE_API_URL nie jest ustawione (files).')
      const params = new URLSearchParams({ id: catalogId })
      const baseUrlStr = baseUrl.replace(/\/+$/,'') + '/files'
      let url: string
      try {
        const u = new URL(baseUrlStr, window.location.href)
        params.forEach((v,k) => u.searchParams.set(k,v))
        url = u.toString()
      } catch (e) {
        url = `${baseUrlStr}${baseUrlStr.includes('?') ? '&' : '?'}${params.toString()}`
      }

      const res = await fetch(url, { headers: { Accept: 'application/json' } })
      const raw = await res.text()
      if (!res.ok) {
        let extra = ''
        try { const parsed = JSON.parse(raw); extra = JSON.stringify(parsed) } catch (_e) { extra = raw }
        throw new Error(`HTTP ${res.status} ${res.statusText}: ${extra}`)
      }
      let data: any
      try { data = raw ? JSON.parse(raw) : null } catch (e) { throw new Error('Nie można sparsować listy plików (niepoprawny JSON).') }

      const arr = normalizeFilesResponse(data)
      if (arr) setFiles(arr)
      else setFiles([])
    } catch (err: any) {
      const msg = err?.message ?? String(err)
      if (/Failed to fetch|NetworkError|network/i.test(msg)) {
        setFilesError('Błąd sieciowy: nie można pobrać listy plików. Sprawdź CORS/połączenie.')
      } else {
        setFilesError(msg)
      }
    } finally {
      setFilesLoading(false)
    }
  }

  async function handleUploadFiles() {
    if (!catalogId) {
      setFilesError('Brak ID katalogu. Nie można przesłać plików.')
      return
    }
    if (!selectedFiles || selectedFiles.length === 0) {
      setFilesError('Wybierz pliki do przesłania.')
      return
    }

    setUploading(true)
    setUploadStatuses(selectedFiles.map(f => ({ name: f.name, status: 'pending' })))
    try {
      const baseUrl = import.meta.env.VITE_API_URL
      if (!baseUrl) throw new Error('Konfiguracja: VITE_API_URL nie jest ustawione (upload).')
      const uploadUrl = baseUrl.replace(/\/+$/,'') + '/upload-file'

      const statuses = [...uploadStatuses]
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        // optimistic update
        statuses[i] = { name: file.name, status: 'uploading' }
        setUploadStatuses([...statuses])

        const form = new FormData()
        form.append('file', file)
        form.append('catalogId', catalogId)

        const res = await fetch(uploadUrl, { method: 'POST', body: form })
        const text = await res.text()
        if (!res.ok) {
          statuses[i] = { name: file.name, status: 'error', message: `HTTP ${res.status}: ${text}` }
        } else {
          statuses[i] = { name: file.name, status: 'done' }
        }
        setUploadStatuses([...statuses])
      }

      // refresh file list after upload
      void handleFetchFiles(catalogId)
    } catch (err: any) {
      setFilesError(err?.message ?? String(err))
    } finally {
      setUploading(false)
    }
  }

  // If query params id & email are present, auto-trigger fetch and hide inputs/button
  useEffect(() => {
    const search = location.search || ''
    if (!search) return
    const params = new URLSearchParams(search)
    const qId = params.get('id')
    const qEmail = params.get('email')
    if (qId && qEmail && !autoFetchedRef.current) {
      setId(qId)
      setEmail(qEmail)
      setAutoMode(true)
      autoFetchedRef.current = true
      // trigger fetch with values from query (avoid relying on state update timing)
      void handleFetch(qId, qEmail)
    }
  }, [location.search])

  return (
    // add top padding so content is not hidden under the fixed navigation
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-serif text-[#8C7E6A] mb-4">Dane zgłoszenia</h1>

      <div className="space-y-4">
        {!autoMode ? (
          <>
            <label className="block">
              <span className="text-sm text-gray-700">Adres e-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouchedEmail(true)}
                className="mt-1 block w-full rounded border border-gray-200 p-2"
                placeholder="adres@domena.pl"
              />
              {touchedEmail && !email && (
                <p className="text-sm text-red-600 mt-1">Adres e-mail jest wymagany.</p>
              )}
              {touchedEmail && email && !EMAIL_REGEX.test(email) && (
                <p className="text-sm text-red-600 mt-1">Nieprawidłowy adres e-mail.</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">ID wniosku</span>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onBlur={() => setTouchedId(true)}
                className="mt-1 block w-full rounded border border-gray-200 p-2"
                placeholder="np. C32XGG2C6"
              />
              {touchedId && !id.trim() && (
                <p className="text-sm text-red-600 mt-1">ID wniosku jest wymagane.</p>
              )}
            </label>

            <div>
              <button
                onClick={() => {
                  setTouchedEmail(true)
                  setTouchedId(true)
                  const isValid = id.trim() && EMAIL_REGEX.test(email)
                  if (!isValid) return
                  void handleFetch()
                }}
                disabled={loading || !id.trim() || !EMAIL_REGEX.test(email)}
                className="px-4 py-2 bg-[#8C7E6A] text-white rounded disabled:opacity-50"
              >
                {loading ? 'Ładowanie...' : 'Pobierz dane'}
              </button>
            </div>
          </>
        ) : null}

        {/* Loader shown during any fetch (auto or manual) */}
        {loading && (
          <div className="flex items-center gap-3 text-gray-600">
            <svg className="animate-spin h-5 w-5 text-[#8C7E6A]" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-sm">Ładowanie...</span>
          </div>
        )}

        {error && <div className="text-red-600">Błąd: {error}</div>}

        {result && (
          <div className="mt-4 bg-white p-6 border rounded">
            {/* Render structured fields when possible */}
          <ApplicationDetails data={result} />
            {/* Files list (if any) */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Załączone pliki</h3>
              {filesLoading && (
                <div className="text-sm text-gray-600">Ładowanie listy plików...</div>
              )}
              {filesError && <div className="text-sm text-red-600">Błąd pobierania plików: {filesError}</div>}
              {files && files.length === 0 && (
                <div className="text-sm text-gray-600">Brak załączonych plików.</div>
              )}
              {files && files.length > 0 && (
                <ul className="list-none ml-0 space-y-2">
                  {files.map((f, idx) => {
                    const file = f as Record<string, unknown>
                    const name = (file as any).name ?? (file as any).filename ?? (file as any).title ?? `plik-${idx+1}`
                    // Check several common thumbnail field names (do not display the raw thumbnailLink text)
                    const thumb = (file as any).thumbnailLink ?? (file as any).thumbnail ?? (file as any).thumbnail_url ?? (file as any).thumbnailUrl ?? (file as any).thumbUrl ?? (file as any).previewUrl ?? (file as any).preview_link ?? null
                    return (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        {thumb ? (
                          <img src={String(thumb)} alt={String(name)} className="h-16 w-16 object-cover rounded" />
                        ) : null}
                        <span>{name}</span>
                      </li>
                    )
                  })}
                </ul>
              )}
              {/* Upload UI */}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Prześlij dodatkowe dokumenty</h4>
                <div className="border-2 border-dashed border-[#E5DED4] rounded-2xl p-6 text-center hover:bg-[#FDFBF7] transition-colors relative">
                  <input
                    type="file"
                    multiple
                    aria-label="Wybierz pliki"
                    onChange={(e) => setSelectedFiles(e.target.files ? Array.from(e.target.files) : null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-xs text-gray-400">
                    {selectedFiles && selectedFiles.length > 0 ? (
                      selectedFiles.length === 1 ? selectedFiles[0].name : `${selectedFiles.length} pliki wybrane`
                    ) : (
                      'Kliknij tutaj lub przeciągnij pliki'
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => void handleUploadFiles()}
                    disabled={uploading || !catalogId}
                    className="px-3 py-1 bg-[#8C7E6A] text-white rounded disabled:opacity-50"
                  >
                    {uploading ? 'Przesyłanie...' : 'Prześlij pliki'}
                  </button>
                </div>

                {uploadStatuses && uploadStatuses.length > 0 && (
                  <ul className="mt-2 text-sm">
                    {uploadStatuses.map((us, i) => (
                      <li key={i} className={`${us.status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>
                        {us.name}: {us.status}{us.message ? ` - ${us.message}` : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
