import { useAppContext } from '../context/AppContext'

export default function SubmissionSuccess() {
  const { lastSubmissionId, setCurrentView } = useAppContext()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">Zgłoszenie wysłane</h2>
        
        <div className="space-y-4 mb-10">
          <p className="text-xl">
            Zgłoszenie zostało wysłane poprawnie.
            {lastSubmissionId && (
              <span className="block mt-2 font-medium">
                Numer zgłoszenia: {lastSubmissionId}
              </span>
            )}
          </p>
          <p className="text-gray-600">
            Wkrótce skontaktuje się z Tobą nasze biuro projektowe.
          </p>
          <p className="text-gray-600">
            Na wskazany adres e-mail otrzymasz również wzór umowy do podpisania.<br />
            Jeśli nie otrzymasz wiadomości w ciągu kilku minut, sprawdź folder spam.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('main')}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
        >
          Powrót do strony głównej
        </button>
      </div>
    </div>
  )
}
