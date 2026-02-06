import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: 'Jak działa aplikacja?',
    answer: 'Aplikacja pomaga w szybkim i wygodnym przygotowaniu projektów architektonicznych online. Przechodzisz przez prosty konfigurator, przesyłasz wybrane materiały i odbierasz gotowy projekt.'
  },
  {
    question: 'Czy moje dane są bezpieczne?',
    answer: 'Tak, dbamy o bezpieczeństwo Twoich danych. Wszelkie przesłane informacje są szyfrowane i nie są udostępniane osobom trzecim.'
  },
  {
    question: 'Jak mogę zresetować hasło?',
    answer: 'Jeśli zapomniałeś hasła, skorzystaj z opcji resetowania hasła dostępnej na stronie logowania. Otrzymasz e-mail z instrukcją.'
  },
  {
    question: 'Kto ma dostęp do moich danych?',
    answer: 'Dostęp do danych mają wyłącznie osoby realizujące Twój projekt oraz administratorzy odpowiedzialni za bezpieczeństwo systemu.'
  },
  {
    question: 'Jak długo trwa realizacja projektu?',
    answer: 'Standardowy czas realizacji to 7 dni roboczych, jednak zależy od wybranego pakietu i indywidualnych ustaleń.'
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
