import { useNavigate } from 'react-router-dom'
import RealizacjeCarousel from './RealizacjeCarousel'

export function MainView() {
  const navigate = useNavigate()

  const handleChoice = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="pt-32 pb-24">
      <section className="px-6 text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-serif mb-8 fade-in visible">
          Wybierz swój <br /><span className="italic text-[#8C7E6A]">zakres wsparcia</span>
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div onClick={() => handleChoice('/offer/cito')} className="card-choice p-10 rounded-[2.5rem] cursor-pointer text-left group">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7E6A] mb-6">Najczęściej wybierany</div>
            <h3 className="text-3xl font-serif mb-4">Pakiet na Cito</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">Zawiera wszystko, co NIEZBĘDNE do zrealizowania wnętrza. Dzięki temu powstaje szybciej i jest dostępny cenowo.</p>
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">
              Konfiguruj teraz <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>

          <div onClick={() => handleChoice('/offer/premium')} className="card-choice p-10 rounded-[2.5rem] cursor-pointer text-left group">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7E6A] mb-6">Kompleksowy</div>
            <h3 className="text-3xl font-serif mb-4">Pakiet Premium</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">Przeprowadzamy Cię przez cały proces projektowy. Oszczędzasz czas i otrzymujesz pełne wsparcie.</p>
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">
              Oblicz wycenę <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>

          <div onClick={() => handleChoice('/offer/consult')} className="card-choice p-10 rounded-[2.5rem] cursor-pointer text-left group">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7E6A] mb-6">Szybka Pomoc</div>
            <h3 className="text-3xl font-serif mb-4">Konsultacja</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">Szybka porada ekspercka online. Idealne rozwiązanie na konkretne dylematy.</p>
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">
              Umów się <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </div>
      </section>

      {/* Carousel inserted under packages */}
      <RealizacjeCarousel />
    </main>
  )
}
