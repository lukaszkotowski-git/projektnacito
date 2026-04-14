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
    checkPackagesBanner: '* Szczegóły pakietów znajdziesz w zakładce',
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
    plumbingDesc: 'Określa rozmieszczenie punktów wodnych i kanalizacyjnych.',
    plumbingAreaLabel: 'POWIERZCHNIA PROJEKTU (M²)',
    plumbingAreaHelp: 'Wprowadź powierzchnię w m²',
    plumbingAreaError: 'Wprowadź poprawną powierzchnię projektu (więcej niż 0 m²)',
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
    additionalWorkLabel: '',
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
    emailLabel: 'Adres e-mail',
    emailPlaceholder: 'np. imie@domena.pl',
    notesLabel: 'Opisz temat konsultacji',
    notesPlaceholder: 'Opcjonalne informacje dla konsultanta...',
    suggestedDateLabel: 'Sugerowana data kontaktu',
    suggestedDatePlaceholder: 'Wybierz datę kontaktu',
    suggestedHourLabel: 'Sugerowana godzina kontaktu',
    suggestedHourPlaceholder: 'Wprowadź godzinę i minuty',
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
    // premiumIntro removed per request
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
    validation_totalAreaRequired: 'Wprowadź powierzchnię całkowitą.',
    validation_kitchenRequired: 'Wprowadź przynajmniej jedną kuchnię o dodatniej powierzchni.',
    validation_bathRequired: 'Wprowadź przynajmniej jedną łazienkę o dodatniej powierzchni.',
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
    project: 'Projekt i realizacja www ',
    siteAuthor: ' @Łukasz Kotowski',
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

  // Privacy Policy
  privacyPolicy: {
    title: 'Polityka Prywatności',
    lastUpdated: 'Ostatnia aktualizacja: 8 kwietnia 2026 r.',
    intro: 'Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników serwisu internetowego projektnacito.pl, prowadzonego przez studio projektowe „Projekt na Cito".',
    sections: [
      {
        heading: '1. Administrator danych osobowych',
        content: 'Administratorem danych osobowych jest studio projektowe „Projekt na Cito" prowadzone przez Klaudię Kołakowską i Angelikę Kłos. Kontakt z administratorem możliwy jest telefonicznie pod numerami: 698 354 726 (Klaudia) oraz 697 909 309 (Angelika).',
      },
      {
        heading: '2. Zakres zbieranych danych',
        content: 'W ramach korzystania z serwisu możemy zbierać następujące dane osobowe:\n• Imię i nazwisko — w celu identyfikacji klienta.\n• Adres e-mail — w celu komunikacji i przesyłania dokumentów.\n• Numer telefonu — w celu kontaktu zwrotnego.\n• Pliki załączone do formularzy (rzuty, rysunki) — w celu realizacji usługi projektowej.\n• Treść wiadomości w czacie z asystentem AI — w celu udzielenia odpowiedzi na pytania.',
      },
      {
        heading: '3. Cel przetwarzania danych',
        content: 'Dane osobowe przetwarzane są w celu:\n• Realizacji usług projektowych (na podstawie art. 6 ust. 1 lit. b RODO).\n• Kontaktu zwrotnego w odpowiedzi na zgłoszenie (na podstawie art. 6 ust. 1 lit. f RODO).\n• Przesyłania wycen i dokumentów umów (na podstawie art. 6 ust. 1 lit. b RODO).\n• Ewentualnego dochodzenia roszczeń (na podstawie art. 6 ust. 1 lit. f RODO).',
      },
      {
        heading: '4. Okres przechowywania danych',
        content: 'Dane osobowe przechowywane są przez okres niezbędny do realizacji usługi, a następnie przez okres wymagany przepisami prawa (w szczególności przepisami podatkowymi i rachunkowymi) lub do czasu przedawnienia ewentualnych roszczeń.',
      },
      {
        heading: '5. Udostępnianie danych',
        content: 'Dane osobowe mogą być udostępniane:\n• Podwykonawcom i współpracownikom biorącym udział w realizacji projektu.\n• Dostawcom usług IT (hosting, poczta e-mail).\n• Organom publicznym, jeżeli wynika to z obowiązujących przepisów prawa.\n\nDane nie są przekazywane do państw trzecich.',
      },
      {
        heading: '6. Prawa użytkownika',
        content: 'Każdy użytkownik ma prawo do:\n• Dostępu do swoich danych osobowych.\n• Sprostowania nieprawidłowych danych.\n• Usunięcia danych („prawo do bycia zapomnianym").\n• Ograniczenia przetwarzania.\n• Przenoszenia danych.\n• Wniesienia sprzeciwu wobec przetwarzania.\n• Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.\n\nW celu realizacji powyższych praw prosimy o kontakt telefoniczny.',
      },
      {
        heading: '7. Pliki cookies',
        content: 'Serwis może wykorzystywać pliki cookies w celu zapewnienia prawidłowego działania strony i analizy ruchu. Użytkownik może w każdej chwili zmienić ustawienia cookies w swojej przeglądarce internetowej.',
      },
      {
        heading: '8. Bezpieczeństwo danych',
        content: 'Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed nieuprawnionym dostępem, utratą lub zniszczeniem.',
      },
      {
        heading: '9. Zmiany polityki prywatności',
        content: 'Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. O wszelkich istotnych zmianach użytkownicy zostaną poinformowani za pośrednictwem serwisu.',
      },
    ],
  },

  // Terms of Service
  termsOfService: {
    title: 'Regulamin Serwisu',
    lastUpdated: 'Ostatnia aktualizacja: 8 kwietnia 2026 r.',
    intro: 'Niniejszy regulamin określa zasady korzystania z serwisu internetowego projektnacito.pl oraz świadczenia usług drogą elektroniczną przez studio projektowe „Projekt na Cito".',
    sections: [
      {
        heading: '1. Postanowienia ogólne',
        content: 'Serwis projektnacito.pl jest prowadzony przez studio projektowe „Projekt na Cito" (Klaudia Kołakowska i Angelika Kłos). Serwis umożliwia zapoznanie się z ofertą studia, konfigurację pakietów projektowych, przesyłanie zgłoszeń oraz kontakt z zespołem.',
      },
      {
        heading: '2. Definicje',
        content: '• Serwis — strona internetowa dostępna pod adresem projektnacito.pl.\n• Usługodawca — studio projektowe „Projekt na Cito".\n• Użytkownik — każda osoba korzystająca z serwisu.\n• Usługa — usługa projektowania wnętrz świadczona przez Usługodawcę.\n• Zgłoszenie — formularz wypełniony przez Użytkownika w celu zamówienia usługi lub konsultacji.',
      },
      {
        heading: '3. Zakres usług',
        content: 'Za pośrednictwem serwisu Usługodawca oferuje:\n• Pakiet na Cito — szybki projekt wnętrza online.\n• Pakiet Premium — kompleksowy projekt z inwentaryzacją i nadzorem autorskim.\n• Konsultacje — porada ekspercka online wyceniana godzinowo.\n\nSzczegółowy zakres każdego pakietu opisany jest na odpowiednich podstronach serwisu.',
      },
      {
        heading: '4. Składanie zgłoszeń',
        content: 'Wypełnienie formularza zgłoszeniowego w serwisie stanowi zapytanie ofertowe i nie jest równoznaczne z zawarciem umowy. Umowa o świadczenie usługi projektowej zawierana jest odrębnie, po ustaleniu szczegółów współpracy i podpisaniu stosownego dokumentu.',
      },
      {
        heading: '5. Ceny i płatności',
        content: 'Wszystkie ceny podane w serwisie są cenami netto (o ile nie zaznaczono inaczej). Ostateczna wycena usługi przekazywana jest Użytkownikowi po analizie zgłoszenia. Warunki płatności ustalane są indywidualnie w umowie.',
      },
      {
        heading: '6. Prawa autorskie',
        content: 'Wszelkie treści zamieszczone w serwisie, w tym teksty, grafiki, zdjęcia, wizualizacje i logotypy, stanowią własność intelektualną Usługodawcy i są chronione prawem autorskim. Kopiowanie, rozpowszechnianie lub wykorzystywanie tych treści bez pisemnej zgody Usługodawcy jest zabronione.',
      },
      {
        heading: '7. Odpowiedzialność',
        content: 'Usługodawca dokłada wszelkich starań, aby informacje zamieszczone w serwisie były aktualne i rzetelne. Usługodawca nie ponosi odpowiedzialności za:\n• Przerwy w dostępności serwisu wynikające z przyczyn technicznych.\n• Skutki podania przez Użytkownika nieprawdziwych lub niepełnych danych.\n• Działania osób trzecich naruszające funkcjonowanie serwisu.',
      },
      {
        heading: '8. Ochrona danych osobowych',
        content: 'Zasady przetwarzania danych osobowych użytkowników określa Polityka Prywatności dostępna w serwisie.',
      },
      {
        heading: '9. Reklamacje',
        content: 'Reklamacje dotyczące działania serwisu można zgłaszać telefonicznie. Reklamacje zostaną rozpatrzone w terminie 14 dni od ich otrzymania.',
      },
      {
        heading: '10. Postanowienia końcowe',
        content: 'Usługodawca zastrzega sobie prawo do zmiany niniejszego regulaminu. Korzystanie z serwisu po wprowadzeniu zmian oznacza ich akceptację. W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego.',
      },
    ],
  },

  // Footer links
  footerLinks: {
    privacyPolicy: 'Polityka prywatności',
    termsOfService: 'Regulamin',
  },

  // Chat assistant
  chat: {
    title: 'Asystent Projekt na Cito',
    welcome: 'Dzień dobry! Jestem wirtualnym asystentem AI "Projekt na Cito". Chętnie odpowiem na pytania dotyczące naszej oferty, pakietów projektowych i współpracy. W czym mogę pomóc?',
    placeholder: 'Napisz wiadomość...',
    send: 'Wyślij',
    typing: 'Asystent pisze...',
    errorGeneric: 'Wystąpił błąd. Spróbuj ponownie za chwilę.',
    errorRateLimit: 'Osiągnięto dzienny limit zapytań. Prosimy o kontakt telefoniczny.',
    errorNoKey: 'Usługa czatu jest tymczasowo niedostępna.',
  },
}

export type Translations = typeof pl
