import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { PRICING } from '../constants'
import { t } from '../i18n'

interface RoomCardProps {
  room: string
  price: number
  count: number
  selected: boolean
  onToggle: () => void
  onCountChange: (delta: number) => void
}

function RoomCard({ room, price, count, selected, onToggle, onCountChange }: RoomCardProps) {
  return (
    <div className={`card-choice p-5 rounded-3xl flex flex-col justify-between shadow-sm ${selected ? 'active' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{room}</span>
          <span className="text-[10px] text-[#8C7E6A] uppercase font-bold tracking-wider">{price} zł / szt.</span>
        </div>
        <input 
          type="checkbox" 
          checked={selected}
          onChange={onToggle}
          className="h-5 w-5 rounded border-gray-300 text-[#8C7E6A] cursor-pointer"
        />
      </div>
      {selected && (
        <div className="mt-4 flex items-center gap-3 bg-white border border-[#E5DED4] rounded-xl p-1 w-fit">
          <button onClick={() => onCountChange(-1)} className="w-8 h-8 flex items-center justify-center rounded-lg font-bold">-</button>
          <span className="text-sm font-bold w-4 text-center">{count}</span>
          <button onClick={() => onCountChange(1)} className="w-8 h-8 flex items-center justify-center rounded-lg font-bold">+</button>
        </div>
      )}
    </div>
  )
}

export function CitoConfigurator() {
  const navigate = useNavigate()
  const txt = t()
  const {
    resetState,
    selectedRoomsCito, setSelectedRoomsCito,
    electricProject, setElectricProject,
    electricM2, setElectricM2,
    currentPrice, setCurrentPrice,
    setCurrentView,
    setCurrentPackage,
    furnitureProject, setFurnitureProject,
    plumbingProject, setPlumbingProject
  } = useAppContext()

  const [localElectricM2, setLocalElectricM2] = useState<string>(electricM2 ? String(electricM2) : '')
  const [touchedElectric, setTouchedElectric] = useState(false)

  useEffect(() => { setLocalElectricM2(electricM2 ? String(electricM2) : '') }, [electricM2])


  useEffect(() => {
    let total = 0
    Object.keys(selectedRoomsCito).forEach(room => {
      total += selectedRoomsCito[room] * PRICING.cito[room]
    })
    if (electricProject) {
      total += electricM2 * PRICING.electricPerM2
    }
    // Note: furnitureProject and plumbingProject are checkboxes without extra price
    setCurrentPrice(total)
  }, [selectedRoomsCito, electricProject, electricM2, setCurrentPrice])

  const toggleRoom = (room: string) => {
    const newRooms = { ...selectedRoomsCito }
    if (newRooms[room]) {
      delete newRooms[room]
    } else {
      newRooms[room] = 1
    }
    setSelectedRoomsCito(newRooms)
  }

  const updateCount = (room: string, delta: number) => {
    const newRooms = { ...selectedRoomsCito }
    newRooms[room] = Math.max(1, (newRooms[room] || 1) + delta)
    setSelectedRoomsCito(newRooms)
  }

  const goToMain = () => {
    resetState()
    navigate('/')
  }

  const goToFinalStep = () => {
    // Ensure electric m2 value is committed
    setTouchedElectric(true)
    const parsedM2 = localElectricM2 === '' ? 0 : parseFloat(localElectricM2)
    setElectricM2(parsedM2)

    // If electric project selected, require a valid >0 m2
    if (electricProject && (localElectricM2 === '' || Number(localElectricM2) <= 0)) {
      return
    }

    setCurrentPackage('cito')
    navigate('/final')
  }

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={goToMain} className="text-[10px] uppercase tracking-widest font-bold flex items-center hover:text-[#8C7E6A] transition">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {txt.common.backToSelection}
          </button>
        </div>
          <header className="mb-12">
          <h2 className="text-4xl font-serif mb-2">{txt.cito.title}</h2>
          <p className="text-gray-500">{txt.cito.subtitle}</p>
          <div className="mt-4 flex justify-end md:mt-0 md:fixed md:right-6 md:top-32 lg:right-8 lg:top-40 xl:right-12 xl:top-48 z-50 group">
            <button
              onClick={() => { setCurrentView('faq'); navigate('/faq#faq') }}
              className="inline-flex items-center gap-3 bg-[#8C7E6A] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#7A6C58] transition-shadow shadow-md"
              aria-label={txt.common.haveQuestion}
              aria-describedby="faq-cta-desc"
            >
              <span className="text-sm font-semibold text-white animate-pulse">{txt.common.haveQuestion}</span>
            </button>
            <div
              id="faq-cta-desc"
              role="tooltip"
              className="absolute right-0 top-full mt-2 w-48 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
              {txt.common.faqTooltip}
            </div>
          </div>
        </header>
        <div className="space-y-12">
          <div className="md:flex md:items-start md:gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(PRICING.cito).map(room => (
              <RoomCard
                key={room}
                room={room}
                price={PRICING.cito[room]}
                count={selectedRoomsCito[room] || 1}
                selected={!!selectedRoomsCito[room]}
                onToggle={() => toggleRoom(room)}
                onCountChange={(delta) => updateCount(room, delta)}
              />
            ))}
              </div>

              <div className="border-t border-[#E5DED4] pt-12 mt-12">
                <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border border-[#E5DED4]">
                  <input 
                    type="checkbox" 
                    id="electric-project" 
                    checked={electricProject}
                    onChange={(e) => setElectricProject(e.target.checked)}
                    className="mt-1.5 h-5 w-5 rounded border-gray-300 text-[#8C7E6A] focus:ring-[#8C7E6A]"
                  />
                  <div className="flex-1">
                    <label htmlFor="electric-project" className="font-semibold block">{txt.cito.electricProject}</label>
                    <p className="text-sm text-gray-500 mb-4">{txt.cito.electricDesc}</p>
                    {electricProject && (
                      <div className="relative">
                        <div className="animate-in duration-300 visible">
                          <label htmlFor="electric-m2-input" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">{txt.cito.electricAreaLabel}</label>
                          <input
                            id="electric-m2-input"
                            type="number"
                            value={localElectricM2}
                            onChange={(e) => setLocalElectricM2(e.target.value)}
                            onBlur={() => {
                              setTouchedElectric(true)
                              setElectricM2(localElectricM2 === '' ? 0 : parseFloat(localElectricM2))
                            }}
                            onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur() } }}
                            placeholder={txt.common.perM2}
                            min="0"
                            step="0.1"
                            aria-label={txt.cito.electricAreaLabel}
                            aria-describedby="electric-m2-help"
                            aria-invalid={electricProject && (localElectricM2 === '' || Number(localElectricM2) <= 0)}
                            className={`relative z-10 pointer-events-auto w-32 bg-[#FDFBF7] rounded-xl px-4 py-2 outline-none focus:border-[#8C7E6A] ${electricProject && (localElectricM2 === '' || Number(localElectricM2) <= 0) ? 'border border-red-500' : 'border border-[#E5DED4]'}`}
                          />
                          <p id="electric-m2-help" className="text-xs text-gray-400 mt-2">{txt.cito.electricAreaHelp}</p>
                          {electricProject && (localElectricM2 === '' || Number(localElectricM2) <= 0) && touchedElectric && (
                            <p className="text-xs text-red-500 mt-2">{txt.cito.electricAreaError}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                

                {/* Additional optional project checkboxes (no price impact) */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5DED4]">
                    <input type="checkbox" checked={furnitureProject} onChange={(e) => setFurnitureProject(e.target.checked)} className="mt-1.5 h-5 w-5 rounded border-gray-300 text-[#8C7E6A]" />
                    <div>
                      <div className="font-semibold">{txt.cito.furnitureProject}</div>
                      <div className="text-sm text-gray-500">{txt.cito.furnitureDesc}</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5DED4]">
                    <input type="checkbox" checked={plumbingProject} onChange={(e) => setPlumbingProject(e.target.checked)} className="mt-1.5 h-5 w-5 rounded border-gray-300 text-[#8C7E6A]" />
                    <div>
                      <div className="font-semibold">{txt.cito.plumbingProject}</div>
                      <div className="text-sm text-gray-500">{txt.cito.plumbingDesc}</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Condensed side panel with package summary (visible on md+) */}
            <aside className="hidden md:block w-80 shrink-0 mt-0">
            <div className="p-6 rounded-2xl bg-white border border-[#E5DED4] shadow-sm">
                <h3 className="text-lg font-semibold text-[#8C7E6A] mb-2">{txt.cito.summaryTitle}</h3>
                <p className="mb-4 text-gray-700">{txt.cito.summaryIntro}</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-sm mb-2">
                  {txt.cito.summaryItems.map((item, idx) => (
                    <li key={idx}><b>{item.title}</b><br/>{item.desc}</li>
                  ))}
                </ol>
                <p className="mt-2 text-gray-600 text-xs">{txt.cito.summaryNote}</p>
              </div>
            </aside>

          </div>
            <div className="mt-8">
              <div className="p-6 rounded-2xl bg-[#33302E] text-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-200 block mb-1">{txt.cito.estimatedCost}</span>
                  <div className="text-3xl font-light"><span>{currentPrice.toLocaleString()}</span> {txt.common.currency} <span className="text-sm text-gray-300">{txt.common.net}</span></div>
                </div>
                <button 
                  onClick={goToFinalStep} 
                  disabled={
                    currentPrice === 0 || (electricProject && (localElectricM2 === '' || Number(localElectricM2) <= 0))
                  }
                  className="btn-primary bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
                >
                  {txt.common.continue}
                </button>
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}
