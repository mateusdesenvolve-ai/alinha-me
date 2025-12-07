"use client"

import { useState } from "react"
import { 
  Check,
  Plus,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Flag,
  Bell,
  Mic,
  ChevronDown,
  ChevronRight,
  X
} from "lucide-react"
import Link from "next/link"

interface Task {
  id: number
  name: string
  description?: string
  date?: string
  priority: "low" | "medium" | "high" | "none"
  reminders: string[]
  completed: boolean
  category: "today" | "tomorrow" | "upcoming" | "completed"
}

export default function TarefasPage() {
  const [showNewTask, setShowNewTask] = useState(false)
  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    today: true,
    tomorrow: true,
    upcoming: true,
    completed: false
  })

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Revisar apresentação do projeto",
      description: "Verificar slides e preparar roteiro",
      date: "Hoje",
      priority: "high",
      reminders: ["30 min antes"],
      completed: false,
      category: "today"
    },
    {
      id: 2,
      name: "Meditar por 10 minutos",
      date: "Hoje",
      priority: "medium",
      reminders: [],
      completed: false,
      category: "today"
    },
    {
      id: 3,
      name: "Ler 20 páginas do livro",
      date: "Hoje",
      priority: "low",
      reminders: [],
      completed: true,
      category: "completed"
    },
    {
      id: 4,
      name: "Preparar relatório mensal",
      date: "Amanhã",
      priority: "high",
      reminders: ["1 dia antes"],
      completed: false,
      category: "tomorrow"
    },
    {
      id: 5,
      name: "Agendar consulta médica",
      date: "Próxima semana",
      priority: "medium",
      reminders: [],
      completed: false,
      category: "upcoming"
    }
  ])

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed
        return {
          ...task,
          completed: newCompleted,
          category: newCompleted ? "completed" : "today"
        }
      }
      return task
    }))
  }

  const addNewTask = () => {
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: newTaskName,
        description: newTaskDescription,
        date: "Hoje",
        priority: "none",
        reminders: [],
        completed: false,
        category: "today"
      }
      setTasks([...tasks, newTask])
      setNewTaskName("")
      setNewTaskDescription("")
      setShowNewTask(false)
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500"
      case "medium": return "border-yellow-500"
      case "low": return "border-blue-500"
      default: return "border-gray-300"
    }
  }

  const getPriorityFlag = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500"
      case "medium": return "text-yellow-500"
      case "low": return "text-blue-500"
      default: return "text-gray-400"
    }
  }

  const todayTasks = tasks.filter(t => t.category === "today")
  const tomorrowTasks = tasks.filter(t => t.category === "tomorrow")
  const upcomingTasks = tasks.filter(t => t.category === "upcoming")
  const completedTasks = tasks.filter(t => t.category === "completed")

  const TaskItem = ({ task }: { task: Task }) => (
    <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`
          mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-all duration-300 flex-shrink-0
          ${task.completed 
            ? 'bg-[#1F75FE] border-[#1F75FE] scale-110' 
            : `${getPriorityColor(task.priority)} hover:border-[#1F75FE] hover:scale-110`
          }
        `}
      >
        {task.completed && (
          <Check className="w-3 h-3 text-white animate-checkPop" />
        )}
      </button>

      {/* Conteúdo da tarefa */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className={`
              text-sm font-medium transition-all duration-300
              ${task.completed 
                ? 'text-gray-400 line-through' 
                : 'text-gray-900'
              }
            `}>
              {task.name}
            </p>
            {task.description && (
              <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
            )}
            
            {/* Metadados */}
            <div className="flex items-center gap-3 mt-2">
              {task.date && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarIcon className="w-3 h-3" />
                  {task.date}
                </span>
              )}
              {task.priority !== "none" && (
                <span className={`flex items-center gap-1 text-xs ${getPriorityFlag(task.priority)}`}>
                  <Flag className="w-3 h-3" />
                </span>
              )}
              {task.reminders.length > 0 && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Bell className="w-3 h-3" />
                  {task.reminders.length}
                </span>
              )}
            </div>
          </div>

          {/* Menu de opções */}
          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all duration-200">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )

  const TaskSection = ({ 
    title, 
    count, 
    tasks, 
    sectionKey 
  }: { 
    title: string
    count: number
    tasks: Task[]
    sectionKey: keyof typeof expandedSections
  }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
      >
        {expandedSections[sectionKey] ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <span>{title}</span>
        <span className="text-gray-400">({count})</span>
      </button>

      {expandedSections[sectionKey] && (
        <div className="space-y-1">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tarefas</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {todayTasks.length + tomorrowTasks.length + upcomingTasks.length} tarefas pendentes
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* Botão Adicionar Tarefa */}
          {!showNewTask && (
            <button
              onClick={() => setShowNewTask(true)}
              className="w-full flex items-center gap-2 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 mb-6 group"
            >
              <Plus className="w-5 h-5 text-[#1F75FE] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Adicionar tarefa</span>
            </button>
          )}

          {/* Formulário Nova Tarefa */}
          {showNewTask && (
            <div className="mb-6 p-4 border-2 border-[#1F75FE] rounded-xl bg-blue-50/50 animate-fadeIn">
              <input
                type="text"
                placeholder="Nome da tarefa"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="w-full px-3 py-2 text-sm font-medium text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 mb-2"
                autoFocus
              />
              <input
                type="text"
                placeholder="Descrição"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400 mb-3"
              />

              {/* Botões de ação */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white rounded-lg transition-all duration-200 group">
                    <CalendarIcon className="w-4 h-4 text-gray-500 group-hover:text-[#1F75FE] transition-colors" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-all duration-200 group">
                    <Flag className="w-4 h-4 text-gray-500 group-hover:text-[#1F75FE] transition-colors" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-all duration-200 group">
                    <Bell className="w-4 h-4 text-gray-500 group-hover:text-[#1F75FE] transition-colors" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-all duration-200 group">
                    <MoreHorizontal className="w-4 h-4 text-gray-500 group-hover:text-[#1F75FE] transition-colors" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white rounded-lg transition-all duration-200 group">
                    <Mic className="w-4 h-4 text-gray-500 group-hover:text-[#1F75FE] transition-colors" />
                  </button>
                </div>
              </div>

              {/* Botões Cancelar e Adicionar */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowNewTask(false)
                    setNewTaskName("")
                    setNewTaskDescription("")
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-white rounded-lg transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={addNewTask}
                  disabled={!newTaskName.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1F75FE] hover:bg-[#0F65EE] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar tarefa
                </button>
              </div>
            </div>
          )}

          {/* Seções de Tarefas */}
          <div>
            <TaskSection
              title="Hoje"
              count={todayTasks.length}
              tasks={todayTasks}
              sectionKey="today"
            />

            <TaskSection
              title="Amanhã"
              count={tomorrowTasks.length}
              tasks={tomorrowTasks}
              sectionKey="tomorrow"
            />

            <TaskSection
              title="Próximos dias"
              count={upcomingTasks.length}
              tasks={upcomingTasks}
              sectionKey="upcoming"
            />

            <TaskSection
              title="Concluídas"
              count={completedTasks.length}
              tasks={completedTasks}
              sectionKey="completed"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes checkPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-checkPop {
          animation: checkPop 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
