import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { PRICING } from '../constants'
import { t } from '../i18n'

export function PremiumConfigurator() {
  const navigate = useNavigate()
  const txt = t()
  const {
    resetState,
    premiumTotalM2, setPremiumTotalM2,
    setPremiumKitchenM2,
    setPremiumBathM2,
    setPremiumKitchenCount,
    setPremiumBathCount,
    setPremiumKitchenAreas,
    setPremiumBathAreas,
    setCurrentPrice,
    setCurrentPackage,
    setCurrentView
  } = useAppContext()

  // track raw input strings so we can distinguish "user didn't type anything" from numeric 0
  // raw string for total area and raw string arrays for per-unit inputs
  const [premiumTotalM2Raw, setPremiumTotalM2Raw] = useState<string>(String(premiumTotalM2 || ''))
  const [premiumKitchenAreasRaw, setPremiumKitchenAreasRaw] = useState<string[]>([''])
  const [premiumBathAreasRaw, setPremiumBathAreasRaw] = useState<string[]>([''])

  useEffect(() => {
    // Parse arrays into numbers (treat empty as 0)
    const kitchenNums = premiumKitchenAreasRaw.map(v => parseFloat(v) || 0)
    const bathNums = premiumBathAreasRaw.map(v => parseFloat(v) || 0)
    const sumKitchen = kitchenNums.reduce((s, x) => s + x, 0)
    const sumBath = bathNums.reduce((s, x) => s + x, 0)

    const k = kitchenNums.length
    const l = bathNums.length

    // keep legacy aggregated values in sync for backwards compatibility
    // keep legacy aggregated state in context for backward compatibility
    // update context aggregated helpers if present
    // call aggregated setters if available
    if (typeof setPremiumKitchenM2 === 'function') setPremiumKitchenM2(sumKitchen)
    if (typeof setPremiumBathM2 === 'function') setPremiumBathM2(sumBath)
    if (typeof setPremiumKitchenCount === 'function') setPremiumKitchenCount(k)
    if (typeof setPremiumBathCount === 'function') setPremiumBathCount(l)
    if (typeof setPremiumKitchenAreas === 'function') setPremiumKitchenAreas(kitchenNums)
    if (typeof setPremiumBathAreas === 'function') setPremiumBathAreas(bathNums)

    const netArea = Math.max(0, premiumTotalM2 - sumKitchen - sumBath)
    let total = netArea * PRICING.premium.basePerM2
    total += k * 2500
    total += l * 2500
    setCurrentPrice(total)
  }, [premiumKitchenAreasRaw, premiumBathAreasRaw, premiumTotalM2, setCurrentPrice])

  const goToMain = () => {
    resetState()
    navigate('/')
  }

  const goToFinalStep = () => {
    setCurrentPackage('premium')
    navigate('/final')
  }

  // helpers to manage dynamic per-unit inputs
  const addKitchen = () => {
    const next = [...premiumKitchenAreasRaw, '']
    setPremiumKitchenAreasRaw(next)
    setPremiumKitchenAreas(next.map(v => parseFloat(v) || 0))
  }
  const removeKitchen = (idx: number) => {
    if (premiumKitchenAreasRaw.length <= 1) return
    const next = premiumKitchenAreasRaw.filter((_, i) => i !== idx)
    setPremiumKitchenAreasRaw(next)
    setPremiumKitchenAreas(next.map(v => parseFloat(v) || 0))
  }

  const addBath = () => {
    const next = [...premiumBathAreasRaw, '']
    setPremiumBathAreasRaw(next)
    setPremiumBathAreas(next.map(v => parseFloat(v) || 0))
  }
  const removeBath = (idx: number) => {
    if (premiumBathAreasRaw.length <= 1) return
    const next = premiumBathAreasRaw.filter((_, i) => i !== idx)
    setPremiumBathAreasRaw(next)
    setPremiumBathAreas(next.map(v => parseFloat(v) || 0))
  }

  // Validation helpers used for input highlighting
  const kitchenNums = premiumKitchenAreasRaw.map(v => parseFloat(v) || 0)
  const bathNums = premiumBathAreasRaw.map(v => parseFloat(v) || 0)
  const hasKitchen = kitchenNums.some(x => x > 0)
  const hasBath = bathNums.some(x => x > 0)
  const totalProvided = premiumTotalM2Raw.trim() !== '' && premiumTotalM2 > 0

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={goToMain} className="text-[10px] uppercase tracking-widest font-bold flex items-center mb-8 hover:text-[#8C7E6A] transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> {txt.common.backToSelection}
        </button>
        <header className="mb-12">
          <h2 className="text-4xl font-serif mb-2">{txt.premium.title}</h2>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">{txt.premium.subtitle}</p>
          <div className="mt-4 flex justify-end md:mt-0 md:fixed md:right-6 md:top-32 lg:right-8 lg:top-40 xl:right-12 xl:top-48 z-50 group">
            <button
              onClick={() => { setCurrentView('faq'); navigate('/faq#faq') }}
              className="inline-flex items-center gap-3 bg-[#8C7E6A] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#7A6C58] transition-shadow shadow-md"
              aria-label={txt.common.haveQuestion}
              aria-describedby="faq-cta-desc-premium"
            >
              <span className="text-sm font-semibold text-white animate-pulse">{txt.common.haveQuestion}</span>
            </button>
            <div
              id="faq-cta-desc-premium"
              role="tooltip"
              className="absolute right-0 top-full mt-2 w-48 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
              {txt.common.faqTooltip}
            </div>
          </div>
        </header>
        <div className="space-y-8">
            <div className="md:flex md:items-start md:gap-8">
            <div className="flex-1">
              {/* Show aside content above inputs on all screen sizes when requested */}
              <div className="mb-6">
                <div className="p-6 rounded-2xl bg-white border border-[#E5DED4] shadow-sm">
                  <h3 className="text-lg font-semibold text-[#8C7E6A] mb-2">{txt.premium.summaryTitle}</h3>
                  <p className="mb-4 text-gray-700">{txt.premium.summaryIntro.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-sm mb-2">
                    {txt.premium.summaryItems.map((item, idx) => (
                      <li key={idx}><b>{item.title}</b><br/>{item.desc}</li>
                    ))}
                  </ol>

                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card-choice p-8 rounded-[2rem]">
                  <label className="text-[10px] uppercase tracking-widest text-[#8C7E6A] font-bold block mb-4">{txt.premium.totalAreaLabel}</label>
                  <input
                    type="number"
                    value={premiumTotalM2Raw}
                    onChange={(e) => {
                      const v = e.target.value
                      setPremiumTotalM2Raw(v)
                      setPremiumTotalM2(parseFloat(v) || 0)
                    }}
                    placeholder="0"
                    className={`w-full text-2xl bg-transparent border-b ${!totalProvided ? 'border-red-500' : 'border-[#E5DED4]'} pb-2 outline-none focus:border-[#8C7E6A] font-light`}
                  />
                </div>
                <div className="card-choice p-8 rounded-[2rem]">
                  <label className="text-[10px] uppercase tracking-widest text-[#8C7E6A] font-bold block mb-4">{txt.premium.kitchenAreaLabel}</label>
                  <div className="space-y-3">
                    {premiumKitchenAreasRaw.map((val, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label={txt.premium.kitchenAriaLabel(idx)}
                    value={val}
                    onChange={(e) => {
                      const next = [...premiumKitchenAreasRaw]
                      next[idx] = e.target.value
                      setPremiumKitchenAreasRaw(next)
                    }}
                    placeholder="0"
                    className={`w-full text-2xl bg-transparent border-b ${!hasKitchen ? 'border-red-500' : 'border-[#E5DED4]'} pb-2 outline-none focus:border-[#8C7E6A] font-light`}
                  />
                        {idx > 0 && (
                          <button type="button" onClick={() => removeKitchen(idx)} aria-label={txt.premium.removeKitchenAriaLabel(idx)} className="text-red-500">−</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addKitchen} className="mt-2 text-sm text-[#8C7E6A]">{txt.premium.addKitchen}</button>
                  </div>
                </div>
                <div className="card-choice p-8 rounded-[2rem]">
                  <label className="text-[10px] uppercase tracking-widest text-[#8C7E6A] font-bold block mb-4">{txt.premium.bathAreaLabel}</label>
                  <div className="space-y-3">
                    {premiumBathAreasRaw.map((val, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                          <input
                            type="number"
                            aria-label={txt.premium.bathAriaLabel(idx)}
                            value={val}
                            onChange={(e) => {
                              const next = [...premiumBathAreasRaw]
                              next[idx] = e.target.value
                              setPremiumBathAreasRaw(next)
                            }}
                            placeholder="0"
                            className={`w-full text-2xl bg-transparent border-b ${!hasBath ? 'border-red-500' : 'border-[#E5DED4]'} pb-2 outline-none focus:border-[#8C7E6A] font-light`}
                          />
                        {idx > 0 && (
                          <button type="button" onClick={() => removeBath(idx)} aria-label={txt.premium.removeBathAriaLabel(idx)} className="text-red-500">−</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addBath} className="mt-2 text-sm text-[#8C7E6A]">{txt.premium.addBath}</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right aside removed — single shared panel is shown above inputs */}
          </div>

          {/* Non-sticky continue button only (hide the black sticky panel) */}
          <div className="mt-8 flex flex-col items-center gap-3">
            {/* Validation: require total area provided and at least one kitchen and one bath with >0 area */}
            {(() => {
              const kitchenNums = premiumKitchenAreasRaw.map(v => parseFloat(v) || 0)
              const bathNums = premiumBathAreasRaw.map(v => parseFloat(v) || 0)
              const hasKitchen = kitchenNums.some(x => x > 0)
              const hasBath = bathNums.some(x => x > 0)
              const totalProvided = premiumTotalM2Raw.trim() !== '' && premiumTotalM2 > 0
              const isPremiumValid = totalProvided && hasKitchen && hasBath

              return (
                <>
                  <button
                    onClick={goToFinalStep}
                    disabled={!isPremiumValid}
                    className="w-full md:w-auto btn-primary bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
                  >
                    {txt.common.continue}
                  </button>

                  {!isPremiumValid && (
                    <div className="text-sm text-red-500 mt-2 text-center">
                      {!totalProvided && <div>Wprowadź powierzchnię całkowitą.</div>}
                      {!hasKitchen && <div>Wprowadź przynajmniej jedną kuchnię o dodatniej powierzchni.</div>}
                      {!hasBath && <div>Wprowadź przynajmniej jedną łazienkę o dodatniej powierzchni.</div>}
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </main>
  )
}
