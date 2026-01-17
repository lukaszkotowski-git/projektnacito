import { useAppContext } from '../context/AppContext'

export function Navigation() {
  const { setCurrentView, resetState } = useAppContext()

  const goToMain = () => {
    resetState()
    setCurrentView('main')
  }

  return (
    <nav className="fixed w-full z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex flex-col cursor-pointer" onClick={goToMain}>
          <span className="text-xl font-semibold tracking-tighter uppercase font-serif">Projekt na Cito</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 -mt-1 font-medium">Klaudia & Angelika</span>
        </div>
        <div className="flex space-x-6 md:space-x-8 text-sm font-medium uppercase tracking-wider items-center">
          <button onClick={goToMain} className="hover:text-gray-500 transition">Start</button>
          <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/projektna_cito/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition" title="Instagram">
              <span className="hidden md:inline">Instagram</span>
              <svg className="w-5 h-5 md:hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61552032200917" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition" title="Facebook">
              <span className="hidden md:inline">Facebook</span>
              <svg className="w-5 h-5 md:hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.91 1.777-4.495 4.375-4.495 1.241 0 2.308.092 2.618.134v3.037l-1.798.001c-1.412 0-1.686.671-1.686 1.656v2.17h3.363l-.438 3.403h-2.925v8.74h6.007c.732 0 1.325-.593 1.325-1.325v-21.351c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
