"use client"

import { ArrowLeft, CheckSquare, Plus, Calendar, Tag, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TarefasPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Revisar apresentação do projeto", completed: false, priority: "high", date: "Hoje" },
    { id: 2, text: "Meditar por 10 minutos", completed: false, priority: "medium", date: "Hoje" },
    { id: 3, text: "Ler 20 páginas do livro", completed: true, priority: "low", date: "Hoje" },
    { id: 4, text: "Responder emails importantes", completed: false, priority: "high", date: "Amanhã" },
    { id: 5, text: "Fazer exercícios físicos", completed: false, priority: "medium", date: "Amanhã" }
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Minhas Tarefas</h1>
            <button className="p-2 bg-[#1F75FE] text-white rounded-lg hover:bg-[#0F65EE] transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                    ${task.completed 
                      ? "bg-[#1F75FE] border-[#1F75FE]" 
                      : "border-gray-300 hover:border-[#1F75FE]"
                    }
                  `}
                >
                  {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`
                    font-medium mb-2
                    ${task.completed ? "text-gray-400 line-through" : "text-gray-900"}
                  `}>
                    {task.text}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                      {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {task.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
