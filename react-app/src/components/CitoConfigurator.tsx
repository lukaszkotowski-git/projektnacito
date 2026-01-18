import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { PRICING } from '../constants'

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
  const {
    setCurrentView, resetState,
    selectedRoomsCito, setSelectedRoomsCito,
    electricProject, setElectricProject,
    electricM2, setElectricM2,
    currentPrice, setCurrentPrice,
    setCurrentPackage
  } = useAppContext()

  useEffect(() => {
    let total = 0
    Object.keys(selectedRoomsCito).forEach(room => {
      total += selectedRoomsCito[room] * PRICING.cito[room]
    })
    if (electricProject) {
      total += electricM2 * PRICING.electricPerM2
    }
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
    setCurrentView('main')
  }

  const goToFinalStep = () => {
    setCurrentPackage('cito')
    setCurrentView('final-step')
  }

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={goToMain} className="text-[10px] uppercase tracking-widest font-bold flex items-center mb-8 hover:text-[#8C7E6A] transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Wróć do wyboru
        </button>
        <header className="mb-12">
          <h2 className="text-4xl font-serif mb-2">Konfigurator Pakietu na Cito</h2>
          <p className="text-gray-500">Zaznacz pomieszczenia, które wymagają projektu.</p>
        </header>
        <div className="space-y-12">
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
          <div className="border-t border-[#E5DED4] pt-12">
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border border-[#E5DED4]">
              <input 
                type="checkbox" 
                id="electric-project" 
                checked={electricProject}
                onChange={(e) => setElectricProject(e.target.checked)}
                className="mt-1.5 h-5 w-5 rounded border-gray-300 text-[#8C7E6A] focus:ring-[#8C7E6A]"
              />
              <div className="flex-1">
                <label htmlFor="electric-project" className="font-semibold block">Projekt instalacji elektrycznej</label>
                <p className="text-sm text-gray-500 mb-4">Dodatkowe opracowanie techniczne punktów świetlnych i gniazd.</p>
                {electricProject && (
                  <div className="animate-in fade-in duration-300">
                    <label htmlFor="electric-m2-input" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">POWIERZCHNIA PROJEKTU (M²)</label>
                    <input
                      id="electric-m2-input"
                      type="number"
                      value={electricM2 || ''}
                      onChange={(e) => setElectricM2(parseFloat(e.target.value) || 0)}
                      placeholder="m²"
                      min="0"
                      step="0.1"
                      aria-label="Powierzchnia projektu m2"
                      className="w-32 bg-[#FDFBF7] border border-[#E5DED4] rounded-xl px-4 py-2 outline-none focus:border-[#8C7E6A]"
                    />
                    <p className="text-xs text-gray-400 mt-2">Wprowadź powierzchnię w m²</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sticky bottom-6 bg-[#33302E] text-white p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Szacunkowy koszt projektu</span>
              <div className="text-3xl font-light"><span>{currentPrice.toLocaleString()}</span> zł <span className="text-sm text-gray-400">netto</span></div>
            </div>
            <button 
              onClick={goToFinalStep} 
              disabled={currentPrice === 0}
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
