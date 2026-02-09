import { Footer } from './components/Footer'
import { AppProvider, useAppContext } from './context/AppContext'
import { ThemeProvider } from './context/ThemeContext'
import { NotificationProvider } from './components/notifications'
import { Navigation, MainView, OfferOverview, CitoConfigurator, PremiumConfigurator, ConsultConfigurator, FinalStep, ONas, Realizacje, Faq } from './components'
import SubmissionSuccess from './components/SubmissionSuccess'
import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

function AppContent() {
  const { currentView } = useAppContext()

  useEffect(() => {
    // Smooth scroll to top whenever the view changes
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [currentView])

  return (
    <>
      {currentView === 'success' ? (
        <SubmissionSuccess />
      ) : (
        <>
          <Navigation />
          <RouteSync />
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/offer" element={<OfferOverview />} />
            <Route path="/offer/cito" element={<CitoConfigurator />} />
            <Route path="/offer/premium" element={<PremiumConfigurator />} />
            <Route path="/offer/consult" element={<ConsultConfigurator />} />
            <Route path="/final" element={<FinalStep />} />
            <Route path="/about" element={<ONas />} />
            <Route path="/realizacje" element={<Realizacje />} />
<Route path="/faq" element={<Faq />} />
            {/* legacy view-based fallback removed; RouteSync keeps internal view in sync */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </>
  )
}

function RouteSync() {
  const { setCurrentView } = useAppContext()
  const location = useLocation()

  const mapPathToView = (path: string) => {
    if (path.startsWith('/offer/cito')) return 'cito-config'
    if (path.startsWith('/offer/premium')) return 'premium-config'
    if (path.startsWith('/offer/consult')) return 'consult-config'
    if (path.startsWith('/offer')) return 'offer-overview'
    if (path.startsWith('/about')) return 'onas'
    if (path.startsWith('/realizacje')) return 'realizacje'
    if (path === '/' || path === '') return 'main'
    return 'main'
  }

  useEffect(() => {
    setCurrentView(mapPathToView(location.pathname))
  }, [location.pathname, setCurrentView])

  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#1a1a1a] transition-colors">
            <main className="flex-1">
              <AppContent />
            </main>
            <Footer />
          </div>
        </AppProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
