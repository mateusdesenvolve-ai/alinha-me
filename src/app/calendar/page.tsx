"use client"

import { useState } from "react"
import { Check, ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, Target, DollarSign, Activity, Bell, X, GripVertical } from "lucide-react"
import Link from "next/link"

// Tipos
type ViewMode = "month" | "week"

interface CalendarEvent {
  id: string
  title: string
  date: Date
  type: "task" | "goal" | "habit" | "savings"
  color: string
  completed?: boolean
  time?: string
}

// Dados de exemplo
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Caminhar 20 minutos",
    date: new Date(2024, 0, 15),
    type: "habit",
    color: "green",
    time: "07:00"
  },
  {
    id: "2",
    title: "Guardar R$ 50",
    date: new Date(2024, 0, 15),
    type: "savings",
    color: "emerald",
    time: "18:00"
  },
  {
    id: "3",
    title: "Definir rotina matinal",
    date: new Date(2024, 0, 16),
    type: "goal",
    color: "blue",
    time: "09:00"
  },
  {
    id: "4",
    title: "Revisar finanças",
    date: new Date(2024, 0, 18),
    type: "task",
    color: "orange",
    time: "14:00"
  },
  {
    id: "5",
    title: "Meditação 15min",
    date: new Date(2024, 0, 19),
    type: "habit",
    color: "pink",
    time: "20:00"
  },
  {
    id: "6",
    title: "Guardar R$ 50",
    date: new Date(2024, 0, 22),
    type: "savings",
    color: "emerald",
    time: "18:00"
  }
]

const eventTypeLabels = {
  task: "Tarefa",
  goal: "Meta",
  habit: "Hábito",
  savings: "Cofrinho"
}

