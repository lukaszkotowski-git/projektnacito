import { AppProvider, useAppContext } from './context/AppContext'
import { NotificationProvider } from './components/notifications'
import { Navigation, MainView, OfferOverview, CitoConfigurator, PremiumConfigurator, ConsultConfigurator, FinalStep } from './components'

function AppContent() {
  const { currentView } = useAppContext()

  return (
    <>
      <Navigation />
      {currentView === 'main' && <MainView />}
      {currentView === 'cito-config' && <CitoConfigurator />}
      {currentView === 'premium-config' && <PremiumConfigurator />}
      {currentView === 'consult-config' && <ConsultConfigurator />}
      {currentView === 'final-step' && <FinalStep />}
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
