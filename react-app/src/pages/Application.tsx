import { useState } from 'react'

export default function Application() {
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleFetch = async () => {
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const params = new URLSearchParams({ id, email })
      const url = `https://n8n.projektnacito.com.pl/webhook-test/application?${params.toString()}`
      const res = await fetch(url, { headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-serif text-[#8C7E6A] mb-4">Aplikacja — wyszukaj dane</h1>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-700">Adres e-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded border border-gray-200 p-2"
            placeholder="adres@domena.pl"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">ID wniosku</span>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mt-1 block w-full rounded border border-gray-200 p-2"
            placeholder="np. C32XGG2C6"
          />
        </label>

        <div>
          <button
            onClick={handleFetch}
            disabled={loading || !id || !email}
            className="px-4 py-2 bg-[#8C7E6A] text-white rounded disabled:opacity-50"
          >
            {loading ? 'Ładowanie...' : 'Pobierz dane'}
          </button>
        </div>

        {error && <div className="text-red-600">Błąd: {error}</div>}

        {result && (
          <div className="mt-4 bg-white p-4 border rounded">
            <h2 className="font-medium mb-2">Wynik</h2>
            <pre className="text-sm overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
