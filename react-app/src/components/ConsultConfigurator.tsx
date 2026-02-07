import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { API_URL } from '../constants'
import { useNotification } from './notifications'
import { t } from '../i18n'

export function ConsultConfigurator() {
  const navigate = useNavigate()
  const txt = t()
  const { setCurrentView, setLastSubmissionId, setCurrentPackage } = useAppContext()
  const { addToast: notify } = useNotification()
  
  const generateSubmissionId = (prefix: string): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let random = ''
    for (let i = 0; i < 8; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `${prefix}${random}`
  }

  const [submissionId] = useState(() => generateSubmissionId('K'))
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [suggestedDate, setSuggestedDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // For consult package email is optional — include if provided
    const data = {
      submissionId,
      packageType: 'consult',
      userName: name,
      userPhone: phone,
      userEmail: email || undefined,
      notes: notes || undefined,
      suggestedDate: suggestedDate || undefined,
      preferredTime: preferredTime || undefined,
      rate: "250 zł / h"
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      })
      const result = await response.json()

      if (response.ok && result.success) {
        setLastSubmissionId(submissionId)
        // mark the current package so the success page can tailor its message
        setCurrentPackage('consult')
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

  const goToMain = () => navigate('/')

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={goToMain} className="text-[10px] uppercase tracking-widest font-bold flex items-center mb-8 hover:text-[#8C7E6A] transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> {txt.common.backToSelection}
        </button>
        <div className="bg-white p-10 rounded-[2.5rem] border border-[#E5DED4] text-center max-w-2xl mx-auto relative">
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 rounded-[2.5rem] z-10 flex flex-col items-center justify-center backdrop-blur-sm">
              <svg className="animate-spin h-10 w-10 text-[#8C7E6A] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-[#8C7E6A] font-medium tracking-widest text-xs uppercase">{txt.common.sending}</span>
            </div>
          )}
          <h2 className="text-4xl font-serif mb-4">{txt.consult.title}</h2>
          <div className="inline-block bg-[#F2EBE1] text-[#8C7E6A] px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs mb-6">{txt.consult.rate}</div>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">{txt.consult.subtitle}</p>
          <form onSubmit={handleSubmit} className="text-left space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">{txt.consult.nameLabel}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder={txt.consult.namePlaceholder}
                className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">{txt.consult.phoneLabel}</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
                placeholder={txt.consult.phonePlaceholder}
                className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">{txt.consult.emailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={txt.consult.emailPlaceholder}
                className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">{txt.consult.notesLabel}</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={txt.consult.notesPlaceholder}
                className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A] h-28 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">{txt.consult.suggestedDateLabel}</label>
                <input
                  type="date"
                  value={suggestedDate}
                  onChange={(e) => setSuggestedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  placeholder={txt.consult.suggestedDatePlaceholder}
                  className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">{txt.consult.preferredTimeLabel}</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full border border-[#E5DED4] rounded-2xl px-6 py-4 outline-none focus:border-[#8C7E6A] bg-white appearance-none -webkit-appearance-none -moz-appearance:none pr-10" 
                  style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 24 24'><path fill='%238C7E6A' d='M7 10l5 5 5-5z'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '12px 8px' }}
                >
                  <option value="">{txt.consult.preferredTimePlaceholder}</option>
                  <option value="morning">Rano</option>
                  <option value="daytime">W ciągu dnia</option>
                  <option value="evening">Wieczorem</option>
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-5 rounded-full font-bold uppercase tracking-widest text-xs mt-4"
            >
              {isSubmitting ? txt.common.sending : txt.consult.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
