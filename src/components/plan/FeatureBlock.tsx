"use client"

import { Lock, Crown, Zap } from "lucide-react"
import type { ReactNode } from "react"

interface FeatureBlockProps {
  isBlocked: boolean
  requiredPlan?: 'pro' | 'advanced'
  message?: string
  children: ReactNode
  showOverlay?: boolean
}

export function FeatureBlock({ 
  isBlocked, 
  requiredPlan = 'pro',
  message,
  children,
  showOverlay = true
}: FeatureBlockProps) {
  if (!isBlocked) {
    return <>{children}</>
  }

  const defaultMessage = requiredPlan === 'advanced' 
    ? 'Recurso exclusivo do Plano Avançado.'
    : 'Recurso disponível apenas no Plano Pro ou Avançado.'

  const handleUpgrade = () => {
    // Se for Pro, redireciona para o checkout da Keoto
    if (requiredPlan === 'pro') {
      window.location.href = 'https://checkout.keoto.com/e84e760c-f13b-4ee7-a72c-c75728d96f2f'
    } else {
      // Para Avançado, vai para a página de planos
      window.location.href = '/planos'
    }
  }

  return (
    <div className="relative">
      {/* Conteúdo com blur */}
      <div className={showOverlay ? "pointer-events-none select-none blur-sm opacity-50" : ""}>
        {children}
      </div>
      
      {/* Overlay de bloqueio */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
          <div className="text-center p-6 max-w-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Recurso Bloqueado
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {message || defaultMessage}
            </p>
            <button 
              onClick={handleUpgrade}
              className="px-6 py-2.5 bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {requiredPlan === 'pro' ? 'Assinar Agora' : 'Ver Planos'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface PremiumBadgeProps {
  requiredPlan?: 'pro' | 'advanced'
  size?: 'sm' | 'md' | 'lg'
}

export function PremiumBadge({ requiredPlan = 'pro', size = 'sm' }: PremiumBadgeProps) {
  const Icon = requiredPlan === 'advanced' ? Crown : Zap
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full font-medium
      ${requiredPlan === 'advanced' 
        ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' 
        : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
      }
      ${sizeClasses[size]}
    `}>
      <Icon className={iconSizes[size]} />
      {requiredPlan === 'advanced' ? 'Avançado' : 'Pro'}
    </span>
  )
}

interface BlockedCardProps {
  title: string
  description: string
  requiredPlan?: 'pro' | 'advanced'
  icon?: ReactNode
}

export function BlockedCard({ title, description, requiredPlan = 'pro', icon }: BlockedCardProps) {
  const handleUpgrade = () => {
    // Se for Pro, redireciona para o checkout da Keoto
    if (requiredPlan === 'pro') {
      window.location.href = 'https://checkout.keoto.com/e84e760c-f13b-4ee7-a72c-c75728d96f2f'
    } else {
      // Para Avançado, vai para a página de planos
      window.location.href = '/planos'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)',
          color: '#1F75FE'
        }} />
      </div>
      
      <div className="relative z-10 text-center">
        {icon && (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
        )}
        
        <div className="mb-3">
          <PremiumBadge requiredPlan={requiredPlan} size="md" />
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <button 
          onClick={handleUpgrade}
          className="px-6 py-2.5 bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          {requiredPlan === 'pro' ? 'Assinar Agora' : 'Desbloquear'}
        </button>
      </div>
    </div>
  )
}
