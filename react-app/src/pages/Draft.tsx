import React, { useState } from 'react'
import { fetchApplicationData, extractCatalogId } from '../lib/application'
import { FileUpload } from '../components/ui'

export default function Draft() {
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Reuse application fetching logic to obtain catalogueID. Require VITE_API_URL to be set.
  async function fetchCatalogueId(): Promise<string> {
    const baseUrl = import.meta.env.VITE_API_URL
    if (!baseUrl) {
      throw new Error('Konfiguracja: VITE_API_URL nie jest ustawione.')
    }

    const data = await fetchApplicationData(baseUrl, id, email)
    const catalogId = extractCatalogId(data)
    if (!catalogId) throw new Error('Nie znaleziono catalogueID w odpowiedzi serwera.')
    return catalogId
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!id || !id.trim()) {
      setError('ID jest wymagane')
      return
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      setError('Podaj poprawny adres e-mail')
      return
    }
    if (!file) {
      setError('Załącznik jest wymagany')
      return
    }

    setLoading(true)
    try {
      const catalogueID = await fetchCatalogueId()
      if (!catalogueID) {
        setError('Nie udało się pobrać catalogueID')
        setLoading(false)
        return
      }

      const baseUrl = import.meta.env.VITE_API_URL
      if (!baseUrl) throw new Error('Konfiguracja: VITE_API_URL nie jest ustawione.')

      const form = new FormData()
      form.append('email', email)
      form.append('id', id)
      form.append('catalogueID', catalogueID)
      form.append('file', file)

      const sendUrl = baseUrl.replace(/\/+$/,'') + '/send-draft'

      const res = await fetch(sendUrl, {
        method: 'POST',
        body: form
      })
      const text = await res.text()
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
      setSuccess('Wysłano draft poprawnie')
    } catch (err: any) {
      setError(err?.message ?? String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-serif text-[#8C7E6A] mb-4">Wyślij draft</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-700">Adres e-mail</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded border border-gray-200 p-2" placeholder="adres@domena.pl" />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">ID wniosku</span>
          <input type="text" value={id} onChange={e => setId(e.target.value)} className="mt-1 block w-full rounded border border-gray-200 p-2" placeholder="np. C32XGG2C6" />
        </label>

        <FileUpload
          label="Dokument"
          file={file}
          onFileChange={(f: File | null) => setFile(f)}
          required
          accept="application/pdf,image/*"
        />

        <div>
          <button className="px-4 py-2 bg-[#8C7E6A] text-white rounded disabled:opacity-50" disabled={loading} type="submit">
            {loading ? 'Wysyłanie...' : 'Wyślij'}
          </button>
        </div>

        {error && <div className="text-red-600">Błąd: {error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </form>
    </div>
  )
}
