import { createContext, useContext, useState, ReactNode } from 'react'
import { ViewType, PackageType, CitoDetails, PremiumDetails } from '../types'

interface AppState {
  currentView: ViewType
  setCurrentView: (view: ViewType) => void
  currentPackage: PackageType | null
  setCurrentPackage: (pkg: PackageType | null) => void
  currentPrice: number
  setCurrentPrice: (price: number) => void
  selectedRoomsCito: Record<string, number>
  setSelectedRoomsCito: (rooms: Record<string, number>) => void

  // Cito / optional project flags
  electricProject: boolean
  setElectricProject: (val: boolean) => void
  electricM2: number
  setElectricM2: (val: number) => void
  furnitureProject: boolean
  setFurnitureProject: (val: boolean) => void
  plumbingProject: boolean
  setPlumbingProject: (val: boolean) => void

  // Premium package measurements
  premiumTotalM2: number
  setPremiumTotalM2: (val: number) => void
  premiumKitchenM2: number
  setPremiumKitchenM2: (val: number) => void
  premiumBathM2: number
  setPremiumBathM2: (val: number) => void

  lastSubmissionId: string | null
  setLastSubmissionId: (id: string | null) => void

  resetState: () => void
  getCitoDetails: () => CitoDetails
  getPremiumDetails: () => PremiumDetails
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>('main')
  const [currentPackage, setCurrentPackage] = useState<PackageType | null>(null)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [selectedRoomsCito, setSelectedRoomsCito] = useState<Record<string, number>>({})
  const [electricProject, setElectricProject] = useState(false)
  const [electricM2, setElectricM2] = useState(0)
  const [furnitureProject, setFurnitureProject] = useState(false)
  const [plumbingProject, setPlumbingProject] = useState(false)
  const [premiumTotalM2, setPremiumTotalM2] = useState(0)
  const [premiumKitchenM2, setPremiumKitchenM2] = useState(0)
  const [premiumBathM2, setPremiumBathM2] = useState(0)
  const [lastSubmissionId, setLastSubmissionId] = useState<string | null>(null)

    const resetState = () => {
      setSelectedRoomsCito({})
      setElectricProject(false)
      setElectricM2(0)
      setFurnitureProject(false)
      setPlumbingProject(false)
      setPremiumTotalM2(0)
      setPremiumKitchenM2(0)
      setPremiumBathM2(0)
    setCurrentPrice(0)
    setCurrentPackage(null)
  }

  const getCitoDetails = (): CitoDetails => ({
    rooms: selectedRoomsCito,
    electricProject,
    electricM2
    ,
    furnitureProject,
    plumbingProject
  })

  const getPremiumDetails = (): PremiumDetails => ({
    totalM2: premiumTotalM2,
    kitchenM2: premiumKitchenM2,
    bathM2: premiumBathM2
  })

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView,
      currentPackage, setCurrentPackage,
      currentPrice, setCurrentPrice,
      selectedRoomsCito, setSelectedRoomsCito,
      electricProject, setElectricProject,
      electricM2, setElectricM2,
      furnitureProject, setFurnitureProject,
      plumbingProject, setPlumbingProject,
      premiumTotalM2, setPremiumTotalM2,
      premiumKitchenM2, setPremiumKitchenM2,
      premiumBathM2, setPremiumBathM2,
      lastSubmissionId, setLastSubmissionId,
      resetState,
      getCitoDetails,
      getPremiumDetails
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
