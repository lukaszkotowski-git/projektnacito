import { useAppContext } from '../context/AppContext'
import { useState, useRef, useEffect } from 'react'

export function Navigation() {
  const { setCurrentView, resetState } = useAppContext()
  const [ofertaOpen, setOfertaOpen] = useState(false)
  const [dropdownOnasOpen, setDropdownOnasOpen] = useState(false)

  const ofertaTimeout = useRef<number | null>(null)
  const onasTimeout = useRef<number | null>(null)

  const goToMain = () => {
    resetState()
    setCurrentView('main')
  }

  return (
    <nav className="fixed w-full z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={goToMain}>
          <img
            src="/logo/logo.png"
            alt="Projekt na Cito logo"
            loading="lazy"
            className="h-6 md:h-7 w-auto mr-2 md:mr-3"
          />
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tighter uppercase font-serif">Projekt na Cito</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 -mt-1 font-medium">Klaudia & Angelika</span>
          </div>
        </div>
        <div className="flex space-x-6 md:space-x-8 text-sm font-medium uppercase tracking-wider items-center relative">
          <button onClick={goToMain} className="hover:text-gray-500 transition">Start</button>
          <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
          <div
            className="relative group"
            onMouseEnter={() => {
              if (onasTimeout.current) { window.clearTimeout(onasTimeout.current); onasTimeout.current = null }
              if (ofertaTimeout.current) { window.clearTimeout(ofertaTimeout.current); ofertaTimeout.current = null }
              setOfertaOpen(true); setDropdownOnasOpen(false);
            }}
            onMouseLeave={() => {
              if (ofertaTimeout.current) window.clearTimeout(ofertaTimeout.current)
              ofertaTimeout.current = window.setTimeout(() => setOfertaOpen(false), 150)
            } }
          >
            <button
              className="hover:text-gray-500 transition flex items-center"
              onClick={() => setOfertaOpen((v) => !v)}
            >
              Oferta
              <svg className="ml-1 w-3 h-3" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="#8C7E6A" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
    
            {(ofertaOpen) && (
              <div
                className="absolute mt-2 min-w-[180px] bg-white/90 backdrop-blur shadow-xl border border-[#E5DED4] rounded-lg py-2 flex flex-col text-[#8C7E6A] animate-dropdown z-40"
                onMouseEnter={() => {
                  if (ofertaTimeout.current) { window.clearTimeout(ofertaTimeout.current); ofertaTimeout.current = null }
                  setOfertaOpen(true)
                }}
                onMouseLeave={() => {
                  if (ofertaTimeout.current) window.clearTimeout(ofertaTimeout.current)
                  ofertaTimeout.current = window.setTimeout(() => setOfertaOpen(false), 150)
                }}
              >
               <button
                   onClick={() => setCurrentView('offer-overview')}
                   className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition"
                 >
                   Poznaj ofertę
                 </button>
                 <button
                   onClick={() => setCurrentView('realizacje')}
                   className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition"
                 >
                   Realizacje
                 </button>
                <button
                  onClick={() => setCurrentView('cito-config')}
                  className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition"
                >
                  Pakiet na Cito
                </button>
                <button
                  onClick={() => setCurrentView('premium-config')}
                  className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition"
                >
                  Pakiet Premium
                </button>
                <button
                  onClick={() => setCurrentView('consult-config')}
                  className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition"
                >
                  Konsultacje
                </button>
              </div>
            )}
          </div>
          <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
          <div className="relative group" style={{ minWidth: '80px' }}>
  <button
    onClick={() => setCurrentView('onas')}
    className="hover:text-gray-500 transition px-2 py-1"
    aria-label="O nas"
    onMouseEnter={() => {
      if (ofertaTimeout.current) { window.clearTimeout(ofertaTimeout.current); ofertaTimeout.current = null }
      if (onasTimeout.current) { window.clearTimeout(onasTimeout.current); onasTimeout.current = null }
      setDropdownOnasOpen(true); setOfertaOpen(false);
    }}
    onMouseLeave={() => {
      if (onasTimeout.current) window.clearTimeout(onasTimeout.current)
      onasTimeout.current = window.setTimeout(() => setDropdownOnasOpen(false), 150)
    }}
    onFocus={() => setDropdownOnasOpen(true)}
    onBlur={() => setDropdownOnasOpen(false)}
  >
    O nas
  </button>
      {(dropdownOnasOpen) && (
      <div
        className="absolute mt-2 min-w-[180px] bg-white/90 backdrop-blur shadow-xl border border-[#E5DED4] rounded-lg py-2 flex flex-col text-[#8C7E6A] animate-dropdown z-40"
        onMouseEnter={() => { if (onasTimeout.current) { window.clearTimeout(onasTimeout.current); onasTimeout.current = null } setDropdownOnasOpen(true) }}
        onMouseLeave={() => { if (onasTimeout.current) window.clearTimeout(onasTimeout.current); onasTimeout.current = window.setTimeout(() => setDropdownOnasOpen(false), 150) }}
      >
      <button
        onClick={() => { setCurrentView('onas'); setDropdownOnasOpen(false); }}
        className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition"
        aria-label="O nas"
      >
        O nas
      </button>
      <a
        href="tel:+48698354726"
        aria-label="Zadzwoń do Klaudii"
        className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition rounded flex items-center gap-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 5.5l2.75-2.75a2 2 0 0 1 2.83 0l2.17 2.17a2 2 0 0 1 0 2.83l-.95.95a1 1 0 0 0-.25 1.06c.63 1.72 1.98 3.07 3.7 3.7a1 1 0 0 0 1.06-.25l.95-.95a2 2 0 0 1 2.83 0l2.17 2.17a2 2 0 0 1 0 2.83l-2.75 2.75c-1.82 1.82-5.68.7-8.78-2.39C5.8 11.18 4.68 7.32 6.5 5.5z"/></svg>
        Klaudia
        <span className="sr-only">Zadzwoń do Klaudii</span>
      </a>
      <a
        href="tel:+48697909309"
        aria-label="Zadzwoń do Angeliki"
        className="px-5 py-2 text-left hover:bg-[#FDFBF7] transition rounded flex items-center gap-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 5.5l2.75-2.75a2 2 0 0 1 2.83 0l2.17 2.17a2 2 0 0 1 0 2.83l-.95.95a1 1 0 0 0-.25 1.06c.63 1.72 1.98 3.07 3.7 3.7a1 1 0 0 0 1.06-.25l.95-.95a2 2 0 0 1 2.83 0l2.17 2.17a2 2 0 0 1 0 2.83l-2.75 2.75c-1.82 1.82-5.68.7-8.78-2.39C5.8 11.18 4.68 7.32 6.5 5.5z"/></svg>
        Angelika
        <span className="sr-only">Zadzwoń do Angeliki</span>
      </a>
    </div>
  )}
</div>
           <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/projektna_cito/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram"
              className="hover:text-gray-500 transition flex items-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61552032200917"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Facebook"
              className="hover:text-gray-500 transition flex items-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>Facebook</title>
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.91 1.777-4.495 4.375-4.495 1.241 0 2.308.092 2.618.134v3.037l-1.798.001c-1.412 0-1.686.671-1.686 1.656v2.17h3.363l-.438 3.403h-2.925v8.74h6.007c.732 0 1.325-.593 1.325-1.325v-21.351c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

