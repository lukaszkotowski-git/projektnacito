export type ViewType = 'main' | 'offer-overview' | 'cito-config' | 'premium-config' | 'consult-config' | 'final-step' | 'onas'

export type PackageType = 'cito' | 'premium' | 'consult'

export interface CitoDetails {
  rooms: Record<string, number>
  electricProject: boolean
  electricM2: number
}

export interface PremiumDetails {
  totalM2: number
  kitchenM2: number
  bathM2: number
}

export interface SubmissionData {
  packageType: PackageType
  userName: string
  userPhone: string
  estimatedPrice?: number
  rate?: string
  details?: CitoDetails | PremiumDetails
}
