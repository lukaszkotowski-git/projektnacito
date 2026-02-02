import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export function OfferOverview() {
  const { setCurrentView } = useAppContext()
  const navigate = useNavigate()

  const handlePackageClick = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const etapy = [
    {
      numer: 1,
      tytul: 'Pierwszy etap',
      punkty: [
        'Układ funkcjonalny w formacie rzutu technicznego 2D.',
        'Wizualizacje wnętrz – materiały, kolory, meble (na wymiar i gotowe).',
      ],
    },
    {
      numer: 2,
      tytul: 'Drugi etap',
      punkty: [
        'Rysunki wykonawcze – szczegółowy zestaw techniczny dla wykonawców.',
        'Dobór elementów wyposażenia wnętrza.',
        'Kosztorys – szczegółowa wycena i zestawienie elementów.',
      ],
    },
    {
      numer: 3,
      tytul: 'Trzeci etap',
      punkty: [
        'Nadzór autorski – koordynacja zamówień, wizyty na budowie.',
        'Stylizacja wnętrza.',
        'Dokumentacja fotograficzna przestrzeni.',
      ],
    }
  ];

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-6xl mx-auto px-6 text-left">
        <h1 className="text-5xl md:text-6xl font-serif mb-12 text-center">
          Proces <span className="italic text-[#8C7E6A]">projektowy</span>
        </h1>
        <div className="mb-12 max-w-2xl mx-auto text-[#8C7E6A] text-xl text-center font-semibold">
          Nasze pakiety projektowe możesz dobrać do własnych potrzeb – od szybkiego projektu, przez pełną obsługę i wsparcie, aż po indywidualną konsultację z architektem wnętrz.
        </div>
        <div className="mb-16 max-w-2xl mx-auto text-gray-600 text-lg text-center">Każdy projekt realizujemy kompleksowo — od kreatywnego układu po finalną stylizację Twojego wnętrza.</div>


        <div className="relative flex flex-col gap-16 mb-24 pl-12">

          <div className="hidden md:block absolute left-24 top-8 bottom-8 w-1 bg-gradient-to-b from-[#E5DED4] to-[#8C7E6A] animate-growLine" />
          {etapy.map((etap, i) => (
            <div className={`relative flex ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-7`} key={etap.numer}>
    
              <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white shadow flex items-center justify-center text-3xl font-bold text-[#8C7E6A] border-2 border-[#E5DED4] animate-bounceIn">
                {etap.numer}
              </div>
    
              <div className={`md:hidden absolute left-8 right-8 top-16 bottom-0 w-1 bg-gradient-to-b from-[#E5DED4] to-[#8C7E6A]`} />
    
              <div className={`rounded-xl bg-white/95 shadow-lg p-8 flex-1 ${i % 2 === 0 ? 'animate-fadeInLeft' : 'animate-fadeInRight'}`} style={{ animationDelay: `${i * 0.13}s` }}>
                <h2 className="text-2xl md:text-3xl font-serif mb-4 text-[#8C7E6A]">{etap.tytul}</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
                  {etap.punkty.map((punkt, idx) => (
                    <li key={idx}>{punkt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>


        <div className="mb-14">
          <h2 className="text-3xl font-serif mb-8 text-center text-[#8C7E6A]">Pakiety</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">

            <div 
              onClick={() => handlePackageClick('/offer/cito')}
              className="flex-1 min-w-[280px] bg-white/95 rounded-2xl shadow-xl p-8 animate-slideIn cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="text-xl font-bold text-[#8C7E6A] mb-3">Cito</div>
              <p className="mb-4 text-gray-700">Każdy powinien móc mieszkać w pięknym, funkcjonalnym i dostosowanym do jego potrzeb wnętrzu, dlatego powstał Projekt na CITO.<br/>W jego skład wchodzi wszystko, co niezbędne do zrealizowania projektu wnętrza:</p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-base mb-2">
                <li><b>Układ funkcjonalny</b><br/>Rzut z propozycją układu elementów we wnętrzu.</li>
                <li><b>Aranżacja</b><br/>Model 3D prezentujący proponowane rozwiązania estetyczne.</li>
                <li><b>Zestawienie materiałów i sprzętów</b><br/>Lista konkretnych materiałów z ich cenami i linkami do sklepów.</li>
                <li><b>Wizualizacje</b><br/>Fotorealistyczne przedstawienie wnętrza.</li>
                <li><b>Schemat meblowy</b><br/>Rzuty i przekroje mebli z ich podstawowymi wymiarami.</li>
                <li><b>Oferty od wykonawców</b><br/>Oferta od np. stolarza, budowlańca, instalatora klimatyzacji na zastosowane w projekcie rozwiązania.</li>
              </ol>
              <p className="mt-2 text-gray-600 text-sm">Do rozpoczęcia pracy potrzebujemy rzutu/rysunku z obmiarem projektowanej przestrzeni oraz Twoich wytycznych i inspiracji do projektu. Obmiar projektowanej przestrzeni wraz z przedstawieniem danych na rzucie.</p>
              <div className="font-bold text-[#8C7E6A] text-lg mt-2">Koszt projektu to 500 zł za pomieszczenie o jednej funkcji.</div>
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center text-[#8C7E6A]">
                Konfiguruj <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>

            <div 
              onClick={() => handlePackageClick('/offer/premium')}
              className="flex-1 min-w-[280px] bg-[rgba(216,171,80,0.06)] rounded-2xl shadow-xl p-8 border border-[#D8AB50] animate-slideIn cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group" style={{ animationDelay: '0.1s' }}
            >
              <div className="text-xl font-bold text-[#D8AB50] mb-3">Premium</div>
              <p className="mb-4 text-gray-700">Chcesz cieszyć się realizacją projektu Twojego wymarzonego wnętrza pod czujnym okiem inżyniera budowy i architekta wnętrz? Projekt rozszerzony jest dla Ciebie!<br/>W jego skład wchodzi:</p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-base mb-2">
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
              <div className="font-bold text-[#D8AB50] text-lg mt-2">Koszt tego opracowania to 150 zł za m² projektowanej powierzchni.<br/>Kuchnia i łazienka liczona każda za 2500zł.<br/>Nadzór wyceniany jest indywidualnie zależnie od jego zakresu i rozliczany stawką godzinową.</div>
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center text-[#D8AB50]">
                Oblicz wycenę <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>

            <div 
              onClick={() => handlePackageClick('/offer/consult')}
              className="flex-1 min-w-[280px] bg-white/95 rounded-2xl shadow-xl p-8 animate-slideIn cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group" style={{ animationDelay: '0.15s' }}
            >
              <div className="text-xl font-bold text-[#8C7E6A] mb-3">Konsultacja</div>
              <p className="mb-4 text-gray-700">Jeżeli potrzebujesz szybkiej i kompleksowej porady, to konsultacja jest rozwiązaniem dla Ciebie.<br/>Może ona polegać na:</p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-base mb-2">
                <li><b>Analizie układu funkcjonalnego</b><br/>Proponowanie ustawienia elementów wyposażenia we wnętrzu.</li>
                <li><b>Planowaniu zmian lokatorskich</b><br/>Dokonywanie zmian w projekcie przedstawionym przez dewelopera przed oddaniem mieszkania.</li>
                <li><b>Sprawdzaniu wykonalności projektu</b><br/>Weryfikacja rozwiązań pod względem realności wykonania i kosztu.</li>
                <li><b>Porównywaniu ustawności mieszkań</b><br/>Porównanie mieszkań przed zakupem.</li>
                <li><b>Inne</b><br/>Chętnie podzielimy się naszą wiedzą i doświadczeniem w zakresie projektowania wnętrz i realizacji założeń projektowych.</li>
              </ol>
              <div className="font-bold text-[#8C7E6A] text-lg mt-2">Koszt tej usługi to 200 zł za godzinę konsultacji.</div>
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center text-[#8C7E6A]">
                Umów się <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
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