const eventTypeIcons = {
  task: Target,
  goal: CalendarIcon,
  habit: Activity,
  savings: DollarSign
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null)

  // Funções de navegação
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Gerar dias do mês
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  // Gerar dias da semana
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days: Date[] = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }

    return days
  }

  // Verificar se é hoje
  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  // Pegar eventos de um dia
  const getEventsForDay = (date: Date | null) => {
    if (!date) return []
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    )
  }

  // Drag and Drop
  const handleDragStart = (event: CalendarEvent) => {
    setDraggedEvent(event)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (date: Date | null) => {
    if (!date || !draggedEvent) return

    setEvents(events.map(event => 
      event.id === draggedEvent.id 
        ? { ...event, date: new Date(date) }
        : event
    ))
    setDraggedEvent(null)
  }

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6A3D] to-[#FF8C5A] rounded-xl flex items-center justify-center shadow-lg">
                <div className="relative flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-2.5 h-0.5 bg-white rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-2 h-2 text-white" strokeWidth={3} />
                    <div className="w-2 h-0.5 bg-white rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-2 h-2 text-white" strokeWidth={3} />
                    <div className="w-2 h-0.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">Alinha<span className="text-[#FF6A3D]">.me</span></span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
              <Link href="/calendar" className="text-sm font-medium text-[#FF6A3D]">
                Calendário
              </Link>
              <Link href="/savings" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cofrinho
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-9 h-9 bg-gradient-to-br from-[#FF6A3D] to-[#FF8C5A] rounded-full flex items-center justify-center text-white font-medium text-sm">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h1>
              <p className="text-sm text-gray-600">Visualize e organize sua rotina</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "month" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Mês
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "week" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Semana
                </button>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={viewMode === "month" ? goToPreviousMonth : goToPreviousWeek}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={goToToday}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Hoje
                </button>
                <button
                  onClick={viewMode === "month" ? goToNextMonth : goToNextWeek}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Add Task Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-[#FF6A3D] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#FF5A2D] transition-all hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Adicionar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        {viewMode === "month" ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {weekDays.map((day) => (
                <div key={day} className="p-4 text-center">
                  <span className="text-sm font-semibold text-gray-600">{day}</span>
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
              {getDaysInMonth().map((day, index) => {
                const dayEvents = getEventsForDay(day)
                const isTodayDate = isToday(day)

                return (
                  <div
                    key={index}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(day)}
                    className={`min-h-[120px] border-b border-r border-gray-200 p-2 hover:bg-gray-50 transition-colors ${
                      !day ? "bg-gray-50/50" : ""
                    }`}
                  >
                    {day && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${
                            isTodayDate 
                              ? "w-7 h-7 bg-[#FF6A3D] text-white rounded-full flex items-center justify-center" 
                              : "text-gray-700"
                          }`}>
                            {day.getDate()}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event) => {
                            const Icon = eventTypeIcons[event.type]
                            return (
                              <div
                                key={event.id}
                                draggable
                                onDragStart={() => handleDragStart(event)}
                                className={`bg-${event.color}-100 border border-${event.color}-200 rounded-lg p-2 cursor-move hover:shadow-md transition-all group`}
                              >
                                <div className="flex items-start gap-2">
                                  <GripVertical className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1 mb-1">
                                      <Icon className={`w-3 h-3 text-${event.color}-600 flex-shrink-0`} />
                                      {event.time && (
                                        <span className={`text-xs text-${event.color}-600`}>{event.time}</span>
                                      )}
                                    </div>
                                    <p className={`text-xs font-medium text-${event.color}-700 truncate`}>
                                      {event.title}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          {dayEvents.length > 3 && (
                            <button className="text-xs text-gray-600 hover:text-gray-900 font-medium">
                              +{dayEvents.length - 3} mais
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          // Week View
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7">
              {getWeekDays().map((day, index) => {
                const dayEvents = getEventsForDay(day)
                const isTodayDate = isToday(day)

                return (
                  <div
                    key={index}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(day)}
                    className="border-r border-gray-200 last:border-r-0"
                  >
                    {/* Day Header */}
                    <div className={`p-4 border-b border-gray-200 text-center ${
                      isTodayDate ? "bg-[#FF6A3D]/10" : ""
                    }`}>
                      <p className="text-xs font-medium text-gray-600 mb-1">{weekDays[day.getDay()]}</p>
                      <p className={`text-2xl font-bold ${
                        isTodayDate ? "text-[#FF6A3D]" : "text-gray-900"
                      }`}>
                        {day.getDate()}
                      </p>
                    </div>

                    {/* Events */}
                    <div className="p-3 space-y-2 min-h-[400px]">
                      {dayEvents.map((event) => {
                        const Icon = eventTypeIcons[event.type]
                        return (
                          <div
                            key={event.id}
                            draggable
                            onDragStart={() => handleDragStart(event)}
                            className={`bg-${event.color}-100 border border-${event.color}-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all group`}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <Icon className={`w-4 h-4 text-${event.color}-600 flex-shrink-0`} />
                            </div>
                            {event.time && (
                              <p className={`text-xs font-medium text-${event.color}-600 mb-1`}>
                                {event.time}
                              </p>
                            )}
                            <p className={`text-sm font-medium text-${event.color}-700`}>
                              {event.title}
                            </p>
                            <p className={`text-xs text-${event.color}-600 mt-1`}>
                              {eventTypeLabels[event.type]}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Legenda</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span className="text-sm text-gray-700">Tarefas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span className="text-sm text-gray-700">Metas da Aly</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-700">Hábitos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-emerald-400 rounded"></div>
              <span className="text-sm text-gray-700">Cofrinho</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">Dica da Aly</h3>
              <p className="text-sm text-gray-700">
                Arraste e solte eventos para reorganizar sua semana! Você também pode adicionar novas tarefas clicando no botão "Adicionar" acima.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Adicionar Tarefa</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Funcionalidade de adicionar tarefas será implementada em breve!
              </p>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full bg-[#FF6A3D] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#FF5A2D] transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
