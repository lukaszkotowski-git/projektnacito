import { Footer } from './components/Footer'
import { AppProvider, useAppContext } from './context/AppContext'
import { NotificationProvider } from './components/notifications'
import { Navigation, MainView, OfferOverview, CitoConfigurator, PremiumConfigurator, ConsultConfigurator, FinalStep, ONas, Realizacje } from './components'
import SubmissionSuccess from './components/SubmissionSuccess'
import { useEffect } from 'react'

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
          {currentView === 'main' && <MainView />}
          {currentView === 'offer-overview' && <OfferOverview />}
          {currentView === 'cito-config' && <CitoConfigurator />}
          {currentView === 'premium-config' && <PremiumConfigurator />}
          {currentView === 'consult-config' && <ConsultConfigurator />}
          {currentView === 'final-step' && <FinalStep />}
          {currentView === 'onas' && <ONas />}
          {currentView === 'realizacje' && <Realizacje />}
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    <NotificationProvider>
      <AppProvider>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <AppContent />
          </main>
          <Footer />
        </div>
      </AppProvider>
    </NotificationProvider>
  )
}
