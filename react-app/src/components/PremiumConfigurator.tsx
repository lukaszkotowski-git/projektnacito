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
    setCurrentPrice,
    setCurrentPackage,
    setCurrentView
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

    // Compute net area excluding kitchen and bathrooms, then apply base rate.
    const netArea = Math.max(0, premiumTotalM2 - premiumKitchenM2 - premiumBathM2)
    let total = netArea * PRICING.premium.basePerM2
    // Kitchens and bathrooms are charged as fixed flats if present
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
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">Wprowadź metraże — otrzymasz szczegółową wycenę na podany adres e-mail.</p>
          <div className="mt-4 flex justify-end md:mt-0 md:fixed md:right-6 md:top-32 lg:right-8 lg:top-40 xl:right-12 xl:top-48 z-50 group">
            <button
              onClick={() => { setCurrentView('faq'); navigate('/faq#faq') }}
              className="inline-flex items-center gap-3 bg-[#8C7E6A] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#7A6C58] transition-shadow shadow-md"
              aria-label="Masz pytanie? Przejdź do FAQ"
              aria-describedby="faq-cta-desc-premium"
            >
              <span className="text-sm font-semibold text-white animate-pulse">Masz pytanie?</span>
            </button>
            <div
              id="faq-cta-desc-premium"
              role="tooltip"
              className="absolute right-0 top-full mt-2 w-48 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
              Przejdź do najczęściej zadawanych pytań (FAQ).
            </div>
          </div>
        </header>
        <div className="space-y-8">
            <div className="md:flex md:items-start md:gap-8">
            <div className="flex-1">
              {/* Show aside content above inputs on all screen sizes when requested */}
              <div className="mb-6">
                <div className="p-6 rounded-2xl bg-white border border-[#E5DED4] shadow-sm">
                  <h3 className="text-lg font-semibold text-[#8C7E6A] mb-2">Pakiet Premium — w pigułce</h3>
                  <p className="mb-4 text-gray-700">Chcesz cieszyć się realizacją projektu Twojego wymarzonego wnętrza pod czujnym okiem inżyniera budowy i architekta wnętrz? Projekt rozszerzony jest dla Ciebie!<br/>W jego skład wchodzi:</p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-sm mb-2">
                    <li><b>Inwentaryzacja</b><br/>Pomiary całej projektowanej części.</li>
                    <li><b>Układ funkcjonalny</b><br/>Rzut z propozycją układu elementów we wnętrzu.</li>
                    <li><b>Aranżacja</b><br/>Model 3D prezentujący proponowane rozwiązania estetyczne.</li>
                    <li><b>Zestawienie materiałów i sprzętów</b><br/>Lista konkretnych materiałów z ich cenami i linkami do sklepów.</li>
                    <li><b>Wizualizacje</b><br/>Fotorealistyczne przedstawienie wnętrza.</li>
                    <li><b>Projekt meblowy</b><br/>Kompletny projekt zabudowy meblowej.</li>
                    <li><b>Projekt wykonawczy</b><br/>Rzuty podłóg i sufitów, rzuty instalacji wod-kan, rzuty instalacji elektrycznej, wentylacji, CO oraz rysunki detali.</li>
                    <li><b>Oferty od wykonawców</b><br/>Oferta od np. stolarza, budowlańca, instalatora na zastosowane w projekcie rozwiązania.</li>
                    <li><b>Nadzór autorski</b><br/>Pilnowanie przebiegu prac projektowych i ich zgodności z projektem, kontrolowanie zamówień, oglądanie i wybieranie elementów wyposażenia.</li>
                  </ol>

                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            </div>

            {/* Right aside removed — single shared panel is shown above inputs */}
          </div>

          {/* Non-sticky continue button only (hide the black sticky panel) */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={goToFinalStep}
              disabled={premiumTotalM2 <= 0}
              className="w-full md:w-auto btn-primary bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
            >
              Kontynuuj
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
