"use client"

import { Check, ArrowLeft, Sparkles, Zap, Crown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePlan } from "@/hooks/usePlan"
import type { PlanType } from "@/lib/plans"

export default function PlanosPage() {
  const { userPlan, updatePlan } = usePlan()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSelectPlan = (plan: PlanType) => {
    // Se for o plano Pro, redireciona para o checkout da Keoto
    if (plan === 'pro') {
      window.location.href = 'https://checkout.keoto.com/e84e760c-f13b-4ee7-a72c-c75728d96f2f'
      return
    }
    
    // Para outros planos, atualiza normalmente
    updatePlan(plan)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const plans = [
    {
      id: 'free' as PlanType,
      name: "Grátis",
      price: 0,
      yearlyPrice: 0,
      description: "Para começar sua jornada",
      icon: Sparkles,
      color: "gray",
      features: [
        "3 respostas por dia da Aly",
        "Apenas 1 rotina ativa",
        "Rotinas básicas e limitadas",
        "Acesso apenas ao Quiz inicial",
        "Sem desbloquear relatórios",
        "Sem personalização avançada",
        "Sem backup automático"
      ],
      limitations: true
    },
    {
      id: 'pro' as PlanType,
      name: "Pro",
      price: 49.90,
      yearlyPrice: 499.90,
      description: "Mais popular - Tudo ilimitado",
      icon: Zap,
      color: "blue",
      popular: true,
      features: [
        "Respostas ilimitadas da Aly",
        "Até 5 rotinas simultâneas",
        "Rotinas personalizadas pelo quiz",
        "Relatórios semanais",
        "Área de organização",
        "Metas intermediárias",
        "Acesso a temas básicos",
        "Backup automático",
        "Sincronização entre dispositivos",
        "Notificações inteligentes",
        "Histórico das tarefas"
      ]
    },
    {
      id: 'advanced' as PlanType,
      name: "Avançado",
      price: 89.90,
      yearlyPrice: 899.90,
      description: "Para quem quer o máximo",
      icon: Crown,
      color: "purple",
      features: [
        "Tudo do Pro incluído",
        "Rotinas premium completas",
        "Estatísticas avançadas (mensal/anual)",
        "Coaching avançado da Aly",
        "Recomendações emocionais profundas",
        "Personalização total de interface",
        "Áreas ilimitadas",
        "Metas ilimitadas",
        "Assistente 24h sem limites",
        "Relatórios detalhados",
        "Insights pessoais com IA"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Planos</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slideDown">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-green-800">Plano atualizado com sucesso!</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Desbloqueie todo o potencial do Alinha.me
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-gray-200 rounded-xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Anual
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = billingCycle === "monthly" ? plan.price : plan.yearlyPrice
            const savings = billingCycle === "yearly" && plan.price > 0
              ? (plan.price * 12 - plan.yearlyPrice).toFixed(2)
              : 0
            const isCurrentPlan = userPlan === plan.id

            return (
              <div
                key={plan.name}
                className={`
                  relative bg-white rounded-2xl shadow-lg border-2 p-8
                  transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  ${plan.popular 
                    ? "border-[#1F75FE] ring-4 ring-blue-100" 
                    : isCurrentPlan
                      ? "border-green-500 ring-4 ring-green-100"
                      : "border-gray-200"
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Plano Atual
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                  ${plan.color === "gray" && "bg-gray-100"}
                  ${plan.color === "blue" && "bg-gradient-to-br from-blue-100 to-purple-100"}
                  ${plan.color === "purple" && "bg-gradient-to-br from-purple-100 to-pink-100"}
                `}>
                  <Icon className={`
                    w-8 h-8
                    ${plan.color === "gray" && "text-gray-600"}
                    ${plan.color === "blue" && "text-[#1F75FE]"}
                    ${plan.color === "purple" && "text-purple-600"}
                  `} />
                </div>

                {/* Plan Info */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {price.toFixed(2).replace(".", ",")}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500">
                        /{billingCycle === "monthly" ? "mês" : "ano"}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Economize R$ {savings.replace(".", ",")} por ano
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`
                        w-5 h-5 flex-shrink-0 mt-0.5
                        ${plan.limitations && index > 0 
                          ? "text-gray-400" 
                          : plan.color === "blue" 
                            ? "text-[#1F75FE]" 
                            : plan.color === "purple"
                              ? "text-purple-600"
                              : "text-gray-600"
                        }
                      `} />
                      <span className={`
                        text-sm
                        ${plan.limitations && index > 0 
                          ? "text-gray-400" 
                          : "text-gray-700"
                        }
                      `}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                  className={`
                    w-full py-3 rounded-xl font-medium transition-all
                    ${isCurrentPlan
                      ? "bg-green-100 text-green-700 cursor-default"
                      : plan.popular
                        ? "bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] text-white hover:shadow-xl hover:-translate-y-1"
                        : plan.color === "purple"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:-translate-y-1"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {isCurrentPlan ? "Plano Atual" : plan.price === 0 ? "Selecionar Grátis" : "Assinar Agora"}
                </button>
              </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Perguntas Frequentes
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-gray-600 text-sm">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Como funciona o período de teste?</h4>
              <p className="text-gray-600 text-sm">
                Oferecemos 7 dias grátis para você testar todos os recursos do plano Pro.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Posso mudar de plano depois?</h4>
              <p className="text-gray-600 text-sm">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
