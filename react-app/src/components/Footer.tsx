export function Footer(): JSX.Element {
  return (
    <footer className="w-full bg-[#FDFBF7] text-[#8C7E6A] border-t border-[#E5DED4] py-4 text-sm font-serif">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-2 md:gap-3">
        {/* First line: subtle hint, centered */}
        <p className="text-center text-xs text-[#6B7280]">Masz pytanie? Skontaktuj się szybko.</p>

        {/* Second line: Kontakt label + numbers */}
        <div className="w-full flex items-center justify-center gap-6 md:gap-10 pt-2">
          <span className="font-semibold">Kontakt</span>
          <a href="tel:+48698354726" aria-label="Call Klaudia Kołakowska" className="hover:text-[#7A6C58]">Klaudia: 698 354 726</a>
          <span className="hidden md:inline">|</span>
          <a href="tel:+48697909309" aria-label="Call Angelika Kłos" className="hover:text-[#7A6C58]">Angelika: 697 909 309</a>
        </div>
      </div>
    </footer>
  );
}
