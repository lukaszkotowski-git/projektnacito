export type ViewType = 'main' | 'offer-overview' | 'cito-config' | 'premium-config' | 'consult-config' | 'final-step' | 'onas' | 'realizacje' | 'success' | 'faq'

export type PackageType = 'cito' | 'premium' | 'consult'

export interface CitoDetails {
  rooms: Record<string, number>
  electricProject: boolean
  electricM2: number
  furnitureProject?: boolean
  plumbingProject?: boolean
}

export interface PremiumDetails {
  totalM2: number
  // Legacy aggregated fields (kept for backward compatibility with n8n/workflows)
  kitchenM2?: number
  bathM2?: number
  kitchenCount?: number
  bathCount?: number
  // New per-unit arrays
  kitchenAreas?: number[]
  bathAreas?: number[]
}

export interface SubmissionData {
  packageType: PackageType
  userName: string
  userPhone: string
  estimatedPrice?: number
  rate?: string
  details?: CitoDetails | PremiumDetails
}
