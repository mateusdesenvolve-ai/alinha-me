"use client"

import { useState, useEffect } from 'react'
import type { PlanType, PlanFeatures } from '@/lib/plans'
import { PLAN_FEATURES, hasFeatureAccess, getFeatureValue } from '@/lib/plans'

export function usePlan() {
  const [userPlan, setUserPlan] = useState<PlanType>('free')

  useEffect(() => {
    // Carregar plano do localStorage
    const savedPlan = localStorage.getItem('userPlan') as PlanType | null
    if (savedPlan && ['free', 'pro', 'advanced'].includes(savedPlan)) {
      setUserPlan(savedPlan)
    }
  }, [])

  const updatePlan = (newPlan: PlanType) => {
    setUserPlan(newPlan)
    localStorage.setItem('userPlan', newPlan)
  }

  const hasAccess = (feature: keyof PlanFeatures): boolean => {
    return hasFeatureAccess(userPlan, feature)
  }

  const getFeature = (feature: keyof PlanFeatures): any => {
    return getFeatureValue(userPlan, feature)
  }

  const canAccessFeature = (feature: keyof PlanFeatures): { allowed: boolean; message?: string } => {
    const allowed = hasFeatureAccess(userPlan, feature)
    
    if (!allowed) {
      return {
        allowed: false,
        message: 'Recurso disponível apenas no Plano Pro ou Avançado.'
      }
    }
    
    return { allowed: true }
  }

  return {
    userPlan,
    updatePlan,
    hasAccess,
    getFeature,
    canAccessFeature,
    features: PLAN_FEATURES[userPlan]
  }
}
