"use client"

import { useState, useEffect } from "react"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Check,
  X,
  Clock,
  TrendingUp,
  Award,
  Target,
  Heart,
  BookOpen,
  DollarSign,
  Dumbbell,
  Sparkles,
  ArrowLeft
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Task {
  id: number
  title: string
  time: string
  completed: boolean
  category: "saude" | "estudo" | "dinheiro" | "habito"
}

interface DayData {
  date: number
  tasks: Task[]
  status: "completed" | "pending" | "failed" | "none"
}

export default function CalendarioPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [mounted, setMounted] = useState(false)

  // Inicializar datas apenas no cliente
  useEffect(() => {
    const now = new Date()
    setCurrentDate(now)
    setSelectedDate(now)
    setMounted(true)
  }, [])

  // Dados mockados para demonstração
  const mockTasks: { [key: string]: Task[] } = {
    "2024-01-15": [
      { id: 1, title: "Meditar 10 minutos", time: "07:00", completed: true, category: "saude" },
      { id: 2, title: "Estudar React", time: "14:00", completed: true, category: "estudo" },
      { id: 3, title: "Economizar R$ 50", time: "20:00", completed: true, category: "dinheiro" }
    ],
    "2024-01-16": [
      { id: 4, title: "Treino na academia", time: "06:00", completed: true, category: "saude" },
      { id: 5, title: "Ler 20 páginas", time: "19:00", completed: false, category: "habito" }
    ],
    "2024-01-17": [
      { id: 6, title: "Yoga matinal", time: "07:00", completed: false, category: "saude" },
      { id: 7, title: "Revisar finanças", time: "18:00", completed: false, category: "dinheiro" }
    ]
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: DayData[] = []

    // Dias vazios do início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: 0, tasks: [], status: "none" })
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const tasks = mockTasks[dateKey] || []
      
      let status: "completed" | "pending" | "failed" | "none" = "none"
      if (tasks.length > 0) {
        const allCompleted = tasks.every(t => t.completed)
        const someCompleted = tasks.some(t => t.completed)
        
        if (allCompleted) status = "completed"
        else if (someCompleted) status = "pending"
        else status = "failed"
      }

      days.push({ date: day, tasks, status })
    }

    return days
  }

  const getSelectedDateTasks = () => {
    if (!selectedDate) return []
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    return mockTasks[dateKey] || []
  }

  const toggleTaskCompletion = (taskId: number) => {
    // Implementar lógica de toggle
    console.log("Toggle task:", taskId)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "saude": return <Heart className="w-4 h-4" />
      case "estudo": return <BookOpen className="w-4 h-4" />
      case "dinheiro": return <DollarSign className="w-4 h-4" />
      case "habito": return <Target className="w-4 h-4" />
      default: return <Check className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "saude": return "bg-red-100 text-red-600"
      case "estudo": return "bg-blue-100 text-blue-600"
      case "dinheiro": return "bg-green-100 text-green-600"
      case "habito": return "bg-purple-100 text-purple-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  // Estatísticas semanais
  const weeklyStats = {
    tasksCompleted: 12,
    consistency: 85,
    bestHabit: "Meditar 10 minutos",
    worstHabit: "Economizar dinheiro"
  }

  const getMotivationalMessage = () => {
    if (weeklyStats.consistency >= 80) {
      return {
        type: "success",
        message: "Você está arrasando! Continue assim, sua consistência é inspiradora! 🌟"
      }
    } else if (weeklyStats.consistency >= 50) {
      return {
        type: "warning",
        message: "Você está no caminho certo! Pequenos ajustes podem fazer toda a diferença. 💪"
      }
    } else {
      return {
        type: "info",
        message: "Cada dia é uma nova chance de recomeçar. Você consegue! 🌱"
      }
    }
  }

  const motivationalMsg = getMotivationalMessage()

  // Renderizar loading state até montar no cliente
  if (!mounted || !currentDate || !selectedDate) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <CalendarIcon className="w-12 h-12 text-[#1F75FE] mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando calendário...</p>
        </div>
      </div>
    )
  }

  const days = getDaysInMonth(currentDate)
  const selectedTasks = getSelectedDateTasks()

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-[#1F75FE]" />
                Calendário
              </h1>
              <p className="text-gray-600 mt-1">Acompanhe seu progresso diário</p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "month"
                  ? "bg-[#1F75FE] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "week"
                  ? "bg-[#1F75FE] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "day"
                  ? "bg-[#1F75FE] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Dia
            </button>
          </div>
        </div>

        {/* Mensagem Motivacional da Aly */}
        <div className={`rounded-2xl p-6 border-2 ${
          motivationalMsg.type === "success" 
            ? "bg-green-50 border-green-200" 
            : motivationalMsg.type === "warning"
            ? "bg-yellow-50 border-yellow-200"
            : "bg-blue-50 border-blue-200"
        }`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Mensagem da Aly</h3>
              <p className="text-gray-700">{motivationalMsg.message}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendário Principal */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {/* Controles do Calendário */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    const now = new Date()
                    setCurrentDate(now)
                    setSelectedDate(now)
                  }}
                  className="px-4 py-2 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-all"
                >
                  Hoje
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Grid do Calendário */}
            <div className="grid grid-cols-7 gap-2">
              {/* Dias da Semana */}
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}

              {/* Dias do Mês */}
              {days.map((day, index) => {
                const now = new Date()
                const isToday = 
                  day.date === now.getDate() &&
                  currentDate.getMonth() === now.getMonth() &&
                  currentDate.getFullYear() === now.getFullYear()

                const isSelected = 
                  day.date === selectedDate.getDate() &&
                  currentDate.getMonth() === selectedDate.getMonth() &&
                  currentDate.getFullYear() === selectedDate.getFullYear()

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (day.date > 0) {
                        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date))
                      }
                    }}
                    disabled={day.date === 0}
                    className={`
                      aspect-square p-2 rounded-xl transition-all relative
                      ${day.date === 0 ? "invisible" : ""}
                      ${isToday ? "ring-2 ring-[#1F75FE] ring-offset-2" : ""}
                      ${isSelected ? "bg-[#1F75FE] text-white shadow-lg scale-105" : "hover:bg-gray-50"}
                      ${!isSelected && day.status === "completed" ? "bg-green-50" : ""}
                      ${!isSelected && day.status === "pending" ? "bg-yellow-50" : ""}
                      ${!isSelected && day.status === "failed" ? "bg-red-50" : ""}
                    `}
                  >
                    <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-900"}`}>
                      {day.date || ""}
                    </span>

                    {/* Indicadores de Status */}
                    {day.date > 0 && day.tasks.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {day.status === "completed" && (
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        )}
                        {day.status === "pending" && (
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        )}
                        {day.status === "failed" && (
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Concluído</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Pendente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Falha</span>
              </div>
            </div>
          </div>

          {/* Sidebar - Tarefas do Dia */}
          <div className="space-y-6">
            {/* Tarefas do Dia Selecionado */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}
              </h3>

              {selectedTasks.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Nenhuma tarefa para este dia</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            transition-all
                            ${task.completed 
                              ? "bg-[#1F75FE] border-[#1F75FE]" 
                              : "border-gray-300 hover:border-[#1F75FE]"
                            }
                          `}
                        >
                          {task.completed && <Check className="w-4 h-4 text-white" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {task.time}
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getCategoryColor(task.category)}`}>
                              {getCategoryIcon(task.category)}
                              <span className="capitalize">{task.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {!task.completed && (
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="w-full mt-3 bg-[#1F75FE] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-all"
                        >
                          Marcar como concluído
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumo Semanal */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-sm border border-blue-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#1F75FE]" />
                Resumo Semanal
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tarefas concluídas</span>
                  <span className="text-lg font-bold text-gray-900">{weeklyStats.tasksCompleted}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Consistência</span>
                    <span className="text-lg font-bold text-[#1F75FE]">{weeklyStats.consistency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] h-2 rounded-full transition-all duration-700"
                      style={{ width: `${weeklyStats.consistency}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-200 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Rotina mais cumprida</p>
                      <p className="text-sm font-medium text-gray-900">{weeklyStats.bestHabit}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Precisa de atenção</p>
                      <p className="text-sm font-medium text-gray-900">{weeklyStats.worstHabit}</p>
                      <p className="text-xs text-gray-500 mt-1">Mas você consegue melhorar! 💪</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
