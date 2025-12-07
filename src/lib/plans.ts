// Sistema de Planos e Permissões do Alinha.me

export type PlanType = 'free' | 'pro' | 'advanced'

export interface PlanFeatures {
  // Aly (Assistente)
  alyMessagesPerDay: number | 'unlimited'
  alyCoaching: boolean
  alyDeepAnalysis: boolean
  
  // Rotinas
  maxActiveRoutines: number
  customRoutines: boolean
  premiumRoutines: boolean
  
  // Relatórios e Estatísticas
  weeklyReports: boolean
  advancedStats: boolean
  monthlyYearlyStats: boolean
  detailedReports: boolean
  
  // Funcionalidades
  organizationArea: boolean
  intermediatGoals: boolean
  advancedGoals: boolean
  unlimitedAreas: boolean
  unlimitedGoals: boolean
  
  // Personalização
  basicThemes: boolean
  premiumThemes: boolean
  fullCustomization: boolean
  
  // Recursos Técnicos
  autoBackup: boolean
  deviceSync: boolean
  smartNotifications: boolean
  taskHistory: boolean
  
  // Outros
  quizAccess: boolean
  personalInsights: boolean
  support24h: boolean
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    // Aly
    alyMessagesPerDay: 3,
    alyCoaching: false,
    alyDeepAnalysis: false,
    
    // Rotinas
    maxActiveRoutines: 1,
    customRoutines: false,
    premiumRoutines: false,
    
    // Relatórios
    weeklyReports: false,
    advancedStats: false,
    monthlyYearlyStats: false,
    detailedReports: false,
    
    // Funcionalidades
    organizationArea: false,
    intermediatGoals: false,
    advancedGoals: false,
    unlimitedAreas: false,
    unlimitedGoals: false,
    
    // Personalização
    basicThemes: false,
    premiumThemes: false,
    fullCustomization: false,
    
    // Recursos Técnicos
    autoBackup: false,
    deviceSync: false,
    smartNotifications: false,
    taskHistory: false,
    
    // Outros
    quizAccess: true,
    personalInsights: false,
    support24h: false
  },
  
  pro: {
    // Aly
    alyMessagesPerDay: 'unlimited',
    alyCoaching: false,
    alyDeepAnalysis: false,
    
    // Rotinas
    maxActiveRoutines: 5,
    customRoutines: true,
    premiumRoutines: false,
    
    // Relatórios
    weeklyReports: true,
    advancedStats: false,
    monthlyYearlyStats: false,
    detailedReports: false,
    
    // Funcionalidades
    organizationArea: true,
    intermediatGoals: true,
    advancedGoals: false,
    unlimitedAreas: false,
    unlimitedGoals: false,
    
    // Personalização
    basicThemes: true,
    premiumThemes: false,
    fullCustomization: false,
    
    // Recursos Técnicos
    autoBackup: true,
    deviceSync: true,
    smartNotifications: true,
    taskHistory: true,
    
    // Outros
    quizAccess: true,
    personalInsights: false,
    support24h: false
  },
  
  advanced: {
    // Aly
    alyMessagesPerDay: 'unlimited',
    alyCoaching: true,
    alyDeepAnalysis: true,
    
    // Rotinas
    maxActiveRoutines: 999,
    customRoutines: true,
    premiumRoutines: true,
    
    // Relatórios
    weeklyReports: true,
    advancedStats: true,
    monthlyYearlyStats: true,
    detailedReports: true,
    
    // Funcionalidades
    organizationArea: true,
    intermediatGoals: true,
    advancedGoals: true,
    unlimitedAreas: true,
    unlimitedGoals: true,
    
    // Personalização
    basicThemes: true,
    premiumThemes: true,
    fullCustomization: true,
    
    // Recursos Técnicos
    autoBackup: true,
    deviceSync: true,
    smartNotifications: true,
    taskHistory: true,
    
    // Outros
    quizAccess: true,
    personalInsights: true,
    support24h: true
  }
}

export const PLAN_NAMES: Record<PlanType, string> = {
  free: 'Plano Grátis',
  pro: 'Plano Pro',
  advanced: 'Plano Avançado'
}

export const PLAN_PRICES: Record<PlanType, number> = {
  free: 0,
  pro: 49.90,
  advanced: 89.90
}

// Função para verificar se o usuário tem acesso a um recurso
export function hasFeatureAccess(userPlan: PlanType, feature: keyof PlanFeatures): boolean {
  return PLAN_FEATURES[userPlan][feature] as boolean
}

// Função para obter o valor de uma feature
export function getFeatureValue(userPlan: PlanType, feature: keyof PlanFeatures): any {
  return PLAN_FEATURES[userPlan][feature]
}

// Mensagens de bloqueio
export function getBlockedMessage(feature: string, requiredPlan: 'pro' | 'advanced' | 'pro_or_advanced'): string {
  if (requiredPlan === 'advanced') {
    return `${feature} é exclusivo do Plano Avançado.`
  }
  return `${feature} está disponível apenas no Plano Pro ou Avançado.`
}
