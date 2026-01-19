import React from "react";

export function Footer(): JSX.Element {
  return (
    <footer className="w-full bg-[#FDFBF7] text-[#8C7E6A] border-t border-[#E5DED4] py-4 text-sm font-serif">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-6 md:gap-10">
        <span className="font-semibold">Kontakt</span>
        <a href="tel:+48698354726" aria-label="Call Klaudia Kołakowska" className="hover:text-[#7A6C58]">Klaudia: 698 354 726</a>
        <span className="hidden md:inline">|</span>
        <a href="tel:+48697909309" aria-label="Call Angelika Kłos" className="hover:text-[#7A6C58]">Angelika: 697 909 309</a>
      </div>
    </footer>
  );
}
