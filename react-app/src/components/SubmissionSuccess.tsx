import { useAppContext } from '../context/AppContext'
import { t } from '../i18n'

export default function SubmissionSuccess() {
  const { lastSubmissionId, setCurrentView, currentPackage } = useAppContext()
  const txt = t()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">{txt.success.title}</h2>
        
        <div className="space-y-4 mb-10">
          <p className="text-xl">
            {txt.success.messageSent}
            {currentPackage !== 'consult' && lastSubmissionId && (
              <span className="block mt-2 font-medium">
                {txt.success.submissionNumber} {lastSubmissionId}
              </span>
            )}
          </p>
          {currentPackage !== 'consult' ? (
            <>
              <p className="text-gray-600">
                {txt.success.contactSoon}
              </p>
              <p className="text-gray-600">
                {txt.success.emailInfo}<br />
                {txt.success.spamNote}
              </p>
            </>
          ) : (
            <p className="text-gray-600">{txt.success.consultThanks}</p>
          )}
        </div>

        <button
          onClick={() => setCurrentView('main')}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
        >
          {txt.common.backToHome}
        </button>
      </div>
    </div>
  )
}
