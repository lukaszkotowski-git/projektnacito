import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { t } from '../i18n'

export function ONas(): JSX.Element {
  const { setCurrentView } = useAppContext()
  const navigate = useNavigate()
  const txt = t()

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#8C7E6A]">{txt.about.title}</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{txt.about.description}</p>
              <div className="flex gap-4">
                <button onClick={() => { setCurrentView('offer-overview'); navigate('/offer') }} className="px-6 py-3 bg-[#8C7E6A] text-white rounded-md uppercase text-sm tracking-wider hover:bg-[#7A6C58] transition">{txt.about.seeOffer}</button>
                <button onClick={() => { setCurrentView('main'); navigate('/') }} className="px-6 py-3 border border-[#E5DED4] rounded-md uppercase text-sm tracking-wider hover:bg-gray-50 transition">{txt.about.goBack}</button>
              </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="w-full max-w-[420px] transform transition duration-500 hover:scale-105">
              <img src="/onas/onas.png" alt={txt.aria.aboutImageAlt} className="w-full h-auto rounded-2xl shadow-lg object-cover" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
