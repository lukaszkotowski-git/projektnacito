import { useAppContext } from '../context/AppContext'

export function OfferOverview() {
  const { setCurrentView } = useAppContext()

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-4xl mx-auto px-6 text-left">
        <h1 className="text-5xl md:text-6xl font-serif mb-16 text-center">
          Proces <span className="italic text-[#8C7E6A]">projektowy</span>
        </h1>

        <div className="space-y-16">
          <div className="pl-8 border-l-2 border-[#8C7E6A]">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-[#8C7E6A]">Pierwszy etap</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Wykonanie układów funkcjonalnych w formacie rzutu technicznego 2D z zaznaczeniem poszczególnych stref.
              </p>
              <p>
                Wykonanie wizualizacji wnętrz, prezentujących użyte materiały, kolory oraz konkretne meble, zarówno te projektowane pod wymiar jak również gotowe.
              </p>
            </div>
          </div>

          <div className="pl-8 border-l-2 border-[#8C7E6A]">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-[#8C7E6A]">Drugi etap</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Opracowanie rysunków wykonawczych projektu (zestaw rysunków technicznych pozwala wykonawcom na samodzielne zrealizowanie remontu i pomaga uniknąć błędów podczas realizacji).
              </p>
              <p>
                Ostateczne uzgodnienie i dobór elementów wyposażenia wnętrza.
              </p>
              <p>
                Przygotowanie kosztorysu – zestawienie elementów wyposażenia wraz z wycenami od wykonawców.
              </p>
            </div>
          </div>

          <div className="pl-8 border-l-2 border-[#8C7E6A]">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-[#8C7E6A]">Trzeci etap</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nadzór autorski – tj. koordynacja zamówień, wizyty na budowie.
              </p>
              <p>
                Stylizacja wnętrza.
              </p>
              <p>
                Dokumentacja fotograficzna przestrzeni.
              </p>
            </div>
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
