export interface FreemiumLimits {
  resumeReviews: number
  mockInterviews: number
  basicTemplates: boolean
  exportFormats: string[]
}

export interface PremiumFeatures {
  unlimitedReviews: boolean
  aiCoaching: boolean
  salaryNegotiation: boolean
  prioritySupport: boolean
  exportFormats: string[]
}

export interface UserTier {
  type: 'free' | 'premium'
  limits: FreemiumLimits
  features: PremiumFeatures
  trialDays?: number
}

export const FREE_TIER: UserTier = {
  type: 'free',
  limits: {
    resumeReviews: 3,
    mockInterviews: 1,
    basicTemplates: true,
    exportFormats: ['pdf']
  },
  features: {
    unlimitedReviews: false,
    aiCoaching: false,
    salaryNegotiation: false,
    prioritySupport: false,
    exportFormats: ['pdf']
  },
  trialDays: 7
}

export const PREMIUM_TIER: UserTier = {
  type: 'premium',
  limits: {
    resumeReviews: Infinity,
    mockInterviews: Infinity,
    basicTemplates: true,
    exportFormats: ['pdf', 'docx', 'json']
  },
  features: {
    unlimitedReviews: true,
    aiCoaching: true,
    salaryNegotiation: true,
    prioritySupport: true,
    exportFormats: ['pdf', 'docx', 'json']
  }
}

export class TierManager {
  private currentTier: UserTier
  private usage: Record<string, number> = {}
  
  constructor() {
    this.currentTier = FREE_TIER
    this.resetUsage()
  }
  
  getCurrentTier(): UserTier {
    return this.currentTier
  }
  
  canUseFeature(feature: string): boolean {
    if (this.currentTier.type === 'premium') return true
    
    const usage = this.usage[feature] || 0
    const limit = this.currentTier.limits[feature as keyof FreemiumLimits]
    
    if (typeof limit === 'number') {
      return usage < limit
    }
    
    return Boolean(limit)
  }
  
  incrementUsage(feature: string): void {
    this.usage[feature] = (this.usage[feature] || 0) + 1
  }
  
  getRemainingUsage(feature: string): number {
    if (this.currentTier.type === 'premium') return Infinity
    
    const usage = this.usage[feature] || 0
    const limit = this.currentTier.limits[feature as keyof FreemiumLimits]
    
    if (typeof limit === 'number') {
      return Math.max(0, limit - usage)
    }
    
    // For boolean features, return 1 if available, 0 if not
    return limit === true ? 1 : 0
  }
  
  upgradeToPremium(): void {
    this.currentTier = PREMIUM_TIER
  }
  
  resetUsage(): void {
    this.usage = {}
  }
}

export const tierManager = new TierManager()