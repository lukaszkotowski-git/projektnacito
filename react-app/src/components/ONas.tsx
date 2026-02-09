import { useAppContext } from '../context/AppContext'
import { t } from '../i18n'

export function ONas(): JSX.Element {
  const { /* setCurrentView */ } = useAppContext()
  const txt = t()

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#8C7E6A]">{txt.about.title}</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{txt.about.description}</p>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="w-full max-w-[420px] transform transition duration-500 hover:scale-105">
              <img 
                src="/onas/onas.png" 
                alt={txt.aria.aboutImageAlt} 
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-lg object-cover" 
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
