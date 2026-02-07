/**
 * Polish translations for Projekt na Cito
 */
export const pl = {
  // Common / shared
  common: {
    backToSelection: 'Wróć do wyboru',
    backToConfig: 'Wróć do konfiguracji',
    backToHome: 'Powrót do strony głównej',
    continue: 'Kontynuuj',
    submit: 'Wyślij zgłoszenie',
    sending: 'Wysyłanie...',
    net: 'netto',
    currency: 'zł',
    perPiece: 'szt.',
    perM2: 'm²',
    perHour: 'h',
    haveQuestion: 'Masz pytanie?',
    faqTooltip: 'Przejdź do najczęściej zadawanych pytań (FAQ).',
  },

  // Navigation
  nav: {
    brandName: 'Projekt na Cito',
    brandSubtitle: 'Klaudia & Angelika',
    start: 'Start',
    offer: 'Oferta',
    offerOverview: 'Poznaj ofertę',
    packageCito: 'Pakiet na Cito',
    packagePremium: 'Pakiet Premium',
    consultations: 'Konsultacje',
    about: 'O nas',
    faq: 'FAQ',
    callKlaudia: 'Zadzwoń do Klaudii',
    callAngelika: 'Zadzwoń do Angeliki',
    toggleMenu: 'Toggle menu',
    klaudiaPhone: '698 354 726',
    angelikaPhone: '697 909 309',
  },

  // Main view (landing)
  main: {
    headline: 'Wybierz swój',
    headlineAccent: 'zakres wsparcia',
    // Package cards
    citoTag: 'Najczęściej wybierany',
    citoTitle: 'Pakiet na Cito',
    citoDesc: 'Zawiera wszystko, co NIEZBĘDNE do zrealizowania wnętrza. Dzięki temu powstaje szybciej i jest dostępny cenowo.',
    citoCta: 'Oblicz wycenę',
    premiumTag: 'Kompleksowy',
    premiumTitle: 'Pakiet Premium',
    premiumDesc: 'Przeprowadzamy Cię przez cały proces projektowy. Oszczędzasz czas i otrzymujesz pełne wsparcie.',
    premiumCta: 'Oblicz wycenę',
    consultTag: 'Szybka Pomoc',
    consultTitle: 'Konsultacja',
    consultDesc: 'Szybka porada ekspercka online. Idealne rozwiązanie na konkretne dylematy.',
    consultCta: 'Umów się',
  },

  // Cito Configurator
  cito: {
    title: 'Konfigurator Pakietu na Cito',
    subtitle: 'Zaznacz pomieszczenia, które wymagają projektu.',
    electricProject: 'Projekt instalacji elektrycznej',
    electricDesc: 'Określa rozmieszczenie gniazdek, włączników, punktów świetlnych.',
    electricAreaLabel: 'POWIERZCHNIA PROJEKTU (M²)',
    electricAreaHelp: 'Wprowadź powierzchnię w m²',
    electricAreaError: 'Wprowadź poprawną powierzchnię projektu (więcej niż 0 m²)',
    furnitureProject: 'Projekt zabudowy meblowej',
    furnitureDesc: 'Opcjonalny projekt mebli na wymiar.',
    plumbingProject: 'Projekt instalacji wodno-kanalizacyjnych',
    plumbingDesc: 'Opcjonalny projekt instalacji wodno-kanalizacyjnej.',
    estimatedCost: 'Szacunkowy koszt projektu',
    // Side panel
    summaryTitle: 'Pakiet Cito — w pigułce',
    summaryIntro: 'W jego skład wchodzi wszystko, co niezbędne do zrealizowania projektu wnętrza:',
    summaryItems: [
      { title: 'Układ funkcjonalny', desc: 'Rzut z propozycją układu elementów we wnętrzu.' },
      { title: 'Aranżacja', desc: 'Model 3D prezentujący proponowane rozwiązania estetyczne.' },
      { title: 'Zestawienie materiałów i sprzętów', desc: 'Lista konkretnych materiałów z ich cenami i linkami do sklepów.' },
      { title: 'Wizualizacje', desc: 'Fotorealistyczne przedstawienie wnętrza.' },
      { title: 'Schemat meblowy', desc: 'Rzuty i przekroje mebli z ich podstawowymi wymiarami.' },
      { title: 'Oferty od wykonawców', desc: 'Oferta od np. stolarza, budowlańca, instalatora klimatyzacji na zastosowane w projekcie rozwiązania.' },
    ],
    summaryNote: 'Do rozpoczęcia pracy potrzebujemy rzutu/rysunku z obmiarem projektowanej przestrzeni oraz Twoich wytycznych i inspiracji do projektu.',
  },

  // Premium Configurator
  premium: {
    title: 'Konfigurator Pakietu Premium',
    subtitle: 'Wprowadź metraże — otrzymasz szczegółową wycenę na podany adres e-mail.',
    totalAreaLabel: 'Powierzchnia całkowita (m²)',
    kitchenAreaLabel: 'Powierzchnie kuchni (m²)',
    bathAreaLabel: 'Powierzchnie łazienek (m²)',
    addKitchen: '+ Dodaj kuchnię',
    addBath: '+ Dodaj łazienkę',
    removeKitchenAriaLabel: (idx: number) => `Usuń kuchnię ${idx + 1}`,
    removeBathAriaLabel: (idx: number) => `Usuń łazienkę ${idx + 1}`,
    kitchenAriaLabel: (idx: number) => `Powierzchnia kuchni ${idx + 1} (m²)`,
    bathAriaLabel: (idx: number) => `Powierzchnia łazienki ${idx + 1} (m²)`,
    // Side panel
    summaryTitle: 'Pakiet Premium — w pigułce',
    summaryIntro: 'Chcesz cieszyć się realizacją projektu Twojego wymarzonego wnętrza pod czujnym okiem inżyniera budowy i architekta wnętrz? Projekt rozszerzony jest dla Ciebie!\nW jego skład wchodzi:',
    summaryItems: [
      { title: 'Inwentaryzacja', desc: 'Pomiary całej projektowanej części.' },
      { title: 'Układ funkcjonalny', desc: 'Rzut z propozycją układu elementów we wnętrzu.' },
      { title: 'Aranżacja', desc: 'Model 3D prezentujący proponowane rozwiązania estetyczne.' },
      { title: 'Zestawienie materiałów i sprzętów', desc: 'Lista konkretnych materiałów z ich cenami i linkami do sklepów.' },
      { title: 'Wizualizacje', desc: 'Fotorealistyczne przedstawienie wnętrza.' },
      { title: 'Projekt meblowy', desc: 'Kompletny projekt zabudowy meblowej.' },
      { title: 'Projekt wykonawczy', desc: 'Rzuty podłóg i sufitów, rzuty instalacji wod-kan, rzuty instalacji elektrycznej, wentylacji, CO oraz rysunki detali.' },
      { title: 'Oferty od wykonawców', desc: 'Oferta od np. stolarza, budowlańca, instalatora na zastosowane w projekcie rozwiązania.' },
      { title: 'Nadzór autorski', desc: 'Pilnowanie przebiegu prac projektowych i ich zgodności z projektem, kontrolowanie zamówień, oglądanie i wybieranie elementów wyposażenia.' },
    ],
  },

  // Consult Configurator
  consult: {
    title: 'Umów Konsultację',
    rate: 'Koszt: 250 zł / h',
    subtitle: 'Odezwiemy się, wszystko wyjaśnimy i wspólnie wybierzemy odpowiedni termin.',
    nameLabel: 'Imię i nazwisko',
    namePlaceholder: 'np. Anna Nowak',
    phoneLabel: 'Numer telefonu',
    phonePlaceholder: '+48 000 000 000',
    emailLabel: 'Adres e-mail (opcjonalnie)',
    emailPlaceholder: 'np. imie@domena.pl',
    notesLabel: 'Dodatkowe informacje / notatka',
    notesPlaceholder: 'Opcjonalne informacje dla konsultanta...',
    submitBtn: 'Poproś o termin',
  },

  // Final Step (form)
  finalStep: {
    title: 'Prawie gotowe!',
    subtitle: (packageName: string) => `Zostaw dane dla pakietu ${packageName}.`,
    nameLabel: 'Imię i nazwisko',
    namePlaceholder: 'np. Jan Kowalski',
    phoneLabel: 'Numer telefonu',
    phonePlaceholder: '+48 000 000 000',
    emailLabel: 'Adres e-mail',
    emailPlaceholder: 'np. imie@domena.pl',
    fileLabel: 'ZAŁĄCZ RZUT/ RYSUNEK ODRĘCZNY Z WYMIARAMI (JPG, PNG, PDF)',
    filePlaceholder: 'Rzut lub rysunek z obmiarem projektowanej przestrzeni.',
    estimatedAmount: 'Wyliczona kwota',
    invalidEmail: 'Nieprawidłowy adres e-mail',
    errorPrefix: 'Błąd: ',
    connectionError: 'Nie udało się połączyć z serwerem. Spróbuj ponownie później.',
  },

  // Submission Success
  success: {
    title: 'Zgłoszenie wysłane',
    messageSent: 'Zgłoszenie zostało wysłane poprawnie.',
    submissionNumber: 'Numer zgłoszenia:',
    contactSoon: 'Wkrótce skontaktuje się z Tobą nasze biuro projektowe.',
    emailInfo: 'Na wskazany adres e-mail otrzymasz również wzór umowy do podpisania.',
    spamNote: 'Jeśli nie otrzymasz wiadomości w ciągu kilku minut, sprawdź folder spam.',
    consultThanks: 'Dziękujemy — Twoje zgłoszenie konsultacji zostało przyjęte. Wkrótce oddzwonimy.',
  },

  // About (O nas)
  about: {
    title: 'Projekt na CITO',
    description: 'Projekt na CITO to studio projektowe prowadzone przez Klaudię Kołakowską – architektkę wnętrz, absolwentkę ASP w Warszawie, oraz Angelikę Kłos – mgr inż. budownictwa. Naszą specjalnością jest Pakiet na CITO – szybki i kompleksowy projekt wnętrza online, dopasowany do budżetu i potrzeb, tworzony w krótkim czasie. Dla osób oczekujących pełniejszej obsługi oferujemy Pakiet Premium – z inwentaryzacją, rysunkami wykonawczymi i możliwością nadzoru autorskiego. Każdy detal ma dla nas znaczenie, bo wierzymy, że najlepsze wnętrza powstają tam, gdzie funkcjonalność spotyka estetykę. Realizujemy projekty w Polsce i za granicą – online. Stworzyłyśmy już dziesiątki aranżacji prezentowanych w mediach społecznościowych.',
    seeOffer: 'Poznaj ofertę',
    goBack: 'Wróć',
  },

  // Offer Overview
  offerOverview: {
    headline: 'Proces',
    headlineAccent: 'projektowy',
    intro: 'Nasze pakiety projektowe możesz dobrać do własnych potrzeb – od szybkiego projektu, przez pełną obsługę i wsparcie.',
    // stages removed
    packagesTitle: 'Pakiety',
    // Cito package
    citoTitle: 'Cito',
    citoIntro: 'Każdy powinien móc mieszkać w pięknym, funkcjonalnym i dostosowanym do jego potrzeb wnętrzu, dlatego powstał Projekt na CITO.\nW jego skład wchodzi wszystko, co niezbędne do zrealizowania projektu wnętrza:',
    citoItems: [
      { title: 'Układ funkcjonalny', desc: 'Rzut z propozycją układu elementów we wnętrzu.' },
      { title: 'Aranżacja', desc: 'Model 3D prezentujący proponowane rozwiązania estetyczne.' },
      { title: 'Zestawienie materiałów i sprzętów', desc: 'Lista konkretnych materiałów z ich cenami i linkami do sklepów.' },
      { title: 'Wizualizacje', desc: 'Fotorealistyczne przedstawienie wnętrza.' },
      { title: 'Schemat meblowy', desc: 'Rzuty i przekroje mebli z ich podstawowymi wymiarami.' },
      { title: 'Oferty od wykonawców', desc: 'Oferta od np. stolarza, budowlańca, instalatora klimatyzacji na zastosowane w projekcie rozwiązania.' },
    ],
    citoNote: 'Do rozpoczęcia pracy potrzebujemy rzutu/rysunku z obmiarem projektowanej przestrzeni oraz Twoich wytycznych i inspiracji do projektu.',
    citoCost: 'Koszt projektu to 500 zł za pomieszczenie o jednej funkcji.',
    citoCta: 'Oblicz wycenę',
    // Premium package
    premiumTitle: 'Premium',
    premiumIntro: 'Chcesz cieszyć się realizacją projektu Twojego wymarzonego wnętrza pod czujnym okiem inżyniera budowy i architekta wnętrz? Projekt rozszerzony jest dla Ciebie!\nW jego skład wchodzi:',
    premiumItems: [
      { title: 'Inwentaryzacja', desc: 'Pomiary całej projektowanej części.' },
      { title: 'Układ funkcjonalny', desc: 'Rzut z propozycją układu elementów we wnętrzu.' },
      { title: 'Aranżacja', desc: 'Model 3D prezentujący proponowane rozwiązania estetyczne.' },
      { title: 'Zestawienie materiałów i sprzętów', desc: 'Lista konkretnych materiałów z ich cenami i linkami do sklepów.' },
      { title: 'Wizualizacje', desc: 'Fotorealistyczne przedstawienie wnętrza.' },
      { title: 'Projekt meblowy', desc: 'Kompletny projekt zabudowy meblowej.' },
      { title: 'Projekt wykonawczy', desc: 'Rzuty podłóg i sufitów, rzuty instalacji wod-kan, rzuty instalacji elektrycznej, wentylacji, CO oraz rysunki detali.' },
      { title: 'Oferty od wykonawców', desc: 'Oferta od np. stolarza, budowlańca, instalatora na zastosowane w projekcie rozwiązania.' },
      { title: 'Nadzór autorski', desc: 'Pilnowanie przebiegu prac projektowych i ich zgodności z projektem, kontrolowanie zamówień, oglądanie i wybieranie elementów wyposażenia.' },
    ],
    premiumCost: 'Koszt tego opracowania to 150 zł za m² projektowanej powierzchni.\nKuchnia i łazienka liczona każda za 2500zł.\nNadzór wyceniany jest indywidualnie zależnie od jego zakresu i rozliczany stawką godzinową.',
    premiumCta: 'Oblicz wycenę',
    // Consult package
    consultTitle: 'Konsultacja',
    consultIntro: 'Jeżeli potrzebujesz szybkiej i kompleksowej porady, to konsultacja jest rozwiązaniem dla Ciebie.\nMoże ona polegać na:',
    consultItems: [
      { title: 'Analizie układu funkcjonalnego', desc: 'Proponowanie ustawienia elementów wyposażenia we wnętrzu.' },
      { title: 'Planowaniu zmian lokatorskich', desc: 'Dokonywanie zmian w projekcie przedstawionym przez dewelopera przed oddaniem mieszkania.' },
      { title: 'Sprawdzaniu wykonalności projektu', desc: 'Weryfikacja rozwiązań pod względem realności wykonania i kosztu.' },
      { title: 'Porównywaniu ustawności mieszkań', desc: 'Porównanie mieszkań przed zakupem.' },
      { title: 'Inne', desc: 'Chętnie podzielimy się naszą wiedzą i doświadczeniem w zakresie projektowania wnętrz i realizacji założeń projektowych.' },
    ],
    consultCost: 'Koszt tej usługi to 250 zł za godzinę konsultacji.',
    consultCta: 'Umów się',
  },

  // Footer
  footer: {
    contactHint: 'Masz pytanie? Skontaktuj się szybko.',
    contact: 'Kontakt',
    klaudia: 'Klaudia: 698 354 726',
    angelika: 'Angelika: 697 909 309',
  },

  // Accessibility / aria labels
  aria: {
    openInstagram: 'Open Instagram',
    openFacebook: 'Open Facebook',
    callKlaudia: 'Zadzwoń do Klaudii',
    callAngelika: 'Zadzwoń do Angeliki',
    logoAlt: 'Projekt na Cito logo',
    aboutImageAlt: 'O nas',
  },
}

export type Translations = typeof pl
