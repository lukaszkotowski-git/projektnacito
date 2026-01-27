import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { RealizacjeList } from '../pages/RealizacjeList'
import { RealizacjaDetail } from '../pages/RealizacjaDetail'

export function Realizacje(): JSX.Element {
  const { setCurrentView } = useAppContext()
  const [activeRealizationId, setActiveRealizationId] = useState<string | null>(null)

  const handleSelectRealization = (id: string) => {
    setActiveRealizationId(id)
    window.scrollTo(0, 0)
  }

  const handleBackToList = () => {
    setActiveRealizationId(null)
    window.scrollTo(0, 0)
  }

  const handleBackToMain = () => {
    setCurrentView('main')
    window.scrollTo(0, 0)
  }

  return (
    <main className="pt-32 pb-24 min-h-screen bg-neutral-50">
      <section className="max-w-7xl mx-auto px-6">
        {activeRealizationId ? (
          <RealizacjaDetail 
            id={activeRealizationId} 
            onBack={handleBackToList} 
          />
        ) : (
          <RealizacjeList 
            onSelect={handleSelectRealization} 
            onBack={handleBackToMain} 
          />
        )}
      </section>
    </main>
  )
}
