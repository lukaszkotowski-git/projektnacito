import { AppProvider, useAppContext } from './context/AppContext'
import { NotificationProvider } from './components/notifications'
import { Navigation, MainView, OfferOverview, CitoConfigurator, PremiumConfigurator, ConsultConfigurator, FinalStep, ONas } from './components'

function AppContent() {
  const { currentView } = useAppContext()

  return (
    <>
      <Navigation />
      {currentView === 'main' && <MainView />}
      {currentView === 'offer-overview' && <OfferOverview />}
      {currentView === 'cito-config' && <CitoConfigurator />}
      {currentView === 'premium-config' && <PremiumConfigurator />}
      {currentView === 'consult-config' && <ConsultConfigurator />}
      {currentView === 'final-step' && <FinalStep />}
      {currentView === 'onas' && <ONas />}
    </>
  )
}

export default function App() {
  return (
    <NotificationProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </NotificationProvider>
  )
}
