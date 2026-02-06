import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: '1. Jak wyceniana jest jadalnia w aneksie kuchennym, a jak jadalnia jako osobne pomieszczenie?',
    answer: `Jadalnia znajdująca się w aneksie kuchennym otwartym na salon traktowana jest jako część strefy dziennej i jej koszt wynosi 250 zł.
Jeżeli natomiast jadalnia stanowi osobne pomieszczenie, jej koszt wynosi 500 zł.`
  },
  {
    question: '2. Jak wyceniana jest antresola?',
    answer: `Antresolę wyceniamy jako sumę funkcji, które mają się na niej znaleźć.
Przykładowo: jeśli na antresoli projektowana jest sypialnia, łazienka i salon — każda z tych funkcji wyceniana jest osobno zgodnie z cennikiem, a następnie sumowana.`
  },
  {
    question: '3. Co dokładnie obejmuje cena projektu w Pakiecie na CITO?',
    answer: `Cena obejmuje:
układ funkcjonalny,
projekt stylistyki wnętrza w modelu 3D,
wizualizacje,
zestawienie materiałów, mebli, oświetlenia i sprzętów,
konkretne oferty od producentów i wykonawców.`
  },
  {
    question: '4. Czy można wybrać tylko część projektu (np. bez wizualizacji)?',
    answer: `Nie. Pakiet na CITO jest kompletną usługą projektową i nie ma możliwości wyboru pojedynczych elementów.
Dzięki temu projekt jest spójny i przemyślany od początku do końca.`
  },
  {
    question: '5. Czy są dodatkowe koszty, o których powinniśmy wiedzieć?',
    answer: `Nie ma ukrytych kosztów.
Dodatkowo płatne są wyłącznie usługi rozszerzające, takie jak:
rysunki wykonawcze,
inwentaryzacja,
nadzór autorski.
Zakres i koszt zawsze ustalane są indywidualnie przed realizacją.`
  },
  {
    question: '6. Ile trwa realizacja projektu?',
    answer: `Czas realizacji projektu określony jest w umowie.
Pierwsze materiały projektowe przekazujemy nie później niż w ciągu 21 dni roboczych, zgodnie z zapisami umowy.`
  },
  {
    question: '7. Kiedy otrzymamy pierwsze materiały?',
    answer: `Pierwsze materiały projektowe przekazywane są w ramach ustalonego harmonogramu, nie później niż w terminie określonym w umowie.`
  },
  {
    question: '8. Czy projekt realizowany jest etapami?',
    answer: `Tak — projekt realizowany jest etapami, co umożliwia bieżące konsultacje i wprowadzanie zmian na każdym etapie prac.`
  },
  {
    question: '9. Ile poprawek jest w cenie?',
    answer: `W cenie zawarte są poprawki wynikające z procesu projektowego, mające na celu dopasowanie projektu do ustalonych założeń i inspiracji.`
  },
  {
    question: '10. Jak wygląda współpraca krok po kroku?',
    answer: `Wypełnienie kalkulatora i wycena
Podpisanie umowy i wpłata zadatku
Analiza inspiracji i układ funkcjonalny
Projekt 3D i wizualizacje
Zestawienie materiałów, sprzętów i ofert.`
  },
  {
    question: '11. Czy spotkania odbywają się online czy stacjonarnie?',
    answer: `Standardowo współpraca odbywa się online, co pozwala sprawnie realizować projekty niezależnie od lokalizacji.`
  },
  {
    question: '12. Czy musimy dostarczyć inspiracje? W jakiej formie?',
    answer: `Tak — inspiracje są zawsze wymagane i stanowią warunek realizacji Pakietu na CITO.
Na ich podstawie określamy kierunek stylistyczny projektu, dlatego są niezbędne do rozpoczęcia prac.
Inspiracje mogą mieć formę:
zdjęć,
linków (Pinterest, Instagram, strony internetowe),
zapisanych tablic / folderów inspiracyjnych,
krótkiego opisu klimatu, kolorów i materiałów.`
  },
  {
    question: '13. Czy projekt wystarczy ekipie do realizacji?',
    answer: `Pakiet na CITO nie zawiera pełnej dokumentacji wykonawczej. Jeżeli wykonawca potrzebowałby bardziej szczegółowego opracowania to istnieje możliwość rozszerzenia go o elementy Pakietu Premium.`
  },
  {
    question: '14. Czy pomagacie przy doborze materiałów, mebli i sprzętów?',
    answer: `Tak — w ramach projektu pomagamy w doborze materiałów wykończeniowych, mebli, oświetlenia oraz sprzętów, zawsze z uwzględnieniem założonego budżetu.`
  },
  {
    question: '15. Czy dostaniemy listę zakupową / linki do sklepów?',
    answer: `Tak — zawsze przekazujemy konkretne linki do materiałów, mebli i sprzętów, gdzie można je zakupić samodzielnie,
lub dokładne informacje o produktach dostępnych w showroomach, wraz z konkretnymi ofertami.
Dzięki temu dokładnie wiecie, co kupić, gdzie i w jakiej cenie.`
  },
  {
    question: '16. Czy można zmienić zakres w trakcie projektu?',
    answer: `Zakres projektu nie może zostać zmniejszony w trakcie realizacji.`
  },
  {
    question: '17. Czy można domówić dodatkowe pomieszczenie później?',
    answer: `Tak — istnieje możliwość doprojektowania dodatkowych pomieszczeń w trakcie lub po zakończeniu projektu, zgodnie z aktualnym cennikiem.`
  },
  {
    question: '18. Jak wygląda płatność?',
    answer: `Płatność realizowana jest zgodnie z zapisami umowy, po akceptacji wyceny.`
  },
  {
    question: '19. Czy podpisujemy umowę?',
    answer: `Tak — każda współpraca odbywa się na podstawie pisemnej umowy, która jasno określa zakres i zasady projektu.`
  },
  {
    question: '20. Kiedy trzeba wpłacić zadatek?',
    answer: `Zadatek wpłacany jest po podpisaniu umowy, przed rozpoczęciem prac projektowych.`
  },
  {
    question: '21. Czy wystawiacie fakturę?',
    answer: `Tak — wystawiamy fakturę.`
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => setOpenIndex(idx === openIndex ? null : idx);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Najczęściej zadawane pytania</h2>
      <div className="space-y-4">
        {FAQ_DATA.map((item, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-4">
            <button
              className="w-full text-left flex justify-between items-center py-4 focus:outline-none focus-visible:ring"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="font-semibold text-lg">{item.question}</span>
              <svg
                className={`w-5 h-5 ml-2 transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#8C7E6A"/>
              </svg>
            </button>
            {openIndex === idx && (
              <div className="text-gray-700 mt-2 animate-fade-in">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
