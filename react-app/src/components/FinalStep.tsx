import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { API_URL } from '../constants'
import { useNotification } from './notifications'

export function FinalStep() {
  const navigate = useNavigate()
  const {
    setCurrentView, setLastSubmissionId,
    currentPackage, currentPrice,
    getCitoDetails, getPremiumDetails
  } = useAppContext()
  const { addToast: notify } = useNotification()

  const generateSubmissionId = (prefix: string): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let random = ''
    for (let i = 0; i < 8; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `${prefix}${random}`
  }

  const [submissionId] = useState(() => {
    const prefix = currentPackage === 'cito' ? 'C' : 'P'
    return generateSubmissionId(prefix)
  })

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goBack = () => {
    navigate(currentPackage === 'cito' ? '/offer/cito' : '/offer/premium')
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
      packageType: currentPackage,
      userName: name,
      userPhone: phone,
      userEmail: email,
      estimatedPrice: currentPrice,
      details: currentPackage === 'cito' ? getCitoDetails() : getPremiumDetails()
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
        setLastSubmissionId(submissionId)
        setCurrentView('success')
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

  const packageName = currentPackage === 'cito' ? 'Pakiet na Cito' : 'Pakiet Premium'

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={goBack} className="text-[10px] uppercase tracking-widest font-bold flex items-center mb-8 hover:text-[#8C7E6A] transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Wróć do konfiguracji
        </button>
        <div className="bg-white p-10 rounded-[2.5rem] border border-[#E5DED4] text-center max-w-2xl mx-auto relative">
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 rounded-[2.5rem] z-10 flex flex-col items-center justify-center backdrop-blur-sm">
              <svg className="animate-spin h-10 w-10 text-[#8C7E6A] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-[#8C7E6A] font-medium tracking-widest text-xs uppercase">Wysyłanie...</span>
            </div>
          )}
          <h3 className="text-3xl font-serif mb-6">Prawie gotowe!</h3>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">Zostaw dane dla pakietu <span className="font-bold">{packageName}</span>.</p>
          <form onSubmit={handleSubmit} className="text-left space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Imię i nazwisko</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="np. Jan Kowalski" 
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
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Załącz rzut / rysunek (JPG, PNG, PDF)</label>
              <div className="border-2 border-dashed border-[#E5DED4] rounded-2xl p-8 text-center hover:bg-[#FDFBF7] transition-colors relative">
                <input 
                  type="file" 
                  required
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/></svg>
                <span className="text-xs text-gray-400">{file?.name || "Rzut lub rysunek z obmiarem projektowanej przestrzeni."}</span>
              </div>
            </div>
            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E5DED4] mb-4">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Wyliczona kwota</span>
              <div className="text-xl font-semibold">{currentPrice.toLocaleString()} zł netto</div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-5 rounded-full font-bold uppercase tracking-widest text-xs mt-4"
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
