"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Sparkles, Target, Heart, Briefcase, TrendingUp, Calendar, CheckCircle2, Clock, Lock, Plus } from "lucide-react"
import Link from "next/link"
import { usePlan } from "@/hooks/usePlan"
import { PremiumBadge } from "@/components/plan/FeatureBlock"
import type { PersonalizedRoutine, DailyTask } from "@/lib/routineGenerator"

export default function RotinasPage() {
  const { userPlan, hasAccess, getFeature } = usePlan()
  const [routine, setRoutine] = useState<PersonalizedRoutine | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [activeRoutinesCount, setActiveRoutinesCount] = useState(1)

  const maxRoutines = getFeature('maxActiveRoutines')
  const hasCustomRoutines = hasAccess('customRoutines')
  const hasPremiumRoutines = hasAccess('premiumRoutines')

  useEffect(() => {
    const routineData = localStorage.getItem("personalizedRoutine")
    if (routineData) {
      try {
        const parsedRoutine = JSON.parse(routineData) as PersonalizedRoutine
        setRoutine(parsedRoutine)
      } catch (error) {
        console.error("Erro ao carregar rotina:", error)
      }
    }

    // Carregar tarefas completadas
    const completed = localStorage.getItem("completedRoutineTasks")
    if (completed) {
      setCompletedTasks(new Set(JSON.parse(completed)))
    }

    // Carregar contador de rotinas ativas
    const routinesCount = localStorage.getItem("activeRoutinesCount")
    if (routinesCount) {
      setActiveRoutinesCount(parseInt(routinesCount))
    }
  }, [])

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)
    localStorage.setItem("completedRoutineTasks", JSON.stringify(Array.from(newCompleted)))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return <Users className="w-5 h-5" />
      case 'emotional': return <Heart className="w-5 h-5" />
      case 'practical': return <Briefcase className="w-5 h-5" />
      case 'evolution': return <TrendingUp className="w-5 h-5" />
      default: return <Target className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'from-blue-500 to-cyan-500'
      case 'emotional': return 'from-pink-500 to-rose-500'
      case 'practical': return 'from-green-500 to-emerald-500'
      case 'evolution': return 'from-purple-500 to-indigo-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'social': return 'Social'
      case 'emotional': return 'Emocional'
      case 'practical': return 'Prática'
      case 'evolution': return 'Evolução'
      default: return 'Geral'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil'
      case 'medium': return 'Médio'
      case 'hard': return 'Desafiador'
      default: return 'Normal'
    }
  }

  if (!routine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-[#1F75FE] mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando sua rotina personalizada...</p>
        </div>
      </div>
    )
  }

  const completionRate = (completedTasks.size / routine.dailyTasks.length) * 100
  const canAddMoreRoutines = activeRoutinesCount < maxRoutines

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Rotinas Personalizadas</h1>
            <div className="w-20"></div>
          </div>

          {/* Contador de rotinas */}
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-[#1F75FE]">{activeRoutinesCount}</span> de <span className="font-bold">{maxRoutines}</span> rotinas ativas
                </p>
                {!hasCustomRoutines && (
                  <p className="text-xs text-gray-500 mt-1">
                    Rotinas personalizadas disponíveis no Plano Pro
                  </p>
                )}
              </div>
              {!canAddMoreRoutines && (
                <Link href="/planos">
                  <button className="text-xs bg-[#1F75FE] text-white px-3 py-1 rounded-lg hover:bg-[#0F65EE] transition-colors">
                    Upgrade
                  </button>
                </Link>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(activeRoutinesCount / maxRoutines) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Card de Análise */}
          <div className="bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold">Sua Análise Personalizada</h2>
                  {!hasCustomRoutines && <PremiumBadge requiredPlan="pro" size="sm" />}
                </div>
                <div className="space-y-2 text-sm text-white/90">
                  <p><strong>Dor principal:</strong> {routine.mainPain}</p>
                  <p><strong>Objetivo:</strong> {routine.mainGoal}</p>
                  <p><strong>Nível emocional:</strong> {routine.emotionalLevel}</p>
                  <p><strong>Nível de ação:</strong> {routine.actionLevel}</p>
                  <p><strong>Comportamento social:</strong> {routine.socialBehavior}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-sm italic">"{routine.motivationalMessage}"</p>
            </div>
          </div>

          {/* Progresso do Dia */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Progresso de Hoje</h3>
              <span className="text-2xl font-bold text-[#1F75FE]">{Math.round(completionRate)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedTasks.size} de {routine.dailyTasks.length} tarefas concluídas
            </p>
          </div>

          {/* Rotina Diária Principal */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Rotina Diária Principal</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{routine.dailyMainRoutine}</p>
          </div>

          {/* Tarefas Diárias */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tarefas de Hoje</h3>
            <div className="space-y-4">
              {routine.dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                    completedTasks.has(task.id)
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-[#1F75FE] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        completedTasks.has(task.id)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-[#1F75FE]'
                      }`}
                    >
                      {completedTasks.has(task.id) && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </button>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      {/* Título e Badges */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className={`text-lg font-semibold ${
                          completedTasks.has(task.id) ? 'text-gray-400 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h4>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getCategoryColor(task.category)} flex-shrink-0`}>
                          {getCategoryIcon(task.category)}
                        </div>
                      </div>

                      {/* Descrição */}
                      <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(task.difficulty)}`}>
                          {getDifficultyLabel(task.difficulty)}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.estimatedTime}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                          {getCategoryLabel(task.category)}
                        </span>
                      </div>

                      {/* Impacto */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">
                          <strong className="text-gray-900">Impacto:</strong> {task.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tarefa Semanal */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Desafio Semanal</h3>
                <p className="text-sm text-gray-600">Evolução de longo prazo</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {routine.weeklyEvolutionTask.title}
              </h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {routine.weeklyEvolutionTask.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(routine.weeklyEvolutionTask.difficulty)}`}>
                  {getDifficultyLabel(routine.weeklyEvolutionTask.difficulty)}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {routine.weeklyEvolutionTask.estimatedTime}
                </span>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong className="text-gray-900">Impacto:</strong> {routine.weeklyEvolutionTask.impact}
                </p>
              </div>
            </div>
          </div>

          {/* Card para adicionar nova rotina */}
          {!canAddMoreRoutines ? (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Limite de Rotinas Atingido
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Você atingiu o limite de {maxRoutines} rotina{maxRoutines > 1 ? 's' : ''} ativa{maxRoutines > 1 ? 's' : ''} do seu plano.
                Faça upgrade para criar até {userPlan === 'free' ? '5 rotinas' : 'rotinas ilimitadas'}!
              </p>
              <Link href="/planos">
                <button className="px-6 py-2.5 bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] text-white rounded-xl font-medium hover:shadow-lg transition-all">
                  Ver Planos
                </button>
              </Link>
            </div>
          ) : (
            <button className="w-full bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#1F75FE] hover:bg-blue-50 transition-all group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-[#1F75FE]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Criar Nova Rotina
              </h3>
              <p className="text-sm text-gray-600">
                Você pode criar mais {maxRoutines - activeRoutinesCount} rotina{maxRoutines - activeRoutinesCount > 1 ? 's' : ''}
              </p>
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}
