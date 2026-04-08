import { t } from '../i18n'
import { Link } from 'react-router-dom'

export default function TermsOfService(): JSX.Element {
  const txt = t()

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <section className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#8C7E6A]">{txt.termsOfService.title}</h1>
        <p className="text-sm text-[#6B7280] mb-6">{txt.termsOfService.lastUpdated}</p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">{txt.termsOfService.intro}</p>

        {txt.termsOfService.sections.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-xl font-serif font-semibold text-[#8C7E6A] mb-3">{section.heading}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
          </div>
        ))}

        <div className="mt-12 pt-6 border-t border-[#E5DED4]">
          <Link to="/" className="text-[#8C7E6A] hover:text-[#7A6C58] font-serif">
            {txt.common.backToHome}
          </Link>
        </div>
      </section>
    </main>
  )
}
