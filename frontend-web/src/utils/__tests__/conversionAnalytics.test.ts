import { describe, it, expect, beforeEach } from 'vitest'
import { analytics } from '../conversionAnalytics'

describe('conversionAnalytics', () => {
  beforeEach(() => {
    analytics.reset()
  })
  
  it('should track free trial starts', () => {
    analytics.track('free_trial_start', { userType: 'candidate' })
    const events = analytics.getUserJourney()
    
    expect(events).toHaveLength(1)
    expect(events[0].event).toBe('free_trial_start')
    expect(events[0].metadata?.userType).toBe('candidate')
  })
  
  it('should track feature limit reached', () => {
    analytics.track('feature_limit_reached', { feature: 'resume_review', limit: 3 })
    const rate = analytics.getConversionRate('feature_limit_reached')
    
    expect(rate).toBe(1)
  })
  
  it('should calculate conversion rates correctly', () => {
    analytics.track('free_trial_start')
    analytics.track('free_trial_start')
    analytics.track('premium_upgrade')
    
    const trialRate = analytics.getConversionRate('free_trial_start')
    const upgradeRate = analytics.getConversionRate('premium_upgrade')
    
    expect(trialRate).toBe(2/3)
    expect(upgradeRate).toBe(1/3)
  })
  
  it('should maintain event chronology', () => {
    analytics.track('free_trial_start')
    analytics.track('feature_limit_reached')
    analytics.track('premium_upgrade')
    
    const journey = analytics.getUserJourney()
    
    expect(journey[0].event).toBe('free_trial_start')
    expect(journey[1].event).toBe('feature_limit_reached')
    expect(journey[2].event).toBe('premium_upgrade')
  })
})