import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { PRICING } from '../constants'

export function PremiumConfigurator() {
  const navigate = useNavigate()
  const {
    resetState,
    premiumTotalM2, setPremiumTotalM2,
    premiumKitchenM2, setPremiumKitchenM2,
    premiumBathM2, setPremiumBathM2,
    currentPrice, setCurrentPrice,
    setCurrentPackage
  } = useAppContext()

  // track raw input strings so we can distinguish "user didn't type anything" from numeric 0
  const [premiumTotalM2Raw, setPremiumTotalM2Raw] = useState('')
  const [premiumKitchenM2Raw, setPremiumKitchenM2Raw] = useState('')
  const [premiumBathM2Raw, setPremiumBathM2Raw] = useState('')

  useEffect(() => {
    const allFilled = premiumTotalM2Raw.trim() !== '' && premiumKitchenM2Raw.trim() !== '' && premiumBathM2Raw.trim() !== ''
    if (!allFilled) {
      // don't calculate / show price until user filled all three fields
      setCurrentPrice(0)
      return
    }

    let total = premiumTotalM2 * PRICING.premium.basePerM2
    if (premiumKitchenM2 > 0) total += PRICING.premium.kitchenFlat
    if (premiumBathM2 > 0) total += PRICING.premium.bathFlat
    setCurrentPrice(total)
  }, [premiumTotalM2Raw, premiumKitchenM2Raw, premiumBathM2Raw, premiumTotalM2, premiumKitchenM2, premiumBathM2, setCurrentPrice])

  const goToMain = () => {
    resetState()
    navigate('/')
  }

  const goToFinalStep = () => {
    setCurrentPackage('premium')
    navigate('/final')
  }

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={goToMain} className="text-[10px] uppercase tracking-widest font-bold flex items-center mb-8 hover:text-[#8C7E6A] transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Wróć do wyboru
        </button>
        <header className="mb-12">
          <h2 className="text-4xl font-serif mb-2">Konfigurator Pakietu Premium</h2>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">Podaj metraże, aby obliczyć koszt projektu.</p>
        </header>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-choice p-8 rounded-[2rem]">
              <label className="text-[10px] uppercase tracking-widest text-[#8C7E6A] font-bold block mb-4">Powierzchnia całkowita (m²)</label>
              <input 
                type="number" 
                value={premiumTotalM2Raw}
                onChange={(e) => {
                  const v = e.target.value
                  setPremiumTotalM2Raw(v)
                  setPremiumTotalM2(parseFloat(v) || 0)
                }}
                placeholder="0" 
                className="w-full text-2xl bg-transparent border-b border-[#E5DED4] pb-2 outline-none focus:border-[#8C7E6A] font-light"
              />
            </div>
            <div className="card-choice p-8 rounded-[2rem]">
              <label className="text-[10px] uppercase tracking-widest text-[#8C7E6A] font-bold block mb-4">Powierzchnia kuchni (m²)</label>
              <input 
                type="number" 
                value={premiumKitchenM2Raw}
                onChange={(e) => {
                  const v = e.target.value
                  setPremiumKitchenM2Raw(v)
                  setPremiumKitchenM2(parseFloat(v) || 0)
                }}
                placeholder="0" 
                className="w-full text-2xl bg-transparent border-b border-[#E5DED4] pb-2 outline-none focus:border-[#8C7E6A] font-light"
              />
            </div>
            <div className="card-choice p-8 rounded-[2rem]">
              <label className="text-[10px] uppercase tracking-widest text-[#8C7E6A] font-bold block mb-4">Powierzchnia łazienek (m²)</label>
              <input 
                type="number" 
                value={premiumBathM2Raw}
                onChange={(e) => {
                  const v = e.target.value
                  setPremiumBathM2Raw(v)
                  setPremiumBathM2(parseFloat(v) || 0)
                }}
                placeholder="0" 
                className="w-full text-2xl bg-transparent border-b border-[#E5DED4] pb-2 outline-none focus:border-[#8C7E6A] font-light"
              />
            </div>
          </div>
          <div className="sticky bottom-6 bg-[#33302E] text-white p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Szacunkowy koszt Premium</span>
                {
                  (premiumTotalM2Raw.trim() !== '' && premiumKitchenM2Raw.trim() !== '' && premiumBathM2Raw.trim() !== '') ? (
                    <div className="text-3xl font-light"><span>{currentPrice.toLocaleString()}</span> zł <span className="text-sm text-gray-400">netto</span></div>
                  ) : (
                    <div className="text-3xl font-light">— zł <span className="text-sm text-gray-400">netto</span></div>
                  )
                }
              </div>
            <button 
              onClick={goToFinalStep} 
              disabled={premiumTotalM2 <= 0}
              className="btn-primary bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
            >
              Kontynuuj
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
