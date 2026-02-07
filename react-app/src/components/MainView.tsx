import { useNavigate } from 'react-router-dom'
import RealizacjeCarousel from './RealizacjeCarousel'
import { t } from '../i18n'

export function MainView() {
  const navigate = useNavigate()
  const txt = t()

  const handleChoice = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="pt-32 pb-24">
      <section className="px-6 text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-serif mb-8 fade-in visible">
          {txt.main.headline} <br /><span className="italic text-[#8C7E6A]">{txt.main.headlineAccent}</span>
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div onClick={() => handleChoice('/offer/cito')} className="card-choice relative overflow-hidden p-10 rounded-[2.5rem] cursor-pointer text-left group">
              <h3 className="text-3xl font-serif mb-4">{txt.main.citoTitle}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">{txt.main.citoDesc}</p>
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">
              {txt.main.citoCta} <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>

          <div onClick={() => handleChoice('/offer/premium')} className="card-choice p-10 rounded-[2.5rem] cursor-pointer text-left group">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7E6A] mb-6">{txt.main.premiumTag}</div>
            <h3 className="text-3xl font-serif mb-4">{txt.main.premiumTitle}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">{txt.main.premiumDesc}</p>
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">
              {txt.main.premiumCta} <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>

          <div onClick={() => handleChoice('/offer/consult')} className="card-choice p-10 rounded-[2.5rem] cursor-pointer text-left group">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7E6A] mb-6">{txt.main.consultTag}</div>
            <h3 className="text-3xl font-serif mb-4">{txt.main.consultTitle}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">{txt.main.consultDesc}</p>
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">
              {txt.main.consultCta} <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </div>
      </section>

      {/* Subtle one-line info + CTA (centered, single line) */}
      <section className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 whitespace-nowrap">
            <span className="text-sm text-gray-600 uppercase tracking-widest">{txt.main.checkPackagesBanner}</span>
            <a href="/offer" aria-label="Przejdź do oferty" className="text-[#8C7E6A] font-semibold uppercase text-sm">{txt.nav.offer} →</a>
          </div>
        </div>
      </section>

      {/* Carousel inserted under packages */}
      <RealizacjeCarousel />
    </main>
  )
}
