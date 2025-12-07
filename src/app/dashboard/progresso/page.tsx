"use client"

import { useState } from "react"
import { 
  ArrowLeft,
  TrendingUp,
  Target,
  CheckCircle2,
  Circle,
  Award,
  Calendar,
  Clock,
  Zap,
  Trophy,
  Star,
  Flame,
  Lock,
  Sparkles
} from "lucide-react"
import Link from "next/link"

export default function ProgressoPage() {
  const [userLevel] = useState(7)
  const [currentXP] = useState(2450)
  const [nextLevelXP] = useState(3000)
  const [goalProgress] = useState(65)

  // Dados das conquistas
  const achievements = [
    { id: 1, name: "Primeira semana alinhada", icon: Star, unlocked: true, color: "from-yellow-400 to-orange-500" },
    { id: 2, name: "3 dias seguidos", icon: Flame, unlocked: true, color: "from-red-400 to-orange-500" },
    { id: 3, name: "10 tarefas concluídas", icon: CheckCircle2, unlocked: true, color: "from-green-400 to-emerald-500" },
    { id: 4, name: "Mestre do foco", icon: Target, unlocked: true, color: "from-blue-400 to-cyan-500" },
    { id: 5, name: "30 dias de consistência", icon: Trophy, unlocked: false, color: "from-gray-300 to-gray-400" },
    { id: 6, name: "100 tarefas concluídas", icon: Zap, unlocked: false, color: "from-gray-300 to-gray-400" },
  ]

  // Etapas do objetivo
  const goalSteps = [
    { id: 1, name: "Definir objetivo principal", completed: true },
    { id: 2, name: "Criar plano de ação", completed: true },
    { id: 3, name: "Completar primeira semana", completed: true },
    { id: 4, name: "Atingir 50% do objetivo", completed: false },
    { id: 5, name: "Manter consistência por 30 dias", completed: false },
    { id: 6, name: "Alcançar objetivo final", completed: false },
  ]

  // Métricas semanais
  const weeklyMetrics = {
    alignedDays: 5,
    tasksCompleted: 23,
    focusTime: "12h 30min",
    comparison: {
      days: +2,
      tasks: +8,
      time: "+3h"
    }
  }

  // Dados de consistência (últimos 30 dias)
  const consistencyData = [
    3, 5, 2, 8, 6, 4, 7, 9, 5, 6, 8, 7, 4, 9, 10, 
    6, 7, 8, 5, 9, 7, 6, 8, 10, 7, 5, 9, 8, 6, 7
  ]

  const progressPercentage = (currentXP / nextLevelXP) * 100
  const completedSteps = goalSteps.filter(s => s.completed).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seu Progresso</h1>
                <p className="text-sm text-gray-500 mt-0.5">Acompanhe sua evolução</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Card Principal - Seu Progresso */}
          <div className="bg-gradient-to-br from-[#1F75FE] via-[#3B8BFF] to-[#5BA3FF] rounded-2xl shadow-lg p-8 text-white relative overflow-hidden animate-fadeInUp">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Nível {userLevel}</h2>
                  <p className="text-white/80 text-sm">Continue no foco! Você está indo muito bem 🚀</p>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{currentXP} XP</span>
                  <span className="text-white/80">{nextLevelXP} XP</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-3 bg-white rounded-full transition-all duration-700 ease-out shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white/70">Faltam {nextLevelXP - currentXP} XP para o próximo nível</p>
              </div>
            </div>
          </div>

          {/* Grid de Cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Linha do Tempo do Objetivo */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Linha do Tempo</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#1F75FE]">{goalProgress}%</span>
                  <Target className="w-5 h-5 text-[#1F75FE]" />
                </div>
              </div>

              {/* Etapas */}
              <div className="space-y-4">
                {goalSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    {/* Linha vertical */}
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                        ${step.completed 
                          ? 'bg-green-500 scale-110 shadow-lg shadow-green-200' 
                          : 'bg-gray-200'
                        }
                      `}>
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      {index < goalSteps.length - 1 && (
                        <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 pt-1">
                      <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.name}
                      </p>
                      {step.completed && (
                        <p className="text-xs text-green-600 mt-0.5">✓ Concluído</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-[#1F75FE]">{completedSteps} de {goalSteps.length}</span> etapas concluídas
                </p>
              </div>
            </div>

            {/* Métricas Semanais */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Métricas Semanais</h3>

              <div className="space-y-4">
                {/* Dias Alinhados */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Dias alinhados</p>
                      <p className="text-xs text-gray-500">Esta semana</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{weeklyMetrics.alignedDays}</p>
                    <p className="text-xs text-green-600 font-medium">
                      {weeklyMetrics.comparison.days > 0 ? '+' : ''}{weeklyMetrics.comparison.days} vs semana passada
                    </p>
                  </div>
                </div>

                {/* Tarefas Concluídas */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1F75FE] rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tarefas concluídas</p>
                      <p className="text-xs text-gray-500">Esta semana</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{weeklyMetrics.tasksCompleted}</p>
                    <p className="text-xs text-blue-600 font-medium">
                      {weeklyMetrics.comparison.tasks > 0 ? '+' : ''}{weeklyMetrics.comparison.tasks} vs semana passada
                    </p>
                  </div>
                </div>

                {/* Tempo de Foco */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tempo de foco</p>
                      <p className="text-xs text-gray-500">Esta semana</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{weeklyMetrics.focusTime}</p>
                    <p className="text-xs text-purple-600 font-medium">
                      {weeklyMetrics.comparison.time} vs semana passada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de Consistência */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Consistência (Últimos 30 dias)</h3>
            
            <div className="flex items-end justify-between gap-1 h-48">
              {consistencyData.map((value, index) => {
                const maxValue = Math.max(...consistencyData)
                const heightPercentage = (value / maxValue) * 100
                
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="relative w-full">
                      <div
                        className="w-full bg-gradient-to-t from-[#1F75FE] to-[#5BA3FF] rounded-t-lg transition-all duration-500 hover:from-[#0F65EE] hover:to-[#4B93FF] group-hover:scale-105"
                        style={{ 
                          height: `${heightPercentage}%`,
                          minHeight: '8px',
                          animationDelay: `${index * 20}ms`
                        }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {value}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Média diária</p>
                <p className="text-lg font-bold text-gray-900">6.8</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Melhor dia</p>
                <p className="text-lg font-bold text-green-600">10</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Sequência atual</p>
                <p className="text-lg font-bold text-[#1F75FE]">12 dias</p>
              </div>
            </div>
          </div>

          {/* Área de Conquistas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Conquistas</h3>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                      ${achievement.unlocked 
                        ? 'border-transparent hover:scale-110 hover:shadow-xl' 
                        : 'border-gray-200 opacity-50 hover:opacity-70'
                      }
                    `}
                  >
                    <div className={`
                      w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3
                      bg-gradient-to-br ${achievement.color} shadow-lg
                    `}>
                      {achievement.unlocked ? (
                        <Icon className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <p className="text-xs text-center font-medium text-gray-700 leading-tight">
                      {achievement.name}
                    </p>
                    {achievement.unlocked && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mensagem da Aly */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-sm border border-purple-100 p-6 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Mensagem da Aly</h4>
                <p className="text-gray-700 leading-relaxed">
                  Você aumentou sua consistência esta semana, parabéns! 🎉 Seus esforços estão dando resultado e você está cada vez mais perto dos seus objetivos. Continue assim, você é incrível! 💙
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
