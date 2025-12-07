"use client"

import { useState } from "react"
import { Calendar, Check } from "lucide-react"

export function CalendarsSettings() {
  const [calendars, setCalendars] = useState([
    { id: "personal", name: "Pessoal", color: "#1F75FE", enabled: true, external: false },
    { id: "work", name: "Trabalho", color: "#EF4444", enabled: true, external: false },
    { id: "google-main", name: "Google - Principal", color: "#4285F4", enabled: true, external: true },
    { id: "google-family", name: "Google - Família", color: "#34A853", enabled: false, external: true },
    { id: "apple-personal", name: "Apple - Pessoal", color: "#000000", enabled: false, external: true }
  ])

  const toggleCalendar = (id: string) => {
    setCalendars(calendars.map(cal =>
      cal.id === id ? { ...cal, enabled: !cal.enabled } : cal
    ))
  }

  const colors = [
    "#1F75FE", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", 
    "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendários</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie seus calendários e sincronizações</p>
      </div>

      {/* Calendários Internos */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Calendários do Alinha.me
        </h3>
        
        <div className="space-y-2">
          {calendars.filter(cal => !cal.external).map((calendar) => (
            <div
              key={calendar.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: calendar.color }}
                >
                  {calendar.enabled && <Check className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{calendar.name}</p>
                  <p className="text-xs text-gray-500">Calendário local</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={calendar.color}
                  onChange={(e) => {
                    setCalendars(calendars.map(cal =>
                      cal.id === calendar.id ? { ...cal, color: e.target.value } : cal
                    ))
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                >
                  {colors.map(color => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => toggleCalendar(calendar.id)}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors
                    ${calendar.enabled ? "bg-[#1F75FE]" : "bg-gray-300"}
                  `}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                      ${calendar.enabled ? "translate-x-6" : "translate-x-0"}
                    `}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendários Externos */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Calendários externos</h3>
        
        <div className="space-y-2">
          {calendars.filter(cal => cal.external).map((calendar) => (
            <div
              key={calendar.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: calendar.color }}
                >
                  {calendar.enabled && <Check className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{calendar.name}</p>
                  <p className="text-xs text-gray-500">Sincronizado externamente</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleCalendar(calendar.id)}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors
                    ${calendar.enabled ? "bg-[#1F75FE]" : "bg-gray-300"}
                  `}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                      ${calendar.enabled ? "translate-x-6" : "translate-x-0"}
                    `}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adicionar Calendário */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Adicionar novo calendário</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Nome do calendário"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent"
          />
          <select className="px-4 py-2.5 border border-gray-300 rounded-lg">
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          <button className="px-6 py-2.5 bg-[#1F75FE] text-white rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-colors whitespace-nowrap">
            Adicionar
          </button>
        </div>
      </div>

      {/* Permissões */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Permissões de calendário</h3>
        
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1F75FE] rounded" />
            <div>
              <p className="text-sm font-medium text-gray-900">Sincronização automática</p>
              <p className="text-xs text-gray-500">Manter calendários sempre atualizados</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1F75FE] rounded" />
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações de eventos</p>
              <p className="text-xs text-gray-500">Receber lembretes de compromissos</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" className="w-4 h-4 text-[#1F75FE] rounded" />
            <div>
              <p className="text-sm font-medium text-gray-900">Compartilhar calendários</p>
              <p className="text-xs text-gray-500">Permitir que outros vejam seus calendários</p>
            </div>
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Calendários ativos</h3>
        <div className="flex flex-wrap gap-2">
          {calendars.filter(cal => cal.enabled).map((calendar) => (
            <div
              key={calendar.id}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: calendar.color }}
              />
              <span className="text-sm text-gray-700">{calendar.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-[#1F75FE] text-white rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-colors">
          Salvar alterações
        </button>
      </div>
    </div>
  )
}
