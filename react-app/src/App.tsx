import { AppProvider, useAppContext } from './context/AppContext'
import { Navigation, MainView, CitoConfigurator, PremiumConfigurator, ConsultConfigurator, FinalStep } from './components'

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
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
