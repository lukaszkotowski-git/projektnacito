import React from 'react'

const polishText = `Projekt na CITO to studio projektowe prowadzone przez Klaudię Kołakowską – architektkę wnętrz, absolwentkę ASP w Warszawie, oraz Angelikę Kłos – mgr inż. budownictwa. Naszą specjalnością jest Pakiet na CITO – szybki i kompleksowy projekt wnętrza online, dopasowany do budżetu i potrzeb, tworzony w krótkim czasie. Dla osób oczekujących pełniejszej obsługi oferujemy Pakiet Premium – z inwentaryzacją, rysunkami wykonawczymi i możliwością nadzoru autorskiego. Każdy detal ma dla nas znaczenie, bo wierzymy, że najlepsze wnętrza powstają tam, gdzie funkcjonalność spotyka estetykę. Realizujemy projekty w Polsce i za granicą – online stworzyłyśmy już dziesiątki aranżacji prezentowanych w mediach społecznościowych.`

export function ONas() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
      <div className="flex-1 md:order-1">
        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-[#8C7E6A]">O nas</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
          {polishText}
        </p>
      </div>
      <div className="flex-shrink-0 md:order-2 md:ml-auto">
        <img
          src="/onas/onas.png"
          alt="O nas"
          className="w-60 md:w-72 lg:w-80 rounded-2xl shadow-lg object-cover object-top mx-auto md:mx-0 md:float-right mt-4 md:mt-0"
        />
      </div>
    </section>
  )
}
