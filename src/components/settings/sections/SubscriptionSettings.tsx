"use client"

import { Crown, Check } from "lucide-react"

export function SubscriptionSettings() {
  const currentPlan = "free"

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "R$ 0",
      period: "/mês",
      features: [
        "Até 5 tarefas por dia",
        "Chat básico com Aly",
        "Calendário simples",
        "1 meta ativa"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 19,90",
      period: "/mês",
      features: [
        "Tarefas ilimitadas",
        "Chat avançado com Aly",
        "Calendário completo",
        "Metas ilimitadas",
        "Análises detalhadas",
        "Cofrinho premium",
        "Sem anúncios"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 39,90",
      period: "/mês",
      features: [
        "Tudo do Pro +",
        "Aly com IA avançada",
        "Integrações ilimitadas",
        "Backups automáticos",
        "Suporte prioritário",
        "Temas personalizados",
        "Relatórios exportáveis"
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assinaturas</h1>
        <p className="text-sm text-gray-500 mt-1">Escolha o plano ideal para você</p>
      </div>

      {/* Plano Atual */}
      <div className="p-6 bg-blue-50 border-2 border-[#1F75FE] rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Crown className="w-5 h-5 text-[#1F75FE]" />
          <span className="text-sm font-medium text-[#1F75FE]">Plano Atual</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Free</h3>
        <p className="text-sm text-gray-600 mt-1">Você está no plano gratuito</p>
      </div>

      {/* Planos Disponíveis */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative p-6 border-2 rounded-xl transition-all hover:shadow-lg
              ${plan.popular
                ? "border-[#1F75FE] bg-blue-50"
                : "border-gray-200 bg-white"
              }
            `}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#1F75FE] text-white text-xs font-medium rounded-full">
                Mais popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={currentPlan === plan.id}
              className={`
                w-full py-3 rounded-lg text-sm font-medium transition-all
                ${currentPlan === plan.id
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : plan.popular
                    ? "bg-[#1F75FE] text-white hover:bg-[#0F65EE]"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }
              `}
            >
              {currentPlan === plan.id ? "Plano atual" : "Fazer upgrade"}
            </button>
          </div>
        ))}
      </div>

      {/* Benefícios */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Por que fazer upgrade?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🚀</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Produtividade máxima</p>
              <p className="text-xs text-gray-600">Organize tudo sem limites</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">IA avançada</p>
              <p className="text-xs text-gray-600">Aly com recursos premium</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📊</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Análises detalhadas</p>
              <p className="text-xs text-gray-600">Entenda seu progresso</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🔒</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Backups seguros</p>
              <p className="text-xs text-gray-600">Seus dados protegidos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
