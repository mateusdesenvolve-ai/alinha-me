"use client"

import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CalendarioPage() {
  const [currentDate] = useState(new Date())
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  const events = [
    { date: "2024-01-15", title: "Reunião de equipe", time: "14:00", color: "blue" },
    { date: "2024-01-15", title: "Treino na academia", time: "18:00", color: "green" },
    { date: "2024-01-16", title: "Consulta médica", time: "10:00", color: "red" },
    { date: "2024-01-18", title: "Apresentação do projeto", time: "15:00", color: "purple" }
  ]

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
            <h1 className="text-xl font-bold text-gray-900">Calendário</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 capitalize">{monthName}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2
              const isToday = day === 15
              const hasEvent = day === 15 || day === 16 || day === 18

              return (
                <button
                  key={i}
                  className={`
                    aspect-square rounded-lg p-2 text-sm font-medium transition-all
                    ${day < 1 || day > 31 ? "text-gray-300" : "text-gray-900 hover:bg-gray-100"}
                    ${isToday ? "bg-[#1F75FE] text-white hover:bg-[#0F65EE]" : ""}
                    ${hasEvent && !isToday ? "bg-blue-50" : ""}
                  `}
                >
                  {day > 0 && day <= 31 ? day : ""}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Próximos Eventos</h3>
          <div className="space-y-3">
            {events.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  event.color === "blue" ? "bg-blue-500" :
                  event.color === "green" ? "bg-green-500" :
                  event.color === "red" ? "bg-red-500" :
                  "bg-purple-500"
                }`}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
