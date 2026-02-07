import { t } from '../i18n'

export function Footer(): JSX.Element {
  const txt = t()
  return (
    <footer className="w-full bg-[#FDFBF7] text-[#8C7E6A] border-t border-[#E5DED4] py-4 text-sm font-serif">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-2 md:gap-3">
        <p className="text-center text-xs text-[#6B7280]">{txt.footer.contactHint}</p>
        <div className="w-full flex items-center justify-center gap-6 md:gap-10 pt-2">
          <span className="font-semibold">{txt.footer.contact}</span>
          <a href="tel:+48698354726" aria-label={txt.aria.callKlaudia} className="hover:text-[#7A6C58]">{txt.footer.klaudia}</a>
          <span className="hidden md:inline">|</span>
          <a href="tel:+48697909309" aria-label={txt.aria.callAngelika} className="hover:text-[#7A6C58]">{txt.footer.angelika}</a>
        </div>
        <div className="w-full flex items-center justify-center gap-2 md:gap-2 pt-2">
          <span className="font-semibold">{txt.footer.project}</span>
          <a href="mailto:lukasz.kotowski@icloud.com" className="text-xs text-[#6B7280] hover:text-[#7A6C58]"> {txt.footer.siteAuthor}</a>
        </div>
      </div>
    </footer>
  );
}
