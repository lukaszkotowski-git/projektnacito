import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { t } from '../i18n'

export function OfferOverview() {
  const { setCurrentView } = useAppContext()
  const navigate = useNavigate()
  const txt = t()

  const handlePackageClick = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-6xl mx-auto px-6 text-left">
        <h1 className="text-5xl md:text-6xl font-serif mb-12 text-center">
          {txt.offerOverview.headline} <span className="italic text-[#8C7E6A]">{txt.offerOverview.headlineAccent}</span>
        </h1>
        {/* Top intro removed as requested */}


        {/* Stages timeline removed as requested */}


        <div className="mb-14">
          <h2 className="text-3xl font-serif mb-8 text-center text-[#8C7E6A]">{txt.offerOverview.packagesTitle}</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">

            <div 
              onClick={() => handlePackageClick('/offer/cito')}
              className="flex-1 min-w-[280px] bg-white/95 rounded-2xl shadow-xl p-8 animate-slideIn cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="text-[10px] uppercase tracking-widest font-bold text-[#8C7E6A] mb-2">{txt.main.citoTag}</div>
              <div className="text-xl font-bold text-[#8C7E6A] mb-3">{txt.offerOverview.citoTitle}</div>
              <p className="mb-4 text-gray-700 whitespace-pre-line">{txt.offerOverview.citoIntro}</p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-base mb-2">
                {txt.offerOverview.citoItems.map((item, idx) => (
                  <li key={idx}><b>{item.title}</b><br/>{item.desc}</li>
                ))}
              </ol>
              <p className="mt-2 text-gray-600 text-sm">{txt.offerOverview.citoNote}</p>
              <div className="font-bold text-[#8C7E6A] text-lg mt-2">{txt.offerOverview.citoCost}</div>
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center text-[#8C7E6A]">
                {txt.offerOverview.citoCta} <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>

            <div 
              onClick={() => handlePackageClick('/offer/premium')}
              className="flex-1 min-w-[280px] bg-white/95 rounded-2xl shadow-xl p-8 animate-slideIn cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group" style={{ animationDelay: '0.1s' }}
            >
              <div className="text-xl font-bold text-[#8C7E6A] mb-3">{txt.offerOverview.premiumTitle}</div>
              <p className="mb-4 text-gray-700 whitespace-pre-line">{txt.offerOverview.premiumIntro}</p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-base mb-2">
                {txt.offerOverview.premiumItems.map((item, idx) => (
                  <li key={idx}><b>{item.title}</b><br/>{item.desc}</li>
                ))}
              </ol>
              {/* Premium cost intentionally hidden on overview page */}
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center text-[#8C7E6A]">
                {txt.offerOverview.premiumCta} <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>

            <div 
              onClick={() => handlePackageClick('/offer/consult')}
              className="flex-1 min-w-[280px] bg-white/95 rounded-2xl shadow-xl p-8 animate-slideIn cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group" style={{ animationDelay: '0.15s' }}
            >
              <div className="text-xl font-bold text-[#8C7E6A] mb-3">{txt.offerOverview.consultTitle}</div>
              <p className="mb-4 text-gray-700 whitespace-pre-line">{txt.offerOverview.consultIntro}</p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-base mb-2">
                {txt.offerOverview.consultItems.map((item, idx) => (
                  <li key={idx}><b>{item.title}</b><br/>{item.desc}</li>
                ))}
              </ol>
              <div className="font-bold text-[#8C7E6A] text-lg mt-2">{txt.offerOverview.consultCost}</div>
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center text-[#8C7E6A]">
                {txt.offerOverview.consultCta} <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <button
            onClick={() => setCurrentView('main')}
            className="px-8 py-3 bg-[#8C7E6A] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#7A6C58] transition-colors"
          >
            {txt.common.backToHome}
          </button>
        </div>
      </section>
    </main>
  )
}
