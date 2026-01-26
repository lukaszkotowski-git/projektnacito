import { useState, FormEvent } from 'react'
import { useAppContext } from '../context/AppContext'
import { API_URL } from '../constants'
import { useNotification } from './notifications'

export function ConsultConfigurator() {
  const { setCurrentView, resetState } = useAppContext()
  const { addToast: notify } = useNotification()
  
  const generateSubmissionId = (prefix: string): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let random = ''
    for (let i = 0; i < 8; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `${prefix}_${random}`
  }

  const [submissionId] = useState(() => generateSubmissionId('K'))
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goToMain = () => {
    resetState()
    setCurrentView('main')
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      notify("Nieprawidłowy adres e-mail", 'error')
      setIsSubmitting(false)
      return
    }

    const data = {
      submissionId,
      packageType: 'consult',
      userName: name,
      userPhone: phone,
      userEmail: email,
      rate: "200 zł / h"
    }

    let attachment = null
    if (file) {
      const base64 = await fileToBase64(file)
      attachment = {
        filename: file.name,
        mimeType: file.type,
        data: base64.split(',')[1]
      }
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, attachment })
      })
      const result = await response.json()

      if (response.ok && result.success) {
        notify("Sukces! Zgłoszenie zostało wysłane.", 'success')
        goToMain()
      } else {
        const errorMsg = result.message || result.error || 'Nieznany błąd'
        notify("Błąd: " + errorMsg, 'error')
      }
    } catch {
      notify("Nie udało się połączyć z serwerem. Spróbuj ponownie później.", 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={goToMain} className="text-[10px] uppercase tracking-widest font-bold flex items-center mb-8 hover:text-[#8C7E6A] transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Wróć do wyboru
        </button>
        <div className="bg-white p-10 rounded-[2.5rem] border border-[#E5DED4] text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif mb-4">Umów Konsultację</h2>
          <div className="inline-block bg-[#F2EBE1] text-[#8C7E6A] px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs mb-6">Koszt: 200 zł / h</div>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">Odezwiemy się, wszystko wyjaśnimy i wspólnie wybierzemy odpowiedni termin.</p>
          <form onSubmit={handleSubmit} className="text-left space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Imię i nazwisko</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="np. Anna Nowak" 
                className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Numer telefonu</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
                placeholder="+48 000 000 000" 
                className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Adres e-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="np. imie@domena.pl" 
                className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Załącz rzut / zdjęcia (opcjonalnie)</label>
              <div className="border-2 border-dashed border-[#E5DED4] rounded-2xl p-8 text-center hover:bg-[#FDFBF7] transition-colors relative">
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/></svg>
                <span className="text-xs text-gray-400">{file?.name || "Kliknij lub przeciągnij plik tutaj"}</span>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-5 rounded-full font-bold uppercase tracking-widest text-xs mt-4"
            >
              {isSubmitting ? "Wysyłanie..." : "Poproś o termin"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
