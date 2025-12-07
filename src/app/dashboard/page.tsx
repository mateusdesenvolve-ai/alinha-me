"use client"

import { useState, useEffect } from "react"
import { 
  LayoutDashboard, 
  CheckSquare, 
  MessageCircle, 
  TrendingUp, 
  Wallet, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Settings, 
  Bell, 
  User,
  Check,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Award,
  Menu,
  X,
  Users,
  Circle
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import SettingsModal from "@/components/settings/SettingsModal"
import { usePlan } from "@/hooks/usePlan"
import { PLAN_NAMES } from "@/lib/plans"
import { FeatureBlock, BlockedCard } from "@/components/plan/FeatureBlock"
import type { PersonalizedRoutine, DailyTask } from "@/lib/routineGenerator"

export default function DashboardPage() {
  const router = useRouter()
  const { userPlan, hasAccess, getFeature } = usePlan()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState("dashboard")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [personalizedRoutine, setPersonalizedRoutine] = useState<PersonalizedRoutine | null>(null)
  const [tasks, setTasks] = useState<Array<{ id: number; text: string; completed: boolean; category?: string; impact?: string }>>([ 
    { id: 1, text: "Revisar apresentação do projeto", completed: false },
    { id: 2, text: "Meditar por 10 minutos", completed: false },
    { id: 3, text: "Ler 20 páginas do livro", completed: true }
  ])

  // Carregar rotina personalizada
  useEffect(() => {
    const routineData = localStorage.getItem("personalizedRoutine")
    if (routineData) {
      try {
        const routine = JSON.parse(routineData) as PersonalizedRoutine
        setPersonalizedRoutine(routine)
        
        // Substituir tarefas padrão pelas personalizadas
        const personalizedTasks = routine.dailyTasks.map((task, index) => ({
          id: index + 1,
          text: task.title,
          completed: false,
          category: task.category,
          impact: task.impact
        }))
        setTasks(personalizedTasks)
      } catch (error) {
        console.error("Erro ao carregar rotina:", error)
      }
    }
  }, [])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "rotinas", label: "Rotinas Personalizadas", icon: Target, href: "/rotinas", requiresFeature: "customRoutines" },
    { id: "tarefas", label: "Tarefas", icon: CheckSquare, href: "/tarefas" },
    { id: "chat", label: "Chat da Aly", icon: MessageCircle, href: "/chat-aly" },
    { id: "progresso", label: "Progresso", icon: TrendingUp, href: "/progresso", requiresFeature: "weeklyReports" },
    { id: "cofrinho", label: "Cofrinho", icon: Wallet, href: "/cofrinho" },
    { id: "calendario", label: "Calendário", icon: CalendarIcon, href: "/calendario" },
    { id: "amigos", label: "Amigos", icon: Users, href: "/amigos" },
    { id: "configuracoes", label: "Configurações", icon: Settings, href: "/configuracoes" }
  ]

  const handleMenuClick = (menuId: string, href: string, requiresFeature?: string) => {
    // Verificar permissão se necessário
    if (requiresFeature && !hasAccess(requiresFeature as any)) {
      router.push("/planos")
      return
    }
    
    setSelectedMenu(menuId)
    if (menuId === "configuracoes") {
      setSettingsOpen(true)
    } else if (href !== "/dashboard") {
      router.push(href)
    }
  }

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
      }
      return task.id === taskId ? { ...task, completed: !task.completed } : task
    }))
  }

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/icon.svg" 
                alt="Alinha.me" 
                width={40} 
                height={40}
                className="hover:scale-110 transition-transform"
              />
              <span className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#1F75FE]">
                Alinha<span className="text-[#1F75FE]">.me</span>
              </span>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isSelected = selectedMenu === item.id
              const isBlocked = item.requiresFeature && !hasAccess(item.requiresFeature as any)
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id, item.href, item.requiresFeature)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 transform relative
                    ${isSelected 
                      ? 'bg-blue-50 text-[#1F75FE] font-medium shadow-sm scale-[1.02]' 
                      : isBlocked
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isSelected ? 'scale-110' : ''}`} />
                  <span className="text-sm">{item.label}</span>
                  {isBlocked && (
                    <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Pro</span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer group hover:scale-[1.02]">
              <Link href="/perfil" className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Mateus</p>
                </div>
              </Link>
              <Link href="/planos" className="text-xs text-gray-500 truncate hover:text-[#1F75FE] transition-colors">
                {PLAN_NAMES[userPlan]}
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>

              {/* Saudação */}
              <div className="flex-1 lg:flex-none">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  Olá, Mateus 
                  <span className="inline-block animate-wave">👋</span>
                </h1>
                <p className="text-sm text-gray-500 mt-0.5 animate-fadeIn">Seu dia começa aqui.</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {/* Notificações */}
                <Link href="/notificacoes">
                  <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 group">
                    <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#1F75FE] transition-colors" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#1F75FE] rounded-full animate-pulse"></span>
                  </button>
                </Link>

                {/* Avatar */}
                <Link href="/perfil">
                  <div className="hidden sm:flex w-9 h-9 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-110">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Mensagem de Sucesso */}
          {showSuccessMessage && (
            <div className="px-4 sm:px-6 lg:px-8 pb-4 animate-slideDown">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-medium text-green-800">Ótimo trabalho! Continue assim! 🎉</p>
              </div>
            </div>
          )}
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Card 1 - Seu Plano Hoje */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Seu plano hoje</h2>
                  <span className="text-sm text-gray-500 animate-fadeIn">{completedTasks}/{totalTasks} concluídas</span>
                </div>

                {/* Tarefas */}
                <div className="space-y-3 mb-6">
                  {tasks.map((task, index) => (
                    <Link key={task.id} href="/tarefas">
                      <div
                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group animate-fadeInUp"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={(e) => {
                          e.preventDefault()
                          toggleTask(task.id)
                        }}
                      >
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          transition-all duration-300 relative
                          ${task.completed 
                            ? 'bg-[#1F75FE] border-[#1F75FE] scale-110 shadow-lg shadow-blue-200' 
                            : 'border-gray-300 group-hover:border-[#1F75FE] group-hover:scale-110'
                          }
                        `}>
                          {task.completed && (
                            <>
                              <Check className="w-4 h-4 text-white animate-checkPop" />
                              <div className="absolute inset-0 animate-particles">
                                <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle1"></div>
                                <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle2"></div>
                                <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle3"></div>
                                <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle4"></div>
                              </div>
                            </>
                          )}
                        </div>
                        <span className={`
                          flex-1 text-sm font-medium transition-all duration-300
                          ${task.completed 
                            ? 'text-gray-400 line-through' 
                            : 'text-gray-700 group-hover:text-gray-900 group-hover:translate-x-1'
                          }
                        `}>
                          {task.text}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Barra de Progresso */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ease-out ${
                        progressPercentage === 100 
                          ? 'bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] shadow-lg shadow-blue-300 animate-glow' 
                          : 'bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF]'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Botão */}
                <Link href="/tarefas">
                  <button className="w-full bg-gray-50 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-[1.02] hover:shadow-md">
                    Ver todas as tarefas
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </Link>
              </div>

              {/* Grid de Cards */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Card 2 - Aly */}
                <Link href="/chat-aly">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-sm border border-blue-100 p-6 hover:shadow-lg transition-all duration-300 animate-fadeInUp cursor-pointer hover:scale-105" style={{ animationDelay: '100ms' }}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                        <Sparkles className="w-6 h-6 text-white animate-spin-slow" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Aly analisou você hoje</h3>
                        <p className="text-sm text-gray-600">
                          {userPlan === 'free' 
                            ? `${getFeature('alyMessagesPerDay')} mensagens restantes hoje`
                            : 'Mensagens ilimitadas'
                          }
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-[#1F75FE] text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#0F65EE] transition-all duration-200 hover:shadow-xl hover:-translate-y-1 active:translate-y-0">
                      Abrir análise da Aly
                    </button>
                  </div>
                </Link>

                {/* Card 3 - Progresso */}
                <FeatureBlock 
                  isBlocked={!hasAccess('weeklyReports')}
                  requiredPlan="pro"
                  message="Relatórios semanais disponíveis no Plano Pro ou Avançado."
                >
                  <Link href="/progresso">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 animate-fadeInUp cursor-pointer hover:scale-105" style={{ animationDelay: '200ms' }}>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Progresso</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between animate-slideInRight" style={{ animationDelay: '300ms' }}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 animate-bounce-subtle">
                              <Target className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Consistência</p>
                              <p className="text-xs text-gray-500">12 dias seguidos</p>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-green-600 animate-bounce-subtle">🔥</span>
                        </div>

                        <div className="flex items-center justify-between animate-slideInRight" style={{ animationDelay: '400ms' }}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 animate-bounce-subtle">
                              <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Evolução semanal</p>
                              <p className="text-xs text-gray-500">+15% vs semana passada</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-blue-600 animate-bounce-subtle">↗</span>
                        </div>

                        <div className="flex items-center justify-between animate-slideInRight" style={{ animationDelay: '500ms' }}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 animate-bounce-subtle">
                              <Award className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Hábitos concluídos</p>
                              <p className="text-xs text-gray-500">8 de 10 esta semana</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-purple-600 animate-bounce-subtle">80%</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FeatureBlock>
              </div>

              {/* Grid de Cards Menores */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 4 - Cofrinho */}
                <Link href="/cofrinho">
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:rotate-1 animate-fadeInUp cursor-pointer" style={{ animationDelay: '300ms' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-12">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Cofrinho</h3>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">R$ 1.250</span>
                        <span className="text-sm text-gray-500">de R$ 3.000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-700 animate-progressBar" style={{ width: '42%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">42% da meta</p>
                    </div>

                    <button className="w-full bg-green-50 text-green-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-green-100 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                      Adicionar ao cofrinho
                    </button>
                  </div>
                </Link>

                {/* Card 5 - Calendário */}
                <Link href="/calendario">
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:rotate-1 animate-fadeInUp cursor-pointer" style={{ animationDelay: '400ms' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-12">
                        <CalendarIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Calendário</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100 hover:scale-[1.02]">
                        <div className="w-2 h-2 bg-[#1F75FE] rounded-full mt-1.5 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">Reunião de equipe</p>
                          <p className="text-xs text-gray-500">Hoje, 14:00</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg transition-all duration-200 hover:bg-green-100 hover:scale-[1.02]">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">Treino na academia</p>
                          <p className="text-xs text-gray-500">Hoje, 18:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Card 6 - Amigos */}
                <Link href="/amigos">
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:rotate-1 animate-fadeInUp cursor-pointer" style={{ animationDelay: '500ms' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-12">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Amigos</h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="p-3 bg-purple-50 rounded-lg transition-all duration-200 hover:bg-purple-100 hover:scale-[1.02] cursor-pointer flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-sm">
                          🌸
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Ana Silva</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Circle className="w-2 h-2 text-green-500 fill-current" />
                            Online • Nível 12
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg transition-all duration-200 hover:bg-purple-100 hover:scale-[1.02] cursor-pointer flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-sm">
                          ⚡
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Carlos Mendes</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Circle className="w-2 h-2 text-green-500 fill-current" />
                            Online • Nível 8
                          </p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-purple-50 text-purple-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-100 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                      Ver todos os amigos
                    </button>
                  </div>
                </Link>
              </div>

              {/* Card 7 - Motivacional do Dia */}
              <div className="bg-gradient-to-br from-[#1F75FE] via-[#3B8BFF] to-[#5BA3FF] rounded-2xl shadow-lg p-8 text-white relative overflow-hidden animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-6 h-6 animate-pulse" />
                    <span className="text-sm font-medium opacity-90">Frase do dia</span>
                  </div>
                  <blockquote className="text-2xl sm:text-3xl font-bold leading-tight mb-4 animate-fadeIn">
                    "O sucesso é a soma de pequenos esforços repetidos dia após dia."
                  </blockquote>
                  <p className="text-sm opacity-75 animate-fadeIn" style={{ animationDelay: '200ms' }}>— Robert Collier</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

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

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes checkPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @keyframes particle1 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-15px, -15px); opacity: 0; }
        }

        @keyframes particle2 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(15px, -15px); opacity: 0; }
        }

        @keyframes particle3 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-15px, 15px); opacity: 0; }
        }

        @keyframes particle4 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(15px, 15px); opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(31, 117, 254, 0.5); }
          50% { box-shadow: 0 0 20px rgba(31, 117, 254, 0.8); }
        }

        @keyframes progressBar {
          from { width: 0; }
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounceSub {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        .animate-wave {
          animation: wave 2.5s ease-in-out infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-checkPop {
          animation: checkPop 0.3s ease-out;
        }

        .animate-particle1 {
          animation: particle1 0.4s ease-out forwards;
        }

        .animate-particle2 {
          animation: particle2 0.4s ease-out forwards;
        }

        .animate-particle3 {
          animation: particle3 0.4s ease-out forwards;
        }

        .animate-particle4 {
          animation: particle4 0.4s ease-out forwards;
        }

        .animate-glow {
          animation: glow 1.5s ease-in-out infinite;
        }

        .animate-progressBar {
          animation: progressBar 1s ease-out;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSub 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
