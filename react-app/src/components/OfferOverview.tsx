import { useAppContext } from '../context/AppContext'

export function OfferOverview() {
  const { setCurrentView } = useAppContext()

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-6xl mx-auto px-6 text-left">
        <h1 className="text-5xl md:text-6xl font-serif mb-12 text-center">
          Proces <span className="italic text-[#8C7E6A]">projektowy</span>
        </h1>
        <div className="mb-20 max-w-2xl mx-auto text-gray-600 text-lg text-center">Każdy projekt realizujemy kompleksowo — od kreatywnego układu po finalną stylizację Twojego wnętrza.</div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Etap 1 */}
          <div className="flex-1 min-w-[270px] rounded-xl bg-white/95 shadow-lg p-8 animate-slideIn" style={{ animationDelay: '0s' }}>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-[#8C7E6A]">Pierwszy etap</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Wykonanie układów funkcjonalnych w formacie rzutu technicznego 2D z zaznaczeniem poszczególnych stref.</li>
              <li>Wykonanie wizualizacji wnętrz, prezentujących użyte materiały, kolory oraz konkretne meble — zarówno projektowane pod wymiar jak i gotowe.</li>
            </ul>
          </div>
          {/* Etap 2 */}
          <div className="flex-1 min-w-[270px] rounded-xl bg-white/95 shadow-lg p-8 animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-[#8C7E6A]">Drugi etap</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Opracowanie rysunków wykonawczych projektu (zestaw rysunków technicznych pozwala wykonawcom na samodzielne zrealizowanie remontu i pomaga uniknąć błędów podczas realizacji).</li>
              <li>Ostateczne uzgodnienie i dobór elementów wyposażenia wnętrza.</li>
              <li>Przygotowanie kosztorysu – zestawienie elementów wyposażenia wraz z wycenami od wykonawców.</li>
            </ul>
          </div>
          {/* Etap 3 */}
          <div className="flex-1 min-w-[270px] rounded-xl bg-white/95 shadow-lg p-8 animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-[#8C7E6A]">Trzeci etap</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Nadzór autorski — tj. koordynacja zamówień, wizyty na budowie.</li>
              <li>Stylizacja wnętrza.</li>
              <li>Dokumentacja fotograficzna przestrzeni.</li>
            </ul>
          </div>
        </div>
        <div className="mt-20 text-center">
          <button
            onClick={() => setCurrentView('main')}
            className="px-8 py-3 bg-[#8C7E6A] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#7A6C58] transition-colors"
          >
            Wróć do strony głównej
          </button>
        </div>
      </section>
    </main>
  )
}
