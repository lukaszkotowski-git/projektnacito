import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export function ONas(): JSX.Element {
  const { setCurrentView } = useAppContext()
  const navigate = useNavigate()

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#8C7E6A]">Projekt na CITO</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">Projekt na CITO to studio projektowe prowadzone przez Klaudię Kołakowską – architektkę wnętrz, absolwentkę ASP w Warszawie, oraz Angelikę Kłos – mgr inż. budownictwa. Naszą specjalnością jest Pakiet na CITO – szybki i kompleksowy projekt wnętrza online, dopasowany do budżetu i potrzeb, tworzony w krótkim czasie. Dla osób oczekujących pełniejszej obsługi oferujemy Pakiet Premium – z inwentaryzacją, rysunkami wykonawczymi i możliwością nadzoru autorskiego. Każdy detal ma dla nas znaczenie, bo wierzymy, że najlepsze wnętrza powstają tam, gdzie funkcjonalność spotyka estetykę. Realizujemy projekty w Polsce i za granicą – online stworzyłyśmy już dziesiątki aranżacji prezentowanych w mediach społecznościowych.</p>
              <div className="flex gap-4">
                <button onClick={() => { setCurrentView('offer-overview'); navigate('/offer') }} className="px-6 py-3 bg-[#8C7E6A] text-white rounded-md uppercase text-sm tracking-wider hover:bg-[#7A6C58] transition">Poznaj ofertę</button>
                <button onClick={() => { setCurrentView('main'); navigate('/') }} className="px-6 py-3 border border-[#E5DED4] rounded-md uppercase text-sm tracking-wider hover:bg-gray-50 transition">Wróć</button>
              </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="w-full max-w-[420px] transform transition duration-500 hover:scale-105">
              <img src="/onas/onas.png" alt="O nas" className="w-full h-auto rounded-2xl shadow-lg object-cover" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
